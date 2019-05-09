// @flow strict

/**
 * This function requires specified `package.json` and modifies it to be later
 * published. More specifically, it does this:
 *
 * ```json
 * {
 *   "main": "src/index.js"
 * }
 * ```
 *
 *   ↓ ↓ ↓
 *
 * ```json
 * {
 *   "main": "cjs/src/index.js"
 *   "module": "esm/src/index.js"
 * }
 * ```
 */
export default function requireAndModifyPackageJSON(
  packageJSONLocation: string,
) {
  // $FlowAllowDynamicImport
  const packageJSON = require(packageJSONLocation);

  if (packageJSON.main === undefined) {
    // Some packages do not have main script. They are usually private
    // workspaces not intended to be published.
    return packageJSON;
  }

  return {
    ...packageJSON,
    main: `cjs/${packageJSON.main}`,
    module: `esm/${packageJSON.main}`,
  };
}
