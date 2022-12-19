'use strict';

const { copyFileSync } = require('fs'); // eslint-disable-line
copyFileSync('dist/ThemeBuilder/index.html', 'dist/ThemeBuilder/404.html');
