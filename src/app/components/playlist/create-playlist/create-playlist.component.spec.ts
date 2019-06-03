import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreatePlaylistComponent} from './create-playlist.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {of} from 'rxjs';
import {PlaylistService} from '../../../common/playlist.service';

describe('CreatePlaylistComponent', () => {
  let component: CreatePlaylistComponent;
  let fixture: ComponentFixture<CreatePlaylistComponent>;

  const defaultPlayList = {
    name: 'All Videos',
    videos: require('../../../../assets/stubs/videos.json')
  };
  const playListServiceStub = {
    playlistSubject: of([defaultPlayList])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePlaylistComponent],
      providers: [FormBuilder, {provide: PlaylistService, useValue: playListServiceStub}],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have button with text "Create Playlist"', () => {
    const app = fixture.debugElement.nativeElement;
    expect(app.querySelector('#create-playlist-button').textContent).toEqual('Create PlayList');
  });

  it('should have div with class"add-form-container" on click of create-playlist button', () => {
    const app = fixture.debugElement.nativeElement;
    app.querySelector('#create-playlist-button').click();
    fixture.detectChanges();
    expect(component.showHidePlaylist).toBe(true);
    expect(app.querySelector('div.add-form-container')).toBeTruthy();
  });


  describe('when checked for given value in the input field, it', () => {
    it('should call checkInputFocus() and ' +
    'pass error result on invalid input inside input field', () => {
        const event= {
          'target': {
            'value': ' ',
            'id': 'playListName'
          }
        }

      component.playlistForm.patchValue({
        playListName: ' '
      });
      component.isValidInput = false;
      component.checkInputFocus(event);
      expect(component.playlistForm.controls['playListName'].value.trim()).toEqual(event.target.value.trim());
      expect(component.isValidInput).not.toEqual(true);
    });
    it('should call checkInputFocus() and ' +
      'pass success result on valid input inside input field', () => {
        const event= {
          'target': {
            'value': 'My PlayList',
            'id': 'playListName'
          }
        }

      component.playlistForm.patchValue({
        playListName: 'My PlayList'
      });
      component.isValidInput = true;
      component.checkInputFocus(event);
      expect(component.playlistForm.controls['playListName'].value.trim()).toEqual(event.target.value);
      expect(component.isValidInput).toEqual(true);
    });
    it('should call onSubmit() method and raise error in case of invalid input value', () => {
      component.playlistForm.setErrors(Validators.requiredTrue);
      component.onSubmit();
      expect(component.playlistForm.invalid).toBeTruthy();
    });
    it('should call onSubmit() method and call createPlaylist() method in case of valid input field value', () => {
      spyOn(component, 'createPlaylist');
      component.playlistForm.controls['playListName'].setErrors(null);
      component.onSubmit();
      expect(component.createPlaylist).toHaveBeenCalled();
    });
  });
});
