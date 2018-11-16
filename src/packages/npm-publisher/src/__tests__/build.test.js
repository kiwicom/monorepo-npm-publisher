// @flow

import path from 'path';
import MemoryFS from 'memory-fs';
import webpack from 'webpack';

import paths from '../../../../../paths';
import createWebpackConfig from '../createWebpackConfig';

const fixturesLocation = path.join(
  'npm-publisher',
  'src',
  '__tests__',
  'fixtures',
);

const fs = new MemoryFS();
fs.mkdirpSync(path.join(paths.buildCache, fixturesLocation));

const compiler = webpack(
  createWebpackConfig(fixturesLocation, {
    main: 'example-package.js',
  }),
);

compiler.outputFileSystem = fs;

it('compiles correct build', done => {
  expect.assertions(3);

  compiler.run(err => {
    if (err) {
      throw err;
    }

    const content = fs.readFileSync(
      path.join(paths.buildCache, fixturesLocation, 'example-package.js'),
    );
    expect(content.toString()).toMatchSnapshot();

    const __NODE_ENV = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    let x = eval(content.toString());
    expect(x.testNodeEnv).toBe('AAA');

    process.env.NODE_ENV = __NODE_ENV;
    x = eval(content.toString());
    expect(x.testNodeEnv).toBe('BBB');

    done();
  });
});
