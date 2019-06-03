import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {VideoPlayerComponent} from './components/video-player/video-player.component';
import {AddVideoToListComponent} from './components/add-video-to-list/add-video-to-list.component';
import {PlaylistComponent} from './components/playlist/playlist.component';
import {CreatePlaylistComponent} from './components/playlist/create-playlist/create-playlist.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    VideoPlayerComponent,
    PlaylistComponent,
    CreatePlaylistComponent,
    AddVideoToListComponent,
    PlaylistComponent,
    CreatePlaylistComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
