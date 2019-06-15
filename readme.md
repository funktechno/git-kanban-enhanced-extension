# git-kanban (in progress)

* Kanban extensions for github, gitlab, and bitbucket
* should support weights, multi projects, epics, blockers
* 2 plugins, one supports custom urls, one has predefined
* initialized using [YuraDev/vue-chrome-extension-template](https://github.com/YuraDev/vue-chrome-extension-template)

## published chrome apps

* [Simple](https://chrome.google.com/webstore/detail/git-kanban-enhanced/ehoibkdpdgjcjnnalkbiidajafoimnaa)
* [Self Hosted](https://chrome.google.com/webstore/detail/ambmbdjjhloinbjadfgfmenihmfmahmk) - pending review b/c open for all urls

## getting started

* https://developer.chrome.com/extensions/getstarted
* startup
```bash
$ npm install # or yarn
$ npm run dev # or yarn dev
```

## linter...

* install `https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint`
* add `"eslint.autoFixOnSave": true` to settings.json

## node version support

* `nvm install 8.16.0` use a node version less than 9
    * `nvm use 8.16.0`
* `npm rebuild node-sass` rebuild sass using 8

## content locations

* https://developer.chrome.com/extensions/match_patterns

## todo icon

* need 16, 48, 128 icons
* gitlab (in-progress)
    * kanban menu btn visible
* github (in-progress)
    * kanban menu btn visible
* bitbucket (in-progress)
    * kanban menu btn visible (for now, bitbucket css classes are dynamic)
* gitea (in-progress)
    * kanban menu btn visible