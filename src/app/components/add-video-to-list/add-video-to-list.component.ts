import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {PlaylistService} from '../../common/playlist.service';
import {VideoModel} from '../../models/video.model';
import {Subscription} from 'rxjs';
import {PlaylistModel} from '../../models/playlist.model';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video-to-list.component.html'
})
export class AddVideoToListComponent implements OnInit, OnDestroy {
  playlist: PlaylistModel[] = [];
  showHideVideoForm: boolean;
  addVideoForm: FormGroup;
  subscription: Subscription;
  isValidInput = true;


  constructor(private formBuilder: FormBuilder, 
              private playlistService: PlaylistService) {
    this.createAddVideoForm();
  }

  createAddVideoForm(): void {
    this.addVideoForm = this.formBuilder.group({
      videoTitle: ['', Validators.required],
      videoArtist: ['', Validators.required],
      videoUrl: ['', Validators.required],
      playlist: ['All Videos', Validators.required]
    });
  }

  ngOnInit() {
    this.subscription = this.playlistService.playlistSubject.subscribe(playListArray => {
      this.playlist = playListArray;
    });
  }

  /**
   * @description on submit, onSubmit() gets called and creates a playlist when form validation is passed, 
   * otherwise throws errors for respective input fields
   * 
   */
  onSubmit() {
    if (this.addVideoForm.invalid) {
        this.isValidInput = false;
        return;
    }
    this.addvideoToPlayList();
}

  /**
   * @description on blur, checkInputFocus(event) invokes validation check on input field and raise error if
   * there is no valid input given
   */
  checkInputFocus(event) {
    const controlName = event.target.id;
    if (event.target.value.trim().length === 0) {
      // this.addVideoForm.controls[controlName].setErrors(Validators.required);
      this.isValidInput = false;
    } else {
      this.addVideoForm.controls[controlName].setErrors(null);
      // this.isValidInput = true;
    }
  }
   /**
   * @description addvideoToPlayList() gets called when a form is submitted on click of submit button
   * this method updates video Object of Type with the user entered values and calls
   * addVideoToPlaylistAndAllVideos() with playlist name and video object and updates playlist by calling
   * setPlaylist() method of playlist service with new Playlist array
   */
  addvideoToPlayList(): void {
    let video: VideoModel;
    const playListSelectedName = this.addVideoForm.controls['playlist'].value;
    video = {
      title: this.addVideoForm.controls['videoTitle'].value,
      artist: this.addVideoForm.controls['videoArtist'].value,
      url: this.addVideoForm.controls['videoUrl'].value
    };
    this.addVideoToPlaylistAndAllVideos(playListSelectedName, video);
    if (playListSelectedName !== 'All Videos') {
      this.addVideoToPlaylistAndAllVideos('All Videos', video);
    }
    this.playlistService.setPlayList(this.playlist);
    this.resetForm();
    this.showHideVideoForm = !this.showHideVideoForm;
  }

   /**
   * @description resetForm methods updates form values with initial values
   */
  resetForm(): void {
    this.addVideoForm.reset();
  }

  /**
   * @description addVideoToPlaylistAndAllVideos() adds the videos selected to 'All Videos' and Playlist Selected
   * @param <string> playList
   * @param <VideoModel> video
   */
  addVideoToPlaylistAndAllVideos(playList: string, video: VideoModel): void {
    const playlistSelected = [...this.playlist].filter((list) => list.name === playList);
    playlistSelected[0]['videos'].push(video);
    this.playlist = this.playlist.map((list) => list.name === playList ? playlistSelected[0] : list);
  }

  /**
   * @description On component end subscription gets unsubscribed
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
