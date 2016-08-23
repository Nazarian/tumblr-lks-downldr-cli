#!/usr/bin/env node
'use strict';

/**
 * Node Dependencies
 */
const stdio = require('stdio');
const tumblrLksDownldr = require('tumblr-lks-downldr');

/**
 * Module Globals
 */
let imagesToDownload = 0;
let downloadProcess = 0;

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
  downloadProcess++;
  const downloadPercentage = ((downloadProcess * 100) / imagesToDownload).toFixed(2);
  console.log(`       ${downloadProcess} of ${imagesToDownload} downloaded (${downloadPercentage}%)`);
  if (downloadProcess === imagesToDownload) {
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
       2.1.6

       Tumblr Blog        :   ${args.url}
       Saving in          :   ${args.path || process.cwd()}
       Posts to load      :   ${info.postsToLoad}
       Offset posts by    :   ${args.postsOffset || 0}

       Loading list in memory...
    `);
  },
  onFetch: (info) => {
    console.log(`       Posts To Download: ${info.postsToLoad} Downloaded Posts: ${info.downloadedPosts} Images to Download: ${info.imagesToDownload}`);
    imagesToDownload = info.imagesToDownload;
  },
  onDownloadStart: (info) => {
    if (info.postsToLoad > info.downloadedPosts) {
      console.log(`
       ${info.postsToLoad - info.downloadedPosts} posts are unreachable...`);
    }
    console.log(`
       Downloading ${info.filesToDownload} files...
    `);
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
