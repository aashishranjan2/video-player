import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VideoPlayerComponent} from './video-player.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {PlaylistService} from '../../common/playlist.service';
import {of} from 'rxjs';

const defaultPlayList = {
  name: 'All Videos',
  videos: require('../../../assets/stubs/videos.json')
};
const playListServiceStub = {
  playlistSubject: of([defaultPlayList])
};

describe('VideoPlayerComponent', () => {
  let component: VideoPlayerComponent;
  let fixture: ComponentFixture<VideoPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VideoPlayerComponent],
      providers: [{provide: PlaylistService, useValue: playListServiceStub}],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when component is initialized', () => {
    it('should call queueChosenVideoToPlay() and set playListVideos', () => {
      expect(component.playListVideos[0]['videos'].length).toEqual(9);
    });
  });

  describe('when playlist has selected', () => {
    it('should call setVideosToPlay() with selected playlist and updates video count as -1', () => {
      component.setVideosToPlay('All Videos');
      expect(component.videosCount).toEqual(-1);
    });

    it('should call playSelectedList()', () => {
      spyOn(component, 'setVideosToPlay');
      component.playSelectedList('All Videos');
      expect(component.setVideosToPlay).toHaveBeenCalled();
    });

    it('should call queueChosenVideoToPlay()', () => {
      const playList = defaultPlayList.videos;
      component.playListVideos[0]['videos'] = defaultPlayList.videos;
      spyOn(component, 'setNextVideoToPlay');
      component.queueChosenVideoToPlay();
      expect(component.setNextVideoToPlay).toHaveBeenCalled();
    });

    it('should call onVideoEnd()', () => {
      spyOn(component, 'setNextVideoToPlay');
      component.playListVideos[0]['videos'] = defaultPlayList.videos;
      component.onVideoEnd();
      expect(component.videoplayer.nativeElement.play).toBeTruthy();
    });

    it('should call playSelectedVideoFromPlaylist()', () => {
      const video = {
        'title': 'Sintel',
        'artist': 'By Blender Foundation',
        'url': 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
      };
      component.videoplayer.nativeElement.src = defaultPlayList.videos[0];
      component.videoUrl = video['url'];
      component.videoArtist = video['artist'];
      component.videoTitle = video['title'];
      component.videoplayer.nativeElement.play();
      expect(component.videoplayer.nativeElement.play).toBeTruthy();
    });

    it('should call setVideosToPlay() with wrong playlist name and playListVideos array should be empty', () => {
      component.setVideosToPlay('No Videos');
      expect(component.playListVideos.length).toEqual(0);
    });
  });

  describe('when video from playlist has selected', () => {
    it('should call playSelectedVideoFromPlaylist() with video Object and updates videoCount with index of that video in playlist as well as video details', () => {
      const video = {
        'title': 'Sintel',
        'artist': 'By Blender Foundation',
        'url': 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
      };
      component.playSelectedVideoFromPlaylist(video);
      expect(component.videosCount).toEqual(7);
      expect(component.videoTitle).toEqual('Sintel');
      expect(component.videoArtist).toEqual('By Blender Foundation');
      expect(component.videoUrl).toEqual(video.url);
    });

    it('should call setVideosToPlay() with wrong playlist name and playListVideos array should be empty', () => {
      component.setVideosToPlay('No Videos');
      expect(component.playListVideos.length).toEqual(0);
    });
  });
});
