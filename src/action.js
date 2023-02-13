const core = require('@actions/core');
const github = require('@actions/github');
const cloc = require('node-cloc')

async function run() {
    cloc('/my/folder').then((res) => console.log(res), (err) => console.log(err))
}

run();