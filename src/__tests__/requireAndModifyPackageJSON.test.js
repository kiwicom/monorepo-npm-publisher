// @flow strict

import mrequire from '../requireAndModifyPackageJSON';

it('requires and modifies simplePackage.json', () => {
  expect(mrequire(`${__dirname}/fixtures/simplePackage.json`)).toEqual({
    name: 'simplePackage',
    version: '0.0.0',
    main: 'cjs/src/index.js',
    module: 'esm/src/index.js',
    dependencies: {
      '//': 'none',
    },
  });
});

it('returns package.json "as is" is missing main script', () => {
  expect(mrequire(`${__dirname}/fixtures/missingMain.json`)).toEqual({
    name: 'missingMain',
    version: '0.0.0',
    dependencies: {
      '//': 'none',
    },
  });
});
