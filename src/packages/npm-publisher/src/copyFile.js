// @flow

import fs from 'fs';

export default function copyFile(
  source: string,
  destination: string,
  required: boolean = true,
): void {
  try {
    fs.accessSync(source, fs.constants.F_OK);
    fs.copyFileSync(source, destination);
  } catch (error) {
    if (required === true) {
      throw error;
    }
    // noop - file doesn't exist
  }
}
