const core = require('@actions/core');
const github = require('@actions/github');
const spawn = require('node:child_process');

async function run() {
    const command = spawn('sudo apt-get update -y && sudo apt-get install -y cloc');

    command.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    command.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });   
    command.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });    
    
    const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
    const octokit = github.getOctokit(GITHUB_TOKEN);

    const {context = {} } = github;
    const { pull_request } = context.payload;

    await octokit.issues.createComment({
        ...context.repo,
        issue_number: pull_request.number,
        body: 'Thank you for submitting a pull request! We will try to review this as soon as we can.'
    });
}

run();