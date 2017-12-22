# Babel Preset Starlight

> Babel preset containing common plugins and presets used at Starlight.


## Installation

`yarn add --dev @starlightpro/babel-preset-starlight`

Babel preset Starlight uses Babel 7.0 ([more detail](https://babeljs.io/blog/2017/09/12/planning-for-7.0))

> ⚠️
> * babel-loader 8.0 +
> * @babel/core
> * [uglifyjs-webpack-plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin)
>   v1.0.0 or [babel-minify](https://github.com/babel/minify) (options)

## Usage

```json
{
  "presets": ["@starlightpro/babel-preset-starlight"]
}
```

#### Customized

```json
{
  "presets": [
    ["@starlightpro/babel-preset-starlight", {
      "node":true,
      "nodeTarget": "current",
      "env": {
        "debug": false
      },
      "srcDir": "./src"
    }]
  ]
}
```

## Options

### runtime BABEL_ENV

Supports either `production`, `development` or `test`

### runtime BABEL_OUTPUT

Supports either `esm` or `cjs`

Default to `esm` unless BABEL_ENV is set to test then it defaults to `cjs`

### options.env

All options from `@babel/preset-env` are available for configuration by adding `env: {}` to the options object.

See [`@babel/preset-env`](http://babeljs.io/docs/plugins/#plugin-preset-options) documentation.

### options.srcDir
`string`, defaults to not enabled.    
      
`babel-plugin-module-resolver` is enabled if `srcDir: '<src>'` is present.     
    
### options.node
`boolean`, defaults to false.
      
Add `node: true` to build specifically for node targets. Default is build for browser.
        
### options.nodeTarget
`string | number | "current"`, defaults to '8.9'     
       
allows you to specifically target a node version.       

### options.additionalTargets
`Array<string> | string`       
      
Target additional browsers not included in the default browser list targets.

Default browser targets:     
      
```javascript
[
  'last 4 Chrome major versions',
  'last 3 ChromeAndroid major versions',
  'last 2 ios major versions',
  'last 3 Edge major versions',
  'last 4 Firefox major versions',
  'last 3 Safari versions',
];
```
