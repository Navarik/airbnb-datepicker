#!/usr/bin/env node

const fs = require('fs');
const CleanCSS = require('clean-css');

const compileCSS = require('react-with-styles-interface-css-compiler');

const registerMaxSpecificity = require('react-with-styles-interface-css/dist/utils/registerMaxSpecificity').default;
const registerCSSInterfaceWithBootstrap4Theme = require('../src/utils/registerCSSInterfaceWithBootstrap4Theme').default;

console.error = msg => { throw new SyntaxError(msg); };
console.warn = msg => { throw new SyntaxError(msg); };

const args = process.argv.slice(2);
const optimizeForProduction = args.includes('-o') || args.includes('--optimize');

registerMaxSpecificity(0);
registerCSSInterfaceWithBootstrap4Theme();

const path = './scripts/renderAllComponents.jsx';
const CSS = compileCSS(path);

const format = new CleanCSS({
  level: optimizeForProduction ? 2 : 0,
  format: 'beautify',
  inline: ['none'],
});
const { styles: formattedCSS } = format.minify(CSS);

const outputFilePath = optimizeForProduction ? './lib/css/_datepicker-bootstrap4.css' : './css/styles-bootstrap4.css';
fs.writeFileSync(outputFilePath, formattedCSS, 'utf8');
