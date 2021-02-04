const core = require('@actions/core');
const { Octokit } = require('@octokit/rest');
const github = require('@actions/github');

const { checkPermission } = require('./util.js');

// **********************************************************
const token = core.getInput('token');
const octokit = new Octokit({ auth: `token ${token}` });
const context = github.context;

// **********************************************************
async function run() {
  try {
    const { owner, repo } = context.repo;
    if (context.eventName === 'pull_request' && context.payload.action == 'opened') {
      const title = context.payload.pull_request.title;
      const body = context.payload.pull_request.body;
      const number = context.payload.pull_request.number;
      const creator = context.payload.pull_request.user.login;

      const needCreatorAuthority = core.getInput('need-creator-authority');
      const refuseIssueLabel = core.getInput('refuse-issue-label');

      const comment = core.getInput('comment');
      const close = core.getInput('close');

      let result = true;

      // ********************************************************
      async function getIssues(page = 1) {
        let { data: issues } = await octokit.issues.listForRepo({
          owner,
          repo,
          state: 'open',
          labels: refuseIssueLabel,
          per_page: 100,
          page,
        });
        if (issues.length >= 100) {
          issues = issues.concat(await getIssues(params, page + 1));
        }
        return issues;
      }

      async function checkAuthority() {
        const res = await octokit.repos.getCollaboratorPermissionLevel({
          owner,
          repo,
          username: creator,
        });
        const { permission } = res.data;
        if (!checkPermission(needCreatorAuthority, permission)) {
          core.info(`The user ${creator} is not allow!`);
          return false;
        }
        return true;
      }

      // ********************************************************
      if (refuseIssueLabel) {
        const issues = await getIssues();
        const issuesNumber = issues.map(({ number }) => number);
        for await (let issueNo of issuesNumber) {
          if (result && (title.includes(issueNo) || body.includes(issueNo))) {
            if (needCreatorAuthority) {
              result = await checkAuthority();
            } else {
              result = false;
            }
          }
        }
      }

      if (result && needCreatorAuthority) {
        result = await checkAuthority();
      }

      if (!result) {
        core.info(`[${creator}] refuse!`);
        if (comment) {
          await octokit.issues.createComment({
            owner,
            repo,
            issue_number: number,
            comment,
          });
          core.info(`Actions: [create-comment][${number}] success!`);
        }

        if (close) {
          await octokit.issues.update({
            owner,
            repo,
            issue_number: number,
            state: 'closed',
          });
          core.info(`Actions: [close-pr][${number}] success!`);
        }
      }
    } else {
      core.info(`This Action only support PR opened!`);
    }
  } catch (error) {
    core.info(error.message);
  }
}

run();
