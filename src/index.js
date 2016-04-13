#!/usr/bin/env node

var stdio = require('stdio');
var tumblrLksDownldr = require('tumblr-lks-downldr');

var args = stdio.getopt(
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
      description: 'Number of posts liked that you want to load and download.'
    },
    'path': {
      key: 'p',
      args: 1,
      description: 'Relative path to save the images.'
    }
  }
);

tumblrLksDownldr.setGlobalParams(
  {
    url: args.url,
    postsToLoad: args.postsToLoad,
    path: args.path,
    onEnd: function(){
      process.exit();
    }
  }
);

console.log('Tumblr Blog:', args.url);
console.log('Saving in:', args.path || process.cwd());

tumblrLksDownldr.getLikedPosts();
