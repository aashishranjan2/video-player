import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlaylistComponent} from './playlist.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {PlaylistService} from '../../common/playlist.service';

describe('PlaylistComponent', () => {
  let component: PlaylistComponent;
  let fixture: ComponentFixture<PlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlaylistComponent],
      providers: [ PlaylistService ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('when component is initialised', () => {
    it(' and OnInit is called', () => {
      const playList = {
        'name': 'All Videos',
        'videos': require('../../../assets/stubs/videos.json')
      };
      const service = TestBed.get(PlaylistService);
      component.choosenPlaylist = playList.videos;
      spyOn(service, 'setPlayList').and.returnValue(null);
      spyOn(component, 'playSelectedList');
      component.ngOnInit();
      expect(service.setPlayList).toHaveBeenCalled();
      
    });
    it('should have div with class "playlist-container"', async(() => {
      const app = fixture.debugElement.nativeElement;
      expect(app.querySelector('div.playlist-container')).toBeTruthy();
    }));

    it('should render 9 videos from playlist" ', () => {
      const app = fixture.debugElement.nativeElement;
      expect(app.querySelectorAll('.video-from-playlist').length).toEqual(9);
    });
  });

  describe('when playlist has been created', () => {
    it('should call addNewPlaylist() and call setPlaylist method of playListService', () => {
      const playList = {
        'name': 'New Playlist',
        'videos': require('../../../assets/stubs/videos.json')
      };
      const service = TestBed.get(PlaylistService);
      spyOn(service, 'setPlayList').and.returnValue(null);
      component.addNewPlaylist(playList);
      expect(service.setPlayList).toHaveBeenCalled();
    });
  });
});
