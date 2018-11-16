// @flow

module.exports = {
  // this should stay "as is" without any optimizations
  testNodeEnv: process.env.NODE_ENV === 'production' ? 'AAA' : 'BBB',
};
