/**
Name : Multi-Remark
Author:  Jesse Tomchak
License : MIT
Version : 1.0
**/

//Module Dependencies
var fs = require("fs-extra");
var child_process = require("child_process");
const chalk = require("chalk");
const log = console.log;
const error = chalk.bold.red;

module.exports = {
  generate: function(deckName) {
    console.log(deckName);
    if (deckName !== undefined && deckName !== "") {
      //Multi-Deck Generator
      //Create directory with the user's given deck name on the current cli path
      fs.mkdirs("./" + deckName + "", function(err) {
        if (err) {
          console.error(err);
        } else {
          fs.writeFile(
            "./" + deckName + "/README.MD",
            "Generated By Multi-Remark Template",
            function(err) {
              if (err) {
                console.log(err);
              } else {
                // We now know that evrything is smooth
                console.log(__dirname);
                var dirname = __dirname;

                var dirstr = dirname.substr(dirname.lastIndexOf("/") + 1) + "$",
                  fixedurl = dirname.replace(new RegExp(dirstr), "");

                fs.copy(
                  fixedurl + "/templates/course/",
                  "./" + deckName + "",
                  function(err) {
                    if (err) {
                      log(error(err));
                    } else {
                      log(chalk`
Building new Deck {bold ${deckName}}
{green Success!}
Your Multi-Slide Deck is ready!


cd into {bold ${deckName}}
run {green npm install && npm start}
`);
                    }
                  }
                );
              }
            }
          );
        }
      });
    } else {
      log(error("We gotta have a deck name!!"));
    }
  }
};
