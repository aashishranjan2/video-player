import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddVideoToListComponent} from './add-video-to-list.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {of} from 'rxjs';
import {PlaylistService} from '../../common/playlist.service';

describe('AddVideoToListComponent', () => {
  let component: AddVideoToListComponent;
  let fixture: ComponentFixture<AddVideoToListComponent>;
  const defaultPlayList = {
    name: 'All Videos',
    videos: require('../../../assets/stubs/videos.json')
  };
  const playListServiceStub = {
    playlistSubject: of([defaultPlayList]),
    setPlayList: () => ({})
  };
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddVideoToListComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [FormBuilder, {provide: PlaylistService, useValue: playListServiceStub}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVideoToListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  describe('when component is initialised', () => {
    it('should have cta-button and not add-form-container', () => {
      const app = fixture.debugElement.nativeElement;
      expect(app.querySelector('.cta-button')).toBeTruthy();
      expect(app.querySelector('add-form-container')).not.toBeTruthy();
    });

    it('should have add-form-container and contain submit and close button, when cta-button is clicked', () => {
      const app = fixture.debugElement.nativeElement;
      app.querySelector('.cta-button').click();
      fixture.detectChanges();
      expect(app.querySelector('.add-form-container')).toBeTruthy();
      expect(app.querySelector('.submit-video-button')).toBeTruthy();
      expect(app.querySelector('.close-button')).toBeTruthy();
    });
    describe('when', () => {
      it('should call addVideoToPlaylistAndAllVideos() and' +
        'update playlist with video details entered, when addVideoToLibrary gets called', () => {
        component.addVideoForm.patchValue({
          videoTitle: 'Big Buck Bunny',
          videoArtist: 'By Blender Foundation',
          videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          playlist: 'All Videos'
        });
        component.addvideoToPlayList();
        const videoAddedInPlaylist = component.playlist[0]['videos'].filter((video) => video.title === 'Big Buck Bunny');
        expect(videoAddedInPlaylist[0].url).toEqual('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
        expect(videoAddedInPlaylist[0].artist).toEqual('By Blender Foundation');
      });
    });
    describe('when checked for given value in the input field, it', () => {
      it('should call checkInputFocus() and ' +
      'pass error result on invalid input inside input field', () => {
          const event= {
            'target': {
              'value': ' ',
              'id': 'videoTitle'
            }
          }

        component.addVideoForm.patchValue({
          videoTitle: ' ',
          videoArtist: ' ',
          videoUrl: ' ',
          playlist: 'All Videos'
        });
        component.isValidInput = false;
        component.checkInputFocus(event);
        expect(component.addVideoForm.controls['videoTitle'].value.trim()).toEqual(event.target.value.trim());
        expect(component.isValidInput).not.toEqual(true);
      });
      it('should call checkInputFocus() and ' +
        'pass success result on valid input inside input field', () => {
          const event= {
            'target': {
              'value': 'Big Buck Bunny',
              'id': 'videoTitle'
            }
          }

        component.addVideoForm.patchValue({
          videoTitle: 'Big Buck Bunny',
          videoArtist: 'By Blender Foundation',
          videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          playlist: 'All Videos'
        });
        component.isValidInput = true;
        component.checkInputFocus(event);
        expect(component.addVideoForm.controls['videoTitle'].value.trim()).toEqual(event.target.value);
        expect(component.isValidInput).toEqual(true);
      });
      it('should call onSubmit() method and raise error in case of invalid input value', () => {
        component.addVideoForm.setErrors({require: true});
        component.onSubmit();
        expect(component.addVideoForm.invalid).toBeTruthy();
      });
      it('should call onSubmit() method and call createPlaylist() method in case of valid input field value', () => {
        spyOn(component, 'addvideoToPlayList');
        component.addVideoForm.controls['videoTitle'].setErrors(null);
        component.addVideoForm.controls['videoArtist'].setErrors(null);
        component.addVideoForm.controls['videoUrl'].setErrors(null);
        component.onSubmit();
        expect(component.addvideoToPlayList).toHaveBeenCalled();
      });
    });
  });
});
