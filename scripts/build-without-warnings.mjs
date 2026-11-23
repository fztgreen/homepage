// Angular CLI has no "treat warnings as errors" switch, so this runs `ng build`
// and fails when its output contains a warning (budget, CommonJS, Sass, ...).
import { spawnSync } from 'node:child_process';

const warningMarker = /\[WARNING\]/;
const ansiEscapes = /\x1b\[[0-9;]*m/g;

const build = spawnSync('npx', ['ng', 'build', ...process.argv.slice(2)], {
  encoding: 'utf8',
  shell: true
});

const output = `${build.stdout}${build.stderr}`;
process.stdout.write(output);

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

if (warningMarker.test(output.replace(ansiEscapes, ''))) {
  console.error(
    '\nBuild produced warnings; warnings are errors in this project.'
  );
  process.exit(1);
}
