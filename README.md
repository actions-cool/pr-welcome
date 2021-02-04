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
          emoji: '+1, -1'
          close: true
```

| Name | Desc | Type | Required |
| -- | -- | -- | -- |
| token | GitHub token | string | ✔ |
| refuse-issue-label | Only when the label included in the issue mentioned in the PR is triggered | string | ✖ |
| need-creator-authority | Filter the permissions of the creator. Option: `read` `write` `admin` | string | ✖ |
| comment | Comment content after filter | string | ✖ |
| emoji | Comment emoji | string | ✖ |
| close | If close pr | boolean | ✖ |

## Note

- When no `refuse-issue-label` and `need-creator-authority`, everyone meet the conditions
- Comment only once

## Changelog

[CHANGELOG](./CHANGELOG.md)

## LICENSE

[MIT](./LICENSE)
