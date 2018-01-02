#!/usr/bin/env node

const { asset, dest, name, on, port, debugPagePath } = require("berber");
const layout1 = require("layout1");
const rename = require("gulp-rename");
const fs = require("fs");
const path = require("path");

require("require-yaml");

const layoutFilename = path.join(__dirname, "layout.njk");
const indexFilename = path.join(__dirname, "indexLayout.njk");

const defaultCss = `
body {
  color: #4d4d4d;
  font-family: 'Avenir Next', 'Hiragino Kaku Gothic ProN', sans-serif;
}

h1 {
    margin-top: 25px;
    padding-bottom: 25px;
    border-bottom: 10px solid #eeeeee;
}

img[alt=logo] { 
  height: 75px;
  width: 75px;
  float: right;
}

img[alt=tech] { 
  height: 150px;
  width: 150px;
  margin-bottom: 25px;
}

img[alt=practice] { 
  height: 150px;
  width: 150px;
  margin-bottom: 25px;
}
.remark-code,
.remark-inline-code {
  font-family: 'Menlo', 'Monaco', 'Courier new', monospace;
}
.remark-slide-content.inverse {
  color: #f3f3f3;
  background-color: #272822;
}
`;

const defaultConfig = {
  title: "",
  port: 8080,
  dest: "build",
  source: "slides",
  slides: [],
  css: defaultCss,
  cssFiles: [],
  script: "",
  scriptFiles: [],
  remarkConfig: {},
  remarkPath: path.join(__dirname, "..", "vendor", "remark.js"),
  assets: ["assets"]
};

name("multi-remark");

on("config", config => {
  config = Object.assign({}, defaultConfig, config);
  let deckSource = path.join(__dirname, config.source);

  //Create an array of all the files *.md listed in Config Source
  config.slides = fileList(config.source);
  port(config.port);
  dest(config.dest);
  asset(config.remarkPath).pipe(rename("remark.js"));

  config.slides.forEach(slide => {
    asset(path.join(config.source, slide.base))
      .pipe(rename({ basename: slide.name, extname: ".html" }))
      .pipe(
        layout1.nunjucks(layoutFilename, {
          data: {
            css: config.css,
            cssFiles: config.cssFiles
              .map(url => `<link href="${url}" rel="stylesheet" />`)
              .join("\n"),
            script: config.script,
            scriptFiles: config.scriptFiles
              .map(url => `<script src="${url}"></script>`)
              .join("\n"),
            title: config.title,
            remarkConfig: config.remarkConfig
          }
        })
      );
  });

  config.cssFiles.forEach(src => {
    if (/^http/.test(src)) {
      return;
    }
    asset(src).base(process.cwd());
  });

  config.scriptFiles.forEach(src => {
    if (/^http/.test(src)) {
      return;
    }
    asset(src).base(process.cwd());
  });

  config.assets.forEach(src => {
    asset(path.join(src, "**/*.*")).base(process.cwd());
  });
});

debugPagePath("__multi-remarker__");

function fileList(dir) {
  return fs.readdirSync(dir).reduce(function(list, file) {
    const name = path.join(dir, file);
    const namedTrim = path.parse(file);
    if (fs.statSync(name).isDirectory()) {
      return list.concat(fileList(namedTrim));
    }
    return list.concat([namedTrim]);
  }, []);
}

// README for default notes and instructions
//
