# How to

- Install: `yarn`
- build: `yarn build`

### output

output directory: `dist`

replace output file under `webpack.config.json` (default: `'kyc-enhanced-bundle.js'`)

### how to use

import build file to userscript manager.

example _(using tampermonkey extension)_:

```
// ==UserScript==
// @name         olx kyc
// @namespace    http://tampermonkey.net/
// @version      2024-01-13
// @description  try to take over the world!
// @author       You
// @match        https://blablabla/* <<< replace with your site
// @icon         https://blablabla <<< replace with your icon
// @require      file:///C:/User/scripts/olx/dist/kyc-enhanced-bundle.js
// @grant        none
// ==/UserScript==
```
