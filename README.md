# rli

Symlink React dependencies for easier local package development.

## Usage

From your library's _root directory_, run `npm link` as you normally would.
Then, link your library's React dependencies to the project directory
where you've linked your library.

```
npx rli ~/path/to/project
```

Don't forget to re-run `rli` after `npm i` or `npm link`, since `npm` will
override symlinks.

### License

MIT License © [Eric Bailey](https://estrattonbailey.com)
