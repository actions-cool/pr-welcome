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
    if (context.eventName === 'pull_request') {
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
        let out;
        const res = await octokit.repos.getCollaboratorPermissionLevel({
          owner,
          repo,
          username: creator,
        });
        const { permission } = res.data;
        out = checkPermission(needCreatorAuthority, permission);
        core.info(`The user ${creator} check ${out}`);
        return out;
      }

      // ********************************************************
      if (refuseIssueLabel) {
        const issues = await getIssues();
        const issuesNumber = issues.map(({ number }) => number);
        for await (let issueNo of issuesNumber) {
          core.info(`Check issue ${issueNo}`);
          if (result && (title.includes(issueNo) || body.includes(issueNo))) {
            if (needCreatorAuthority) {
              result = await checkAuthority();
            } else {
              result = false;
            }
          } else {
            core.info(`The pr do not Mention ${issueNo}`);
          }
        }
      } else if (needCreatorAuthority) {
        result = await checkAuthority();
      }

      core.info(`The result is ${result}.`);

      if (!result) {
        if (comment) {
          try {
            await octokit.issues.createComment({
              owner,
              repo,
              issue_number: number,
              body: comment,
            });
            core.info(`Actions: [create-comment][${number}] success!`);
          } catch (error) {
            core.info(error.message);
          }
        }

        if (close == 'true') {
          try {
            await octokit.issues.update({
              owner,
              repo,
              issue_number: number,
              state: 'closed',
            });
            core.info(`Actions: [close-pr][${number}] success!`);
          } catch (error) {
            core.info(error.message);
          }
        }
        core.setFailed(`[${creator}] refuse!`);
      }
    } else {
      core.setFailed(`This Action only support PR!`);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
