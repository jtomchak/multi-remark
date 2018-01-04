#! /usr/bin/env node

/**
Name : NodeJS Custom CLI Module - Project Generator Template
Author:  Dilusha Gonagala
License : MIT
Version : 1.0
**/

//Module Dependencies
var generator = require("./generator.js");

module.exports = {
  listen: function() {
    //Slice out the array
    const args = process.argv.slice(2);

    const scriptIndex = args.findIndex(x => x === "build" || x === "serve");
    const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
    const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];

    //Assign values received to the projecttype and projectname variables
    if (script !== "build" && script !== "serve") {
      generator.generate(script);
    }
  }
};
