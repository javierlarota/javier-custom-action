const core = require('@actions/core');
const github = require('@actions/github');
const { spawn } = require('child_process');

async function run() {
    const command = spawn('pwd');

    command.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    command.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });   
    command.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });    
    command.on('exit', function (code, signal) {
        console.log('child process exited with ' +
                    `code ${code} and signal ${signal}`);
    });    
}

run();