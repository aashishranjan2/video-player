# Video Player

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Application(Component) Structure
AppComponent
|
 --> VideoPlayerComponent
     |
      --> PlayListComponent
          |
           --> AddVideoToListComponent
               |
                --> CreatePlayListComponent

## Application Design
    Video-Player is designed using CSS-grid to provide an app a responsive behavior for all kinds of platfroms/resolutions.

## Application Features
    When an App loads initially, it loads with a set of videos by default in the playlist. 

### To add a new video in the playlist
    A user can add new video(s) of his/her choice using CTA "Add Video to playlist" button. User can fill in the details like- Title for the video, Artist name, URL for a video, and a list of playlist to choose from.
### To create a playlist
    A user can create a new playlist by using CTA button "Create Playlist" which allows you to add specific videos in playlist from multi Select checkbox feature. You can provide a name for your playlist and select a set of videos from the list available.

*  Once video starts playing and in between another playlist has been selected then video under playmode will continue and once      ended then first video from selected playlist will start playing.

*  Once all videos in the playlist are played it starts playing from 1st video of that playlist.