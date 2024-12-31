# opentelemetrypoc - WoodStoreDashboard

A web application based on Angular typescript 14 and Node.js 16.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) 14.1, Node.js 16.16 and NPM 8.11.

[[_TOC_]]

---

## How to work on this project

### Software requirements

List of tools to be installed:

- Node.js 16.16 (it contains NPM 8.11)
- Angular CLI 14.1

### How to start developing

Clone the repo, and open it in your IDE.

#### Install the dependencies

Run `npm install` to download and install all NPM dependencies on your machine. This will create a `node_modules/` directory.

### How to run locally

#### Development server

Run `npm start` for a dev server. This will open your browser on `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Code scaffolding

Run `npm run generate component component-name` to generate a new component. You can also use `npm generate directive|pipe|service|class|guard|interface|enum|module`.

#### Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

#### Unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Using ChromeHeadless for running the test using Karma.

Using Karma Junit reporter to store the test artifacts. Report will be stored under `test_report/` folder.

Karma configuration is present in Karma.conf.js file for reference.

#### End-to-end tests

Run `npm run e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Recommended development workflow

With GitFlow, the main branch should always be releasable to production, and there should never be untested or incomplete code on the main branch.

When using this Git workflow, no one commits to the main branch but rather uses a feature and fix branches. Feature and fix branches are branches created by the developers to commit their modifications. Merge requests are then opened with these branches as the source and targeting the main branch (or production branch if it is a hotfix).

Once the changes are merged to main branch, merge requests are then opened with this main branch as the source and target the production branch

```mermaid
   gitGraph
      commit
      commit
      branch feature
      branch production
      checkout feature
      commit
      commit
      checkout main
      merge feature
      commit
      commit
      checkout production
      merge main
```

In short, we distinguish 4 types of branches:

| Branch                | Naming convention (prefix)      | Description    |
|-----------------------|---------------------------------|----------------|
| Main branch(es)       | master,main,dev                 | The main branch contains the work done for the incoming release and is the base branch for any new feature or bug fix.<br>Your team should open merge requests targeting this branch when working on the project.<br>*There is usually a single main branch per project but if your team is developing several versions simultaneously then you can have versioned main branches, e.g. `main/vX.X.X`.* |
| Test branches         | staging,pre-prod,qualif,qa,test | Test branches are optional. They are useful when you have a Continuous Deployment pipeline that is able to create a new test/qualification environment on the fly.<br>In that case you can have as many test environment as necessary and you merge from one to another until the product is ready for production. |
| Production branch(es) | prod,rel                        | The production branch represents the version of your application currently deployed to production.<br>It is the base branch for any new hot fix that should quickly be shipped to production.<br>*There is usually a single production branch per project but if your team is maintaining several versions simultaneously then it is handy to have versioned release/production branches, e.g. `rel/vX.X.X`.* |
| Feature/Fix branches  | feat,ft,hotfix,fix,dependabot,renovate   | Feature and fix branches are branches created by the developers to commit their modifications. Merge requests are then opened with these branches as the source and targeting the main branch (or production branch if it is a hotfix).<br>These branches must have a short lifespan, they must be integrated or deleted as fast as possible. |


## Security concerns

The DEP updates the original template regularly but you can not benefit automatically from the updates.

In all cases, the project is responsible for assessing and mitigating security issues on their repositories.

The OCI images used in [.gitlab-ci.yml](.gitlab-ci.yml) file are built from the [dep/library/project-oci-images](dep/library/project-oci-images) repository. You can check periodically for potential updates of these images.

## How to improve this template

This GitLab project template has been generated dynamically using [mustache templating](https://mustache.github.io/). If you want to help the DEP team improve this template, please open an issue or a merge request at [dep/library/dynamic-project-templates](dep/library/dynamic-project-templates).


