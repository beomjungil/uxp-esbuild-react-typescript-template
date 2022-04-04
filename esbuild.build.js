/* eslint-disable */
const { config, clean, copyPublic } = require('./esbuild.config');
const { build } = require('esbuild');

clean();
copyPublic();

build({
    ...config,
    define: {
        'process.env.NODE_ENV': "'production'",
    }
});