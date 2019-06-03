import {Component, EventEmitter, OnInit, Output, Input, OnDestroy} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators} from '@angular/forms';
import {PlaylistService} from '../../../common/playlist.service';
import {PlaylistModel} from '../../../models/playlist.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.css']
})
export class CreatePlaylistComponent implements OnInit, OnDestroy {
  @Output() addPlaylist = new EventEmitter();
  allVideosFromPlayList: PlaylistModel;
  playlistForm: FormGroup;
  showHidePlaylist: boolean;
  subscription: Subscription;
  isValidInput = true;
  submitted = false;

  constructor (private formBuilder: FormBuilder,
              private playlistService: PlaylistService) {

  }

  /**
   * @description when component is initialised ngOnInit() gets called and it subscribes to playlistSubject
   * to get latest videos from playlist('All Videos')
   */
  ngOnInit() {
    this.subscription = this.playlistService.playlistSubject.subscribe((playlist) => {
      this.allVideosFromPlayList = [...playlist].filter(list => list.name === 'All Videos')[0];
      if (this.allVideosFromPlayList.name) {
        this.createPlayListForm();
      }
    });
  }

  /**
   * @description createPlayListForm() method creates a form with dynamically added new control for each video checkbox
   */
  createPlayListForm(): void {
    const controls = [...this.allVideosFromPlayList['videos']].map(control => new FormControl(false));
    controls[0].setValue(true);
    this.playlistForm = this.formBuilder.group({
      playListName: ['', Validators.required],
      videos: new FormArray(controls)
    });
  }

  

  /**
   * @description on blur, checkInputFocus(event) invokes validation check on input field and raise error if
   * there is no valid input given
   */
  checkInputFocus(event) {
    let e = event;
    if (event.target.value.trim().length === 0) {
      this.playlistForm.controls["playListName"].setErrors(Validators.required);
      this.isValidInput = false;
    } else {
      this.playlistForm.controls["playListName"].setErrors(null);
      this.isValidInput = true;
    }
    
  }

/**
   * @description on submit, onSubmit() gets called and creates a playlist when form validation is passed, 
   * otherwise throws errors for respective input fields
   * 
   */
  onSubmit() {
    if (this.playlistForm.invalid) {
        this.isValidInput = false;
        return;
    }
    this.createPlaylist();
}

/**
   * @description on click of Cancel in create-playlist form, resetPlayListForm() gets called and
   * creates new form for removing any errors
   */
  resetPlayListForm(): void {
    this.playlistForm.controls['playListName'].setErrors(null);
    this.isValidInput = true;
  }
  /**
   * @description createPlaylist() gets called when form is submitted without error on click of Submit button
   * and emits to parent with playlist details to add
   */
  createPlaylist(): void {
    const controlArray = this.playlistForm.controls['videos']['controls'];
    const videosToAddControls = [];

    controlArray.forEach((control, index) => {
      if (control.value) {
        videosToAddControls.push(index);
      }
    });
    this.addPlaylist.emit({
      name: this.playlistForm.controls['playListName'].value,
      videos: [...videosToAddControls].map(videoIndex => this.allVideosFromPlayList['videos'][videoIndex])
    });
    this.resetPlayListForm();
    this.showHidePlaylist = !this.showHidePlaylist;
  }

  /**
   * @description On component end subscription gets unsubscribed
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
