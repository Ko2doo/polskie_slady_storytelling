import fs from 'node:fs';
import path from 'node:path';

const source = path.resolve(
  'apps/demo-app/dist'
);

const destination = path.resolve(
  'apps/storytelling/dist/demo'
);

fs.rmSync(destination, {
  recursive: true,
  force: true
});

fs.cpSync(source, destination, {
  recursive: true
});

console.log('Demo copied');