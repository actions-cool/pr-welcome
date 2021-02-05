# PR Welcome

Thanks for your contribution. 😅 But I maybe refuse.

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
      - uses: actions-cool/pr-welcome@v1.0.0
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
| close | If close pr | boolean | ✖ |

## Note

- When has `refuse-issue-label` or `need-creator-authority`, it will begin filter mode
- Comment only once in a PR

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
