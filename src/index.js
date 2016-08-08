#!/usr/bin/env node
'use strict';

/**
 * Node Dependencies
 */
const fs = require('fs')
const stdio = require('stdio');
const tumblrLksDownldr = require('tumblr-lks-downldr');
const ProgressBar = require('progress');

/**
 * Module Globals
 */
let downloadBar;

const args = stdio.getopt(
  {
    'url': {
      key: 'u',
      args: 1,
      description: 'Valid Tumblr URL.',
      mandatory: true
    },
    'postsToLoad': {
      key: 'l',
      args: 1,
      description: 'Number of liked posts that you want to download.'
    },
    'postsOffset': {
      key: 'o',
      args: 1,
      description: 'Which liked posts to start at (where 0 is most recent).'
    },
    'path': {
      key: 'p',
      args: 1,
      description: 'Path where the images will be saved.'
    }
  }
);

const trackDownloadProgress = () => {
  downloadBar.tick();
  if (downloadBar.complete) {
    console.log('\n       Done!');
  }
};

const params = {
  url: args.url,
  onStart: (info) => {
    console.log(`
      ┌┬┐┬ ┬┌┬┐┌┐ ┬  ┬─┐   ┬  ┬┌─┌─┐  ┌┬┐┌─┐┬ ┬┌┐┌┬  ┌┬┐┬─┐   ┌─┐┬  ┬
       │ │ ││││├┴┐│  ├┬┘───│  ├┴┐└─┐───│││ ││││││││   ││├┬┘───│  │  │
       ┴ └─┘┴ ┴└─┘┴─┘┴└─   ┴─┘┴ ┴└─┘  ─┴┘└─┘└┴┘┘└┘┴─┘─┴┘┴└─   └─┘┴─┘┴
       2.0.4

       Tumblr Blog      :   ${args.url}
       Saving in        :   ${args.path || process.cwd()}
       Posts to load    :   ${info.postsToLoad}
       Offset posts by    :  ${args.postsOffset}

       Note: Be patient if you requested a lot of posts.

       Loading list in memory...
    `);
  },
  onFetch: (info) => {
    if(info.downloadedPosts === Number(args.postsToLoad)){
      downloadBar = new ProgressBar(
        `       Downloading: :percent Current Image: :current Total: ${info.imagesToDownload} Estimated Time: :etas`,
        {
          total: info.imagesToDownload
        }
      );
    }
  },
  onSuccess: (info) => {
    trackDownloadProgress();
  },
  onError: (error, info) => {
    trackDownloadProgress();
  }
};

if(args.postsToLoad && args.postsToLoad < 1){
  process.exit();
}

if(args.postsToLoad){
  params.postsToLoad = args.postsToLoad;
}

if(args.postsOffset){
  params.postsOffset = args.postsOffset;
}

if(args.path){
  params.path = args.path;
}

tumblrLksDownldr.setGlobalParams(
  params
);

tumblrLksDownldr.getLikedPosts();
