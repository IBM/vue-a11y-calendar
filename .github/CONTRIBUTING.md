# Contributing to Vue A11Y Calendar

Vue A11Y Calendar is a headless CMS designed with content strategy at its heart. With a focus on content management and content management only, it reinforces at its heart the [create once, publish everywhere](http://www.programmableweb.com/news/cope-create-once-publish-everywhere/2009/10/13) mentality of reusable content.

Participation in the Vue A11Y Calendar community, including contributing to the Vue A11Y Calendar codebase, is governed by our [Code of Conduct](https://github.com/IBM/vue-a11y-calendar/blob/master/CODE_OF_CONDUCT.md). By participating, you agree to abide by it.

 Vue A11Y Calendar is covered by these contributing guidelines, as well as the [Apache License 2.0](http://spdx.org/licenses/Apache-2.0).

## Submitting Issues

* Before creating a new issue, perform a [cursory search](https://github.com/IBM/vue-a11y-calendar/issues) to see if a similar issue has already been submitted. Similar issues may have different names than what you would have written, and may have been closed.
* Can create an issue in the most relevant repository. If unable to determine which one that is, file an issue in this repository. It may be moved.
* Please follow our [Issue Guidelines](#issue-guidelines) when creating a new issue.
* Do not open a [pull request](#pull-requests) to resolve an issue without first receiving feedback a maintainer and having them agree on a solution forward.
* Include screenshots and animated GIFs whenever possible; they are immensely helpful.
* When submitting a browser bug, please include the browser, version, operating system, and operating system version.
* When submitting an update to or a new feature, pattern, guideline, etc… we prefer to see user research associated with the suggestion including testing methods, results, and sample size, whenever possible. This allows us to make more user-centered decisions and cut through assumptions and individual preferences.
* Issues that have a number of sub-items that need to be complete should use [task lists](https://github.com/blog/1375%0A-task-lists-in-gfm-issues-pulls-comments) to track the sub-items in the main issue comment.

## Pull Requests

* **DO NOT ISSUE A PULL REQUEST WITHOUT FIRST [SUBMITTING AN ISSUE](#submitting-issues)**
* **ALL PULL REQUESTS MUST INCLUDE A [DEVELOPER CERTIFICATE OF ORIGIN](#developer-certificate-of-origin)**
* Please follow our [Pull Request Guidelines](#issue-guidelines) when creating a new issue.
* Pull requests should reference their related issues. If the pull request closes an issue, [please reference its closing from a commit messages](https://help.github.com/articles/closing-issues-via-commit-messages/). Pull requests not referencing any issues will be closed.
* Commit messages _must_ begin with the [relevant emoji](#emoji-cheatsheet) describing what the commit does.
* Pull request titles should be descriptive, explaining at the high level what it is doing, and should be written in the same style as [commit messages](#git-commit-messages).
* Do not squash or rebase commits when submitting a Pull Request
* Ensure no Emoji tags are used in the title of the Pull Request

## Pull Request Guidelines

In order to expedite the process of reviewing and merging pull requests, we request the following guidelines are adhered to.

### Tips for Submitting Great PRs

Beyond just writing the code needed to resolve an issue, there are a few best practices that should be followed to submit a great PR:

* We have [EditorConfig](http://editorconfig.org/) files set up for Vue A11Y Calendar. Having EditorConfig installed and used will help ensure that editors are configured to follow our conventions.
* We have JavaScript and Sass linting set up (where appropriate). Before committing code, make sure that linting has been run locally and passes by running `npm run lint`
* We have automated testing set up. They can be run locally by by running `npm test` from the command line. This will run linting, our test suite, and show code coverage. These same tests are run as part of our automated test suite and must pass for all pull requests.
* For consistency, follow the conventions that the team has in place that aren't necessarily covered by our automated test suite. For instance, the team may be using `map` instead of `forEach` to create new arrays, or may divide out their Sass partials in a particular way.
* When writing browser code, ensure it works cross-browser in all Evergreen (auto-updating, not tied to a operating system version, not referred to by version number) browsers, as well as the latest version of Safari on iOS devices.
* When writing browser code, we adhere to the principles of [progressive enhancement](http://alistapart.com/article/understandingprogressiveenhancement) and expect new code to follow the same principles.
* Solve the issue in as few lines of code, with as few external dependencies, as possible. The most maintainable lines of code are the ones that don't exist, so keeping PRs as small, clear, and concise as possible will aid in overall project maintainability, stability, and make it easier for us to do code review.
* Commit tests separately from implementation code.
* PRs are easiest to review when they're small. Please keep total lines of code changed to around 200. This may mean breaking up work over multiple PRs. If this is done, one PR for tests and one PR for functionality is usually a good place to start, with tests being submitted and merged first (and skipped) and functinality being submitted and merged second (unskipping the tests)
* Commit early and often. Small, atomic commits help us understand the thought process that went in to creating a pull request and make it easier for us to review. Do not squash or rebase your commits when submitting pull requests.
* Do not [refactor](http://blog.codeclimate.com/blog/2014/01/09/when-is-it-time-to-refactor/) existing code unless it is _absolutely necessary_ to resolve the issue being worked on. If there is an opportunity to refactor, please file a separate issue to discuss and implement instead.
* Only include code that resolves the [scenarios](https://github.com/IBM/vue-a11y-calendar/blob/master/CONTRIBUTING.md#issue-guidelines) in the issue being worked on (or the specific bug being fixed). While appreciated, work that goes above-and-beyond the scenarios outlined in an issue is out-of-scope and we will not be able to accept it. Please either work with the Vue A11Y Calendar team to get scenarios written for the issue being worked on, or split up the work across multiple issues and pull requests.

### Developer Certificate of Origin

All contributions to Vue A11Y Calendar must be accompanied by acknowledgment of, and agreement to, the [Developer Certificate of Origin](http://elinux.org/Developer_Certificate_Of_Origin), reproduced below. Acknowledgment of and agreement to the Developer Certificate of Origin _must_ be included in the comment section of each contribution and _must_ take the form of `DCO 1.1 Signed-off-by: FULL_NAME <EMAIL_ADDRESS>`. Contributions without this acknowledgment will be required to add it before being accepted. If a contributor is unable or unwilling to agree to the Developer Certificate of Origin, their contribution will not be included.

```
Developer Certificate of Origin
Version 1.1

Copyright (C) 2004, 2006 The Linux Foundation and its contributors.
660 York Street, Suite 102,
San Francisco, CA 94110 USA

Everyone is permitted to copy and distribute verbatim copies of this
license document, but changing it is not allowed.

Developer's Certificate of Origin 1.1

By making a contribution to this project, I certify that:

(a) The contribution was created in whole or in part by me and I
    have the right to submit it under the open source license
    indicated in the file; or

(b) The contribution is based upon previous work that, to the best
    of my knowledge, is covered under an appropriate open source
    license and I have the right under that license to submit that
    work with modifications, whether created in whole or in part
    by me, under the same open source license (unless I am
    permitted to submit under a different license), as indicated
    in the file; or

(c) The contribution was provided directly to me by some other
    person who certified (a), (b) or (c) and I have not modified
    it.

(d) I understand and agree that this project and the contribution
    are public and that a record of the contribution (including all
    personal information I submit with it, including my sign-off) is
    maintained indefinitely and may be redistributed consistent with
    this project or the open source license(s) involved.
```

### Git Commit Messages

Commit message should follow the template `:<emoji>: <subject>` with `<emoji>` being the name of the relevant [emoji](#emoji-cheatsheet) describing the changes (without wrapping `::`) and `subject` being the description of changes. Commit messages may have multiple emoji. Some emoji have [semantic meaning for releases](#creating-a-release), so please those are used properly. Commit messages should follow the following guidelines:

* Use the present tense (`"Add feature"` not `"Added Feature"`)
* Use the imperative mood (`"Move cursor to…"` not `"Moves cursor to…"`)
* Limit the first line (not including emoji) to 72 characters or less

Example commits may look something like the following:

`git commit -m ":art: Refactor lookup system"`

`git commit -m ":lock: Fix XSS vulnerability"`

`git commit -m ":new::boom: Require author in content types" -m "Previously working content types will now throw if author is not present, so this is a breaking change"`

### Time to Merge

In order for a pull request to be merged, it must meet the following criteria:

* The author(s) of the code have signed off on the [Developer Certificate of Origin](#developer-certificate-of-origin) for this pull request
* All required integrations have passed
* The code has been reviewed by at least maintainer and all comments from the review have been addressed. This may include comments related to our [tips for submitting great PRs](#tips-for-submitting-great-prs).

## Creating a Release

Versioning is done through [SEMVER](http://semver.org/). Whenever new code is merged in to the `master` branch, a new semantic release will automatically be created on NPM and in the project's GitHub Releases. The GitHub Release will also include a changelog based off of the commit messages of that release. The release version and changelog are determined based off of the [emoji](#emoji-cheatsheet) used in the commit messages for each commit. The following emoji correspond to different semantic versions, all other emoji are considered non-semantic:

**Major Version**
Backwards-incompatible changes
- :boom: `:boom:`

**Minor Version**
Backwards-compatible new functionality
- :new: `:new:`
- :racehorse: `:racehorse:`
- :lock: `:lock:`

**Patch Version**
Backwards-compatible changes that do not add new functionality
- :bug: `:bug:`
- :shirt: `:shirt:`
- :art: `:art:`
- :unamused: `:unamused:`

**Pre-Release Version**
In-progress release
- :crystal_ball: `:crystal_ball:`

The version that gets generated is based on the highest type of change identified; i.e. if there were five _patch_ commits and one _minor_ commit, the _minor_ commit takes precedence and a new _minor_ release will be generated. All contributing commits will be included in the changelog.

## Emoji Cheatsheet

When writing commits, please **start** the [commit message](#git-commit-messages) with one of the following applicable Emoji, keeping in mind that some emoji have [semantic meaning for releases](#creating-a-release). Emoji should not be used at the start of issue or pull request titles.

* :new: `:new:` when adding new functionality
* :bug: `:bug:` when fixing a bug
* :memo: `:memo:` when writing documentation
* :shirt: `:shirt:` when removing linter warnings
* :art: `:art:` when improving the format/structure of the code, documentation, or visual styling
* :fire: `:fire:` when removing code or files
* :racehorse: `:racehorse:` when improving performance
* :white_check_mark: `:white_check_mark:` when adding tests
* :green_heart: `:green_heart:` when fixing the CI build
* :lock: `:lock:` when dealing with security
* :crystal_ball: `:crystal_ball:` when experimenting
* :unamused: `:unamused:` when doing chore work (updating dependencies, etc…)
* :boom: `:boom:` when changing in a non-backwards-compatible way current functionality
