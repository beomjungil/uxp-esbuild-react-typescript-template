/* eslint-disable */
const fs = require('fs-extra');
const postCssPlugin = require("@deanc/esbuild-plugin-postcss");
const autoprefixer = require("autoprefixer");
const tailwind = require("tailwindcss");

function clean() {
    fs.rmSync('./dist', { recursive: true, force: true });
}

function copyPublic() {
    fs.copySync('./public', './dist');
}

module.exports = {
    config: {
        entryPoints: ['src/index.tsx'],
        bundle: true,
        minify: true,
        outdir: 'dist',
        sourcemap: true,
        target: 'es6',
        inject: ['src/react-shim.js'],
        external: ['uxp', 'photoshop', 'os'],
        plugins: [
            postCssPlugin({
                rootDir: './src',
                plugins: [autoprefixer, tailwind]
            })
        ]
    },
    clean: clean,
    copyPublic: copyPublic
}
