'use strict';

const path = require('path');
const appRootDir = require('app-root-dir');

const defaultTargets = [
  'last 4 Chrome major versions',
  'last 3 ChromeAndroid major versions',
  'last 2 ios major versions',
  'last 3 Edge major versions',
  'last 4 Firefox major versions',
  'last 3 Safari versions',
];

function getBrowserTargets(options) {
  const additionalTargets = options.additionalTargets || [];
  return {
    browsers: defaultTargets.concat(additionalTargets),
  };
}
function getNodeTargets(options) {
  return {
    node: options.nodeTarget || '8.9'
  };
}
module.exports = function(context, options) {
  if (!options) options = {};

  const buildBrowserTargets =
    (options.env && options.env.targets) || getBrowserTargets(options || {});
  const buildNodeTargets = (options.env && options.env.targets) || getNodeTargets(options || {});

  const env = process.env.BABEL_ENV || process.env.NODE_ENV;
    if (env !== 'development' && env !== 'test' && env !== 'production') {
        throw new Error(
            'Using `@starlightpro/babel-preset-starlight` requires that you specify `NODE_ENV` or ' +
                '`BABEL_ENV` environment variables. Valid values are "development", ' +
                '"test", and "production". Instead, received: ' +
                JSON.stringify(env) +
                '.'
        );
    }
    const type = process.env.BABEL_OUTPUT || (env === 'test' ? 'cjs' : 'esm');
    if (type !== 'esm' && type !== 'cjs') {
        throw new Error(
            'Invalid value for the `BABEL_OUTPUT` environment variable.' +
                ' Valid values are "esm", and "cjs". Instead, received: ' +
                JSON.stringify(type) +
                '.'
        );
    }

    const isNode = options.node === true ? true : false;
    const envOptions = Object.assign(
      {
          loose: true,
          modules: type === 'cjs' ? 'commonjs' : false,
          targets: isNode ? buildNodeTargets : buildBrowserTargets,
      },
      options.env || {}
  );

  const presets = [
    [require.resolve('@babel/preset-env'), envOptions],
    [
      require.resolve('@babel/preset-react'),
      {
          development: env === 'development',
          useBuiltIns: true,
      },
    ],
  ];
  const plugins = [
    require.resolve('@babel/plugin-syntax-dynamic-import'),
    require.resolve('@babel/plugin-transform-flow-strip-types'),
    [
      require.resolve('@babel/plugin-proposal-class-properties'),
      { loose: true }
    ],
    [
      require.resolve('@babel/plugin-proposal-object-rest-spread'),
      {
          useBuiltIns: true,
      },
  ],
  require.resolve('@babel/plugin-proposal-export-default-from'),
  require.resolve('@babel/plugin-proposal-export-namespace-from'),
  require.resolve('babel-plugin-lodash'),
  ];

  if (options.srcDir != null) {
    plugins.push([
      require.resolve('babel-plugin-module-resolver'),
      {
        root: [path.resolve(appRootDir.get(), options.srcDir)]
      }
    ])
  }


if (env === 'production') {
  plugins.push([
    require.resolve('@babel/plugin-transform-react-constant-elements'),
    require.resolve('@babel/plugin-transform-react-inline-elements')
  ])
}
  return {
    presets: presets,
    plugins: plugins,
};
};
