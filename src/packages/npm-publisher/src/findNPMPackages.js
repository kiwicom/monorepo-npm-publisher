// @flow

import glob from 'glob';
import path from 'path';

type Callback = ({
  packageFolderPath: string,
  packageFolderName: string,
  packageJSONFile: Object,
}) => void;

// TODO: possibly replaceable with `@kiwicom/monorepo` and `iterateWorkspacesInPath` (?)
export default function findNPMPackages(
  packagesLocation: string,
  cb: Callback,
) {
  glob(
    path.join(packagesLocation, './*/package.json'),
    (error, packageJSONPaths) => {
      packageJSONPaths.forEach(packageJSONPath => {
        // $FlowAllowDynamicImport
        const packageJSONFile = require(packageJSONPath);
        // we can publish only public packages
        if (packageJSONFile.private === false) {
          const packageFolderPath = path.dirname(packageJSONPath);
          const packageFolderName = packageFolderPath.replace(
            new RegExp(packagesLocation + '/'),
            '',
          );
          cb({
            packageFolderPath,
            packageFolderName,
            packageJSONFile,
          });
        }
      });
    },
  );
}
