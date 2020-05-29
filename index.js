#! /usr/local/bin/node

const fs = require('fs');
const path = require('path');
const c = require('ansi-colors');

const stdin = process.stdin;
const react = `/node_modules/react`;
const reactDom = `/node_modules/react-dom`;

const target = path.resolve(process.argv[2]);
const symlink = process.cwd();

function exitOnError(err) {
  if (err) {
    throw err;
  }
}

function relative(p) {
  return path.resolve(p).replace(process.env.HOME, '~');
}

try {
  fs.lstatSync(target).isDirectory()
} catch(e) {
  console.error(c.yellow(`${relative(target)} does not exist`));
  process.exit();
}

stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

console.log(`${c.blue('link react dependencies from')} ${relative(target)} ${c.blue('to')} ${relative(symlink)} ${c.blue('y/n?')}`);

stdin.on('data', key => {
  if (key === '\u0003' || key === 'n') {
    console.log(c.yellow('aborted'));
    process.exit();
  } else if (key === 'y') {
    fs.rmdirSync(`.${react}`, { recursive: true }, exitOnError);
    fs.rmdirSync(`.${reactDom}`, { recursive: true }, exitOnError);

    fs.symlink(`${target}${react}`, `.${react}`, err => {
      exitOnError(err);

      fs.symlink(`${target}${reactDom}`, `.${reactDom}`, err => {
        exitOnError(err);

        console.log(c.blue('done'));

        process.exit();
      });
    });
  } else {
    console.log(c.yellow('y/n?'));
  }
});
