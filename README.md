# tumblr-lks-downldr-cli
[![npm version](https://badge.fury.io/js/tumblr-lks-downldr-cli.svg)](https://www.npmjs.com/package/tumblr-lks-downldr-cli)

CLI tool for downloading your precious [Tumblr](https://tumblr.com) likes.

You have probably liked posts with text, photos, quotes, links, chats, audio, videos or/and answers BUT this is just for IMAGES.

## How to use

Install [Node.js](https://nodejs.org) in order to run ```tumblr-lks-downldr-cli```.

Install the module **globally** and then you'll have access to the ```tumblr-lks-downldr-cli``` command anywhere on your system (use the same command to update it):
```sh
npm install -g tumblr-lks-downldr-cli
```

Then just run ```tumblr-lks-downldr-cli``` defining you Tumblr url and the number of likes that you want to download (if you don't set any number the default is the whole list of liked posts that can actually be really big):
```sh
tumblr-lks-downldr-cli -u 'andresdavid90.tumblr.com' -l 1000
```

And of course a custom path if you want:
```sh
tumblr-lks-downldr-cli -u 'andresdavid90.tumblr.com' -l 1000 -p 'my-stupid-folder'
```

## Issues

I'm definitely trying to maintain the utility updated so if anyone find an issue, don't hesitate to report it [here](https://github.com/andresdavid90/tumblr-lks-downldr-cli/issues).
