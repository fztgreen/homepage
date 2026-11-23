// Angular CLI has no "treat warnings as errors" switch, so this runs `ng build`
// and fails when its output contains a warning (budget, CommonJS, Sass, ...).
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';

const warningMarker = /\[WARNING\]/;
const ansiEscapes = /\x1b\[[0-9;]*m/g;

const angularCli = createRequire(import.meta.url).resolve(
  '@angular/cli/bin/ng.js'
);

// Run the CLI with this Node directly rather than through npx and a shell, so arguments
// reach ng unchanged and output streams live instead of arriving when the build ends.
const build = spawn(
  process.execPath,
  [angularCli, 'build', ...process.argv.slice(2)],
  { stdio: ['inherit', 'pipe', 'pipe'] }
);

let output = '';
build.stdout.on('data', echoTo(process.stdout));
build.stderr.on('data', echoTo(process.stderr));
build.on('error', failToStart);
build.on('close', reportResult);

function echoTo(stream) {
  return (chunk) => {
    stream.write(chunk);
    output += chunk.toString();
  };
}

function failToStart(error) {
  console.error(`Could not start ng build: ${error.message}`);
  process.exit(1);
}

function reportResult(exitCode) {
  if (exitCode !== 0) {
    process.exit(exitCode ?? 1);
  }

  if (warningMarker.test(output.replace(ansiEscapes, ''))) {
    console.error(
      '\nBuild produced warnings; warnings are errors in this project.'
    );
    process.exit(1);
  }
}
