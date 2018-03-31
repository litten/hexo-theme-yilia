const {
  spawn
} = require('child_process');
const os = require('os');
let iconv = require('iconv-lite');
let shell = require('shelljs');
const colors = require('colors');
const path = require('path');


const bufferToString = (buffer) => {
  return os.type().match('Windows') ? iconv.decode(buffer, 'gbk') : buffer.toString();
};

const hexoServerLog = (output) => {
  console.log(`[hexo server]: ${output}`);
};

const Log = {
  info: output => hexoServerLog(colors.blue(output)),
  error: output => hexoServerLog(colors.red(output)),
  warning: output => hexoServerLog(colors.yellow(output)),
};


const checkHexoExist = () => {
  return new Promise((resolve, reject) => {
    if (shell.which('hexo')) resolve();
    else reject();
  });
};

checkHexoExist().then(() => {
  let hexoServer = spawn('hexo', ['server'], {
    shell: true,
    cwd: path.resolve(__dirname, '..'),
  });
  Log.info('Hexo Server Start');
  hexoServer.stdout.on('data', (data) => {
    Log.info(bufferToString(data));
  });

  hexoServer.stderr.on('data', (data) => {
    Log.error(bufferToString(data));
  });

  hexoServer.on('exit', (code) => {
    Log.warning(`child process exit with code : ${code}`);
  });
}, () => {
  Log.warning(`Hexo Server Start error :`)
  Log.warning(`Hexo is not exist, please run ${colors.bgCyan(' npm install -g hexo-cli ')}`);
  process.exit(1);
});
