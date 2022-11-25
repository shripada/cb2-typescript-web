# typescript-web

This is a boilerplate project that you can use to develop typescript based web apps. We use webpack bundler for bundling the assets and ensure transpiling of typescript into js and minifying js, etc.

## Installing the dependencies

Once you clone this repo, run
`npm install`

## Development mode

Run

```
npm run start
```

This will build the app in dev mode and dev server will start running the app in localhost:8080 port.

You can debug the typescript files in web as well as inside vscode.

## Source files

Add all your typescript files and any jest unit test files under /src folder or in any subfolder under src/. src/index.html is your template html file. Any assets such as fonts or images must be placed under /src/assets/ folder.
