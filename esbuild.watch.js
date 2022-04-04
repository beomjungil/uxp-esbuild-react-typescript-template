/* eslint-disable */

const { config, clean, copyPublic } = require('./esbuild.config');
const { build } = require('esbuild');
const chokidar = require('chokidar');

chokidar.watch('src', { ignored: /dist|node_modules|.git/ }).on('all', (event, path) => {
    clean();
    copyPublic();

    build({
        ...config,
        watch: {
            onRebuild(error) {
                if (error) console.error('Build failed:', error)
                else console.log('Build succeeded')
            },
        }
    }).catch(() => process.exit(1));
});
