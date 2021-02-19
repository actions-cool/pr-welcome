# 😅 PR Welcome

![](https://img.shields.io/github/workflow/status/actions-cool/pr-welcome/CI?style=flat-square)
[![](https://img.shields.io/badge/marketplace-pr--welcome-blueviolet?style=flat-square)](https://github.com/marketplace/actions/pr-welcome)
[![](https://img.shields.io/github/v/release/actions-cool/pr-welcome?style=flat-square&color=orange)](https://github.com/actions-cool/pr-welcome/releases)

Thanks for your contribution. But I maybe refuse.

## How to use?

```yml
name: PR Welcome

on:
  pull_request_target:
    types: [opened, edited, reopened]

jobs:
  welcome:
    runs-on: ubuntu-latest
    steps:
      - uses: actions-cool/pr-welcome@v1.1.1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          refuse-issue-label: 'xxx'
          need-creator-authority: 'write'
          comment: |
            HI ~

            你好~
          emoji: '+1, -1, heart'
          close: true
```

| Name | Desc | Type | Required |
| -- | -- | -- | -- |
| token | GitHub token | string | ✔ |
| refuse-issue-label | Only when the label included in the issue mentioned in the PR is triggered | string | ✖ |
| need-creator-authority | Filter the permissions of the creator. Option: `read` `write` `admin` | string | ✖ |
| comment | Comment content after filter | string | ✖ |
| emoji | Comment [emoji](#emoji-list) | string | ✖ |
| pr-emoji | Add emoji to PR | string | ✖ |
| close | If close pr | boolean | ✖ |

## Note

- When has `refuse-issue-label` or `need-creator-authority`, it will start filter mode
- Comment only once in a PR
- Triger event only support `pull_request` and `pull_request_target`. When use `pull_request`, the Action will only show the CI status icon(Because of permissions). When use `pull_request_target`, must [see](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#pull_request_target)

## Changelog

[CHANGELOG](./CHANGELOG.md)

## Emoji List

| content | emoji |
| -- | -- |
| `+1` | 👍 |
| `-1` | 👎 |
| `laugh` | 😄 |
| `confused` | 😕 |
| `heart` | ❤️ |
| `hooray` | 🎉 |
| `rocket` | 🚀 |
| `eyes` | 👀 |

## LICENSE

[MIT](./LICENSE)
