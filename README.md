# GCS bucket

[![License](https://img.shields.io/badge/License-BSD%202--Clause-blue.svg)](LICENSE)
[![Continuos integration](https://github.com/dictybase-docker/google-cloud-bucket/actions/workflows/ci-develop.yml/badge.svg?branch=develop)](https://github.com/dictybase-docker/google-cloud-bucket/actions/workflows/ci-develop.yml)
[![codecov](https://codecov.io/gh/dictybase-docker/google-cloud-bucket/branch/develop/graph/badge.svg)](https://codecov.io/gh/dictybase-docker/google-cloud-bucket)
[![Maintainability](https://api.codeclimate.com/v1/badges/9b16d0885be470635ed6/maintainability)](https://codeclimate.com/github/dictybase-docker/google-cloud-bucket/maintainability)
![Last commit](https://badgen.net/github/last-commit/dictybase-docker/google-cloud-bucket/develop)
[![Funding](https://badgen.net/badge/Funding/Rex%20L%20Chisholm,dictyBase,DCR/yellow?list=|)](https://reporter.nih.gov/project-details/10024726)

- Creates a GC bucket through terraform cdktf API. The purpose of this terraform setup to
  create a bucket that will be used for storing remote state for other terraform
  runs.
- Creats a GC [logging bucket](https://cloud.google.com/logging/docs/routing/overview#buckets).
- Creates a GC [sink](https://cloud.google.com/logging/docs/routing/overview#sinks) that routes the logs to the logging bucket.

## Prerequisites

### Install terraform

From [here](https://www.terraform.io/downloads.html)

### Learn CDK for terraform

From [here](https://developer.hashicorp.com/terraform/cdktf)

### Learn features of GCP

- IAM,role and permissions from [here](https://cloud.google.com/iam/docs/overview).
- Service accounts from [here](https://cloud.google.com/iam/docs/service-accounts).

### Service account for running terraform

- Create a GCP `service account`.
- The service account should have the following iam roles/permissions.

```
    logging.buckets.create
    logging.buckets.delete
    logging.buckets.get
    logging.buckets.list
    logging.buckets.undelete
    logging.buckets.update
    logging.buckets.write
    logging.links.create
    logging.links.delete
    logging.links.get
    logging.links.list
    logging.logMetrics.list
    logging.logMetrics.update
    logging.logServiceIndexes.list
    logging.logServices.list
    logging.logs.list
    logging.notificationRules.create
    logging.notificationRules.delete
    logging.notificationRules.get
    logging.notificationRules.list
    logging.notificationRules.update
    logging.settings.get
    logging.settings.update
    logging.sinks.create
    logging.sinks.delete
    logging.sinks.get
    logging.sinks.list
    logging.sinks.update
    logging.views.create
    logging.views.delete
    logging.views.get
    logging.views.update
    storage.buckets.create
    storage.buckets.delete
    storage.buckets.get
    storage.buckets.list
    storage.buckets.update
    storage.objects.create
    storage.objects.delete
    storage.objects.get
    storage.objects.list
    storage.objects.update
```

- Download the json formatted service account key to this current folder and
  rename it to `credentials.json`. In case the key file has a different name or
  resides in a different path, it can be set through command line.

## Running commands

The commands are defined in the script field of `package.json` file. The two
main commands will be `yarn synth` and `yarn deploy`. To get a list of all
available command line options run `yarn tsx src/main.ts -h`.

### Deploy with CDK for terraform

- `yarn synth -a "tsx src/main.ts --pi <google cloud project id>`
- `` yarn deploy gcs-bucket-cdktf log-buket -a `tsx src/main.ts --pi <google cloud
project id> ``

  The `deploy` command do run `synth`, however it is easier to verify the command
  by the `synth` separately.
