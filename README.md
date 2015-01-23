litebox
=======

> lightbox for viewing Flickr photo sets

### Examples
Create your own set by changing parameters in the url. The application accepts a ```setId``` parameter and falls back to a default photo set if not provided. You can add an additional ```photoId``` parameter which will open the specific photo in a lightbox.
- [Thailand](http://radialglo.github.io/litebox/?setId=72157626579923453)
- [http://radialglo.github.io/litebox/?setId=72157622079948472](http://radialglo.github.io/litebox/?setId=72157622079948472)
- [Beach](http://radialglo.github.io/litebox/?setId=72157629076059695)

#### Installation
```
npm i 
```

#### Starting the App
```
npm start
```
or
```
node app.js
```
Go to ```localhost:3000``` for the application and
```localhost:3000/test``` to view tests

#### File Structure
The development JavaScript files are located in [assets/js/src](https://github.com/radialglo/litebox/tree/master/assets/js/src).
The main file is [assets/js/src/litebox-app.js](https://github.com/radialglo/litebox/blob/master/assets/js/src/litebox-app.js).
This application uses [RequireJS](http://requirejs.org/) to resolve dependencies. A custom build script [assets/js/build/tasks/build.js](https://github.com/radialglo/litebox/blob/master/assets/js/build/tasks/build.js) compiles down
the source files into [assets/js/litebox-app.js](https://github.com/radialglo/litebox/blob/master/assets/js/litebox-app.js)

#### Features
- unique routes and route updates via History API
- navigation via right/left arrow keys and clicks. Larger click regions have been created for easier navigation.
- ability to cycle around album instead of ending at last image
- album feed is rendered below lightbox
- uses [https://www.flickr.com/services/api/flickr.photosets.getPhotos.html](https://www.flickr.com/services/api/flickr.photosets.getPhotos.html) API


Also **learn more about my code samples** via [PROJECTS.md](https://github.com/radialglo/litebox/blob/master/PROJECTS.md)

