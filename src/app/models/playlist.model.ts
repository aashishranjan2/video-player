import {VideoModel} from './video.model';

/**
 * Mapper for  Playlist with array videos
 */
export interface PlaylistModel {
  name: string;
  videos: [VideoModel];
}
