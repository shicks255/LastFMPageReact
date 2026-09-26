// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const packagesToPatch = [
  'animated',
  'core',
  'konva',
  'native',
  'shared',
  'three',
  'web',
  'zdog',
];

function patchPackage(pkage) {
  const packageJsonPath = path.join(
    __dirname,
    '..',
    'node_modules',
    '@react-spring',
    pkage,
    'package.json',
  );
  // Optional renderers (native, three, konva, etc.) may not be installed.
  if (!fs.existsSync(packageJsonPath)) return;

  const packageJson = fs.readFileSync(packageJsonPath, 'utf-8');
  const modifiedPackageJson = packageJson.replace(
    '"sideEffects": false,',
    '',
  );
  fs.writeFileSync(packageJsonPath, modifiedPackageJson, {
    encoding: 'utf-8',
  });
}

packagesToPatch.forEach(patchPackage);
