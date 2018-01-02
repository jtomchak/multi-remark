# Create a slide deck

* CLI create-slide-deck is meant to be a generator tool for creating, building and hosting all your remark.js slide presentations.

## Quick Start

```sh
$ npm install -g multi-remark

$ create-slide-deck my-app
$ cd my-app/
$ npm install
$ npm run build
```

* This will take all the markdown files in the created 'slides' directory and build them into usable HTML files, that will be served out of the 'build' directory.
* Creates an index page what will list and link to all the slides created.

## Local Server

* Running the slide deck locally is also available out of the box.
* This will rebuild the deck when changes are detected.

```sh
$ npm start
```

## Additional Assests

* Anything that you need to reference from the slides, like images, can be added to the 'assets' directory and will be added to build directory automatticly.
