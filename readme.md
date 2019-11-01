# git-kanban (in progress)

- Kanban extensions for github, gitlab, and bitbucket
- should support weights, multi projects, epics, blockers
- 2 plugins, one supports custom urls, one has predefined
- initialized using [YuraDev/vue-chrome-extension-template](https://github.com/YuraDev/vue-chrome-extension-template)
- refactored based off of [Kocal/vue-web-extension](https://github.com/Kocal/vue-web-extension)

## published chrome apps

- Chrome
  - [Simple](https://chrome.google.com/webstore/detail/git-kanban-enhanced/ehoibkdpdgjcjnnalkbiidajafoimnaa)
  - [Self Hosted](https://chrome.google.com/webstore/detail/ambmbdjjhloinbjadfgfmenihmfmahmk)
- Firefox (pending)
  - [Simple](https://addons.mozilla.org/en-US/developers/addon/git-kanban-enhanced)
  - [Self Hosted](https://addons.mozilla.org/en-US/developers/addon/git-kanban-enhanced-selfhosted)

## getting started (development)

- [chrome extensions getting started](https://developer.chrome.com/extensions/getstarted)
- copy **manifest-custom.json** to **manifest.json**
- startup

```bash
npm install # or yarn
npm run watch:dev # or yarn dev
```

- chrome
  - recommend opening a separate chrome user just for extension development to avoid conflicts with your current extension list
    - click on profile top right, then **manage people**, then add a person such as **chromedev**
  - open [settings](chrome://extensions/)
    - check **developer mode** top right
    - click **load unpacked** then select the ** dist** folder in this project
- firefox
  - packed
    - zip the contents of ** dist** folder, there may be a way to load unpacked
      - double check in the zip that it's the root and you don't see a folder called ** dist** inside
    - navigate to [addons](about:addons)
    - click manage your extensions gear > **install addon from file**
  - debug
    - Navigate to [about:debugging](about:debugging#/runtime/this-firefox) in firefox
    - click **load temporary add-on** and select the manifest.json file in build

## release (on-premise)

- run same commands as getting started, but run
  - edit the manifest-main.json (as manifest.json) to whitelist your internal application urls
  - tweak as needed and add to your organization's local chrome store
  - `npm run build` instead of run dev to get a final build
  - zip the **dist** folder running `npm run build-zip`
    - Build a zip file following this format `<name>-v<version>.zip`, by reading `name` and `version` from `manifest.json` file.
    - Zip file is located in `dist-zip` folder.
    - if you wish to not build from source you can also pull the builds directly from [releases](https://github.com/funktechno/git-kanban-enhanced-chrome-extension/releases)

## linter

- install `https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint`
- add `"eslint.autoFixOnSave": true` to settings.json

## node version support

- `nvm install 8.16.0` use a node version less than 9
  - `nvm use 8.16.0`
- `npm rebuild node-sass` rebuild sass using 8

## content locations

- [match patterns](https://developer.chrome.com/extensions/match_patterns)

## todo icon

- need 16, 48, 128 icons
- gitlab (in-progress)
  - menu
    - [x] kanban menu btn visible
    - [] menu options
- github (in-progress)
  - menu
    - [x] kanban menu btn visible
    - [] menu options
- bitbucket (in-progress)
  - menu
    - [x] kanban menu btn visible (for now, bitbucket css classes are dynamic)
    - [] menu options
  - kanban
    - [x] display basic kanban
    - [] change kanban by dragging
    - [] match css styling
- gitea (in-progress)

  - menu
    - [x] kanban menu btn visible
    - [x] menu options
  - kanban (board)
    - [x] display basic kanban
    - [] change kanban by dragging
    - [] match css styling
    - filter
      - pagination
      - by milestone
    - detail left panel
      - points
  - burndown
  - velocity report
  - settings
    - [x] label mgt for each repo

- settings
  - [x] self host custom url mgt
  - [] store oauth token for cud (create, update, delete) requests
  - [] general tags/labels for each url
  - [] export/import settings
