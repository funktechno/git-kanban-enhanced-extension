
module.exports = {
  name: 'Git Kanban Enhance',
  version: '0.0.2',
  description: 'Kanban extensions for github, gitlab, and bitbucket',
  author: "http://github.com/lastlink",
  manifest_version: 2,
  icons: { '16': 'icons/16.png', '128': 'icons/128.png' },
  homepage_url: "https://github.com/funktechno/git-kanban-enhanced-chrome-extension",
  permissions: [
    "*://github.com/*",
    "*://bitbucket.org/*",
    "*://gitlab.com/*",
    'activeTab',
    'tabs',
    'background',
    'contextMenus',
    'storage',
    'webNavigation'
  ],
  browser_action: {
    default_title: 'title',
    default_popup: 'pages/popup.html'
  },
  background: {
    persistent: true,
    "scripts": [
      "js/background.js"
    ]
  },
  // devtools_page: 'pages/devtools.html',
  // options_page: 'pages/options.html',
  content_scripts: [{
    js: [ 'js/inject.js' ],
    "exclude_matches": [
      "*://extensions/*"
    ],
    run_at: 'document_end',
    matches: ['<all_urls>'],
    all_frames: true
  }],
  content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'",
  // web_accessible_resources: [ 'js/content.js' ]
}
