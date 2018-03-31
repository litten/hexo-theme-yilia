const {
  spawn
} = require('child_process');
const fs = require('fs');
const path = require('path');

let arguments = (process.argv && process.argv.length > 2) ? process.argv.splice(2) : [];
let isCnpmInstall = false;

arguments.forEach(arg => isCnpmInstall = !!(arg.toLowerCase().match('cnpm')));

// init `yilla_config.yml` in root dir,
if (!fs.existsSync(path.resolve(__dirname, '..', 'yilla_config.yml'))) {
  fs.copyFileSync(path.resolve(__dirname, '_config.yml'), path.resolve(__dirname, '..', 'yilla_config.yml'));
}

let nodeModulesMsg = isCnpmInstall ? 'cnpm' : 'npm';

let installDcy = spawn(nodeModulesMsg, ['install'], {
  shell: true,
  cwd: path.resolve(__dirname),
  detached: true
});

installDcy.stdout.on('data', (data) => {
  console.log(data.toString());
});

installDcy.stderr.on('data', (data) => {
  console.log(data.toString());
});

installDcy.on('exit', (code) => {
  // console.log(`install exit with code: ${code}`);
  if (code == 0) {
    console.log(`Install success !`);
    console.log(`Set  'theme: yilia' in the _config.yml`);
    console.log(`And the run ' npm --prefix yilia run dev ' to start it`);
    console.log(`Enjoy ~~~`);
  } else {
    console.log(`Install error !`);
    console.log(`Maybe someting wrong...`);
  }
});
