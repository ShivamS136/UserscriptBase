# UserscriptBase

This package is a single point solution to develop, test, release, and maintain all kind of UserScripts in an efficient manner.
This package is full of the features like:

- Using central place for hosting the scripts
- Using build tools like [`Vite`](https://vitejs.dev/) with a dedicated plugin for userscripts [`vite-plugin-monkey`](https://github.com/lisonge/vite-plugin-monkey).
- Auto page refresh in dev mode for script/config changes in local code
- Hot Module Replacement(HMR) for supported frameworks (Not fully configured in this package as of now but supported by Vite)
- Supports both vanilla userscripts and userscripts created using vite configs
- Expose library scripts as well to use in other userscripts outside this package as well using `@require`
- Generate separate Userscript Meta file for better and faster script update checks
- [TypeScript](https://www.typescriptlang.org/) Support for typechecking in JavaScript
- TS files are auto picked by `.ts` extension
- TS is not forced and `.js` files are also supported in the package
- [ESLint](https://eslint.org/) Support for linting check and auto fix purpose
- [Prettier](https://prettier.io/) Support to automatically prettify the code files
- [SASS/SCSS](https://sass-lang.com/) and [CSS Modules](https://github.com/css-modules/css-modules) support out of the box by default.
- Fully configurable build system
- ...and many more

UserScripts can be installed via [TamperMonkey](https://www.tampermonkey.net/)/[GreaseMonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/).

---

## Template Setup

Node version >=18 is recommended. Feel free to use [nvm](https://github.com/nvm-sh/nvm) to manage node versions.

Basic setup is pretty clear, just clone this package based on [template branch of this package]() with latest commit and that's it.

> Always run build on local before pushing code so that the code files can get linted and prettified on local before build creation on server.
> You can run `npm run clean && npm run build` for the same before git commit.
>
> OR
>
> You can set up ESlint and Prettier in your IDE (e.g. IntelliJ) and enable `run lint --fix on save`.

### Base content to update

As the package is created using the reference package, so you might need to update the references of the package in the code to your package.
Apart from the code files below updates are required:

#### package.json

Update below keys according to your package:

- **name:** Update the name of your npm package.
- **description:** Update the description of your npm package here.
- author
- repository
- homepage

#### Code files

All userscript files inside `src/vanilla` and all `vite.config.js` files might require updates but not always.
Check if it is needed in your case. You might want to completely replace the files itself.

## Directory Structure

By default, both TypeScript(`.ts`) and JavaScript(`.js`) files are supported in the package.

### `src`

This directory contains the main userscript files.
When you want to create a userscript, just create a folder for that script with a code file and a `vite.config.ts` or `vite.config.js` file.

The directory `src/vanilla` is **reserved** for the vanilla userscript files.
Vanilla Userscript files are the files which contains the UserScript metadata (`// ==UserScript== ` Comment Block) within themselves.
So such files don't need a `vite.config.{ts,js}` file.

Though you can see a `vanilla-vite.config.ts` file inside `src/vanilla`, that's there for dev mode purpose only.

### `lib`

This directory contains common code files which can be used inside multiple userscript files.
These lib files are also part of the build so that these files can also be used anywhere outside the package as well.
We can add external files inside userscript file using [`@require`](https://www.tampermonkey.net/documentation.php?locale=en#meta:require) tag.

### `utils`

This directory is used to keep utility files or the common files you don't want to be part of the lib build mentioned above.

### `tst`

This directory is used to keep test files separately. Though tests can be written inside the source file itself as well.

## Common Commands

### install

Run `npm ci` or `npm install` to install any dependency in the package.
Run with `-D` flag to install the dependency as devDependency.

### build

Run `npm run build` to create a build of the package for all the userscripts including vanilla userscripts, which can be found inside `build/userscripts`.
This will create build of `lib` as well inside `build/lib` with type declaration files if available.

### clean

To clean the build simply run `npm run clean`.
It will clean the directories `dist/`, `build/lib`, and `build/userscripts`.

### dev mode

The package supports dev mode out of the box.
Using dev mode, you can run a local server which will have the auto reloadable userscript.
Just install this script, keep the local server running and whenever you change the code, the website using the userscript will get auto reload.
So no need to copy-paste the script in TamperMonkey/GreaseMonkey everytime you make a change while testing.

Dev mode is accepted in below 2 manners:

#### 1. Vanilla Scripts

For vanilla scripts run the command

```shell
VANILLA_SRC=src/vanilla/userScriptName npm run dev -- src/vanilla/vanilla-vite.config.ts

# e.g.
# VANILLA_SRC=src/vanilla/sayHello.user.js npm run dev -- src/vanilla/vanilla-vite.config.ts
```

Replace `userScriptName` with your vanilla userscript name.

#### 2. Other Scripts

For other than Vanilla scripts just run the command:

```shell
npm run dev -- pathToViteConfigFileOfScript

# e.g.
# npm run dev -- src/english/vite.config.ts
```

Replace `pathToViteConfigFileOfScript` with you userscript's Vite Config File.

## Testing

[`vitest`](https://vitest.dev/) is being used for unit testing purpose in this package.
This is a Jest alternative, which is created specifically for vite builder. It is written on top of Jest, so it supports all Jest APIs as well.

To run tests just run `npm run test` or use `vitest` directly. `vitest` specific CLI configurations can be found [here](https://vitest.dev/guide/cli.html).

Coverage report is also enabled by default and can be configured via `vitest.config.ts`.

Unit testing can be performed in 2 ways:

### 1. Separate Test File

A test file with pattern like `*.test.{ts,js}` can be written inside `tst` directory. The file will be picked automatically for unit testing.

The examples of the same can be seen inside `tst` directory itself.

> For testing userscripts source files, you have to export the function(s) from source file which you want to test.
>
> Don't worry, it'll not be reflected in the build.
> If you don't want to export then you can write the tests inside the source file itself as mentioned in the second approach.

### 2. Inside Source File

You can write the test code inside the source file itself. This makes the tests share the same closure as the implementations and able to test against private states without exporting.
Meanwhile, it also brings a closer feedback loop for development. To know more check [here](https://vitest.dev/guide/in-source.html).

The example of the same can be found inside `src/math/math.ts`. Observe the `vite.config.ts` file as well there as we defined `import.meta.vitest` `undefined` to remove test code section from build output.
So if you want to write In-source tests, don't forget to define the above meta property in config file otherwise you'll get the test code in the build output.
This will not create trouble but will increase the file size unnecessarily.

**Sample code:**

```ts
// src/index.ts

// the implementation
export function add(...args: number[]) {
  return args.reduce((a, b) => a + b, 0);
}

// in-source test suites
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('add', () => {
    expect(add()).toBe(0);
    expect(add(1)).toBe(1);
    expect(add(1, 2, 3)).toBe(6);
  });
}
```

## Tips

### CSS

To use CSS, no need to use `GM_addStyle`, just import the `.css/.scss/.sass` file in the JS file like below, and you are good to go.
The package supports [SASS/SCSS](https://sass-lang.com/) by default.

```js
import 'style/main.scss';
```

OR

```js
import styles from 'style/main.module.scss';
```

## Troubleshoot

#### Getting file missing errors during build

By default, complete folder structure with files is required as we use the files in the npm scripts.
If you want to remove/rename any base directory like `src`, `src/vanilla`, `lib`, then update/remove the related
scripts from `package.json`.

#### Script is not getting loaded in dev mode due to Content Security Policy

In dev mode, the script gets installed from localhost with URL
like `http://127.0.0.1:5173/__vite-plugin-monkey.entry.js` but in many websites we have CSP so that external scripts
don't get loaded into the webpage. But as for our testing purpose we need to get the script loaded and there's chance
that it gets blocked due to CSP.

You might get error like below:

> Refused to load the script 'http://127.0.0.1:5173/__vite-plugin-monkey.entry.js' because it violates the following
> Content Security Policy directive: "script-src 'unsafe-eval' `...` 'self' '
> unsafe-inline'". Note that 'script-src-elem' was not explicitly set, so 'script-src' is used as a fallback.

To fix this, we can download [Disable-CSP](https://github.com/lisonge/Disable-CSP) extension and disable HTTP/HTML CSP
on the page we want to test our script and disable it once we are done with the
testing. [[Related Github Issue](https://github.com/lisonge/vite-plugin-monkey/issues/1)]
