# Typescript Monorepo Template
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fp-j%2Fgeocodejson.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fp-j%2Fgeocodejson?ref=badge_shield)


This template is intended for OSS Typescript based projects and is centered around a few tools:

- **yarn** for dependency management and running tasks like `test` or `publish`
- **lerna** for running package level commands
- **changeset** for managing changelog generation, and release creation

## How to use this template

- Get started by clicking [Use this template](https://github.com/p-j/typescript-monorepo-template/generate)
- Update the required files as [described below](https://github.com/p-j/typescript-monorepo-template#what-you-need-to-change)
- Use `yarn` for dependencies as this template make use of [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)
- Browse the scripts to understand how `lerna` `changeset` and `yarn` play together to `build` `test` and `publish` releases.

## What you need to change

- `package.json`: change project name, author etc...
- `LICENSE`: change the copyright holder
- `CODE_OF_CONDUCT.md`: change the contact address in the `Enforcement` paragraph
- `.github/workflows/release.yml`: change the guard to your repository name
- `.changeset/config.json`: change the repository name


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fp-j%2Fgeocodejson.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fp-j%2Fgeocodejson?ref=badge_large)