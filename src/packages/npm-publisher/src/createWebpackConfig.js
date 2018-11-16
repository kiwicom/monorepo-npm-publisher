// @flow

import path from 'path';
import nodeExternals from 'webpack-node-externals';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import paths from '../../../../paths';

type PackageJSON = {|
  +main: string,
|};

export default function createWebpackConfig(
  packageFolder: string,
  packageJSON: PackageJSON,
) {
  const packageMainFile = packageJSON.main;

  return {
    mode: 'none',
    target: 'node',
    optimization: {
      nodeEnv: false,
      namedModules: true,
      namedChunks: true,
    },
    entry: {
      [path.join(packageFolder, packageMainFile)]: path.join(
        paths.packages,
        packageFolder,
        packageMainFile,
      ),
    },
    output: {
      path: paths.buildCache,
      filename: '[name]',
      libraryTarget: 'commonjs2',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: true,
            },
          },
        },
      ],
    },
    externals: [nodeExternals()],
    plugins: [
      new CopyWebpackPlugin(
        ['README.md', 'package.json'].map(fileName => ({
          from: path.join(paths.packages, packageFolder, fileName),
          to: path.join(paths.buildCache, packageFolder),
        })),
      ),
    ],
  };
}
