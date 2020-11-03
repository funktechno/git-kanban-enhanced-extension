![Vue Build Pipeline](https://github.com/funktechno/git-kanban-enhanced-extension/workflows/Vue%20Build%20Pipeline/badge.svg)

# git-kanban-extensions (in progress)

- see [wiki](https://github.com/funktechno/git-kanban-enhanced-extension/wiki) for user instructions. CONTRIBUTIONS are welcome. WORK IN PROGRESS.
- Kanban extensions for github, gitlab, bitbucket, gitea.
- Goal to support weights, multi projects, epics, blockers
- 2 plugins for each browser, one supports custom urls, one has predefined
- initialized using vue cli `npm install -g @vue/cli`
  - `vue create webextension` see **vue.config.js** for recommened build settings


## published browser extensions

- Chrome
  - [Simple](https://chrome.google.com/webstore/detail/git-kanban-enhanced/ehoibkdpdgjcjnnalkbiidajafoimnaa)
  - [Self Hosted](https://chrome.google.com/webstore/detail/ambmbdjjhloinbjadfgfmenihmfmahmk)
- Firefox
  - [Simple](https://addons.mozilla.org/en-US/firefox/addon/git-kanban-enhanced/)
  - [Self Hosted](https://addons.mozilla.org/en-US/firefox/addon/git-kanban-enhanced-selfhosted/)

## getting started (development)

- [chrome extensions getting started](https://developer.chrome.com/extensions/getstarted)
- startup

```bash
# install node version
nvm install
# https://github.com/coreybutler/nvm-windows in powershell
nvm install (Get-Content .nvmrc)
# install dependencies
yarn install # or yarn
# setup browser manifest, optional flags --firefox --custom
npm run build:manifest -- --custom
# run dev auto build
npm run watch # or yarn dev
```

- chrome
  - recommend opening a separate chrome user just for extension development to avoid conflicts with your current extension list
    - click on profile top right, then **manage people**, then add a person such as **chromedev**
  - open **settings** chrome://extensions/
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
    - click **load temporary add-on** and select the manifest.json file in **dist**

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
    - [x] change kanban by dragging
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
  - [x] store oauth token for crud (create, update, delete) requests
  - [] general tags/labels for each url
  - [x] export/import settings
