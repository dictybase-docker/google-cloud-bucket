# GCS bucket
[![License](https://img.shields.io/badge/License-BSD%202--Clause-blue.svg)](LICENSE)
![GitHub action](https://github.com/dictybase-docker/google-cloud-bucket/workflows/Node%20CI%20Develop/badge.svg)
[![codecov](https://codecov.io/gh/dictybase-docker/google-cloud-bucket/branch/develop/graph/badge.svg)](https://codecov.io/gh/dictybase-docker/google-cloud-bucket)
[![Maintainability](https://api.codeclimate.com/v1/badges/9b16d0885be470635ed6/maintainability)](https://codeclimate.com/github/dictybase-docker/google-cloud-bucket/maintainability)
![Last commit](https://badgen.net/github/last-commit/dictybase-docker/google-cloud-bucket/develop)
[![Funding](https://badgen.net/badge/Funding/Rex%20L%20Chisholm,dictyBase,DCR/yellow?list=|)](https://reporter.nih.gov/project-details/10024726)


Create a GCS bucket through terraform. The purpose of this terraform setup to
create a bucket that will be used for storing remote state for other terraform
runs.
## Prerequisites
### Install terraform
From [here](https://www.terraform.io/downloads.html)
### Learn CDK for terraform
From [here](https://developer.hashicorp.com/terraform/cdktf)
### Learn features of GCP
* IAM,role and permissions from [here](https://cloud.google.com/iam/docs/overview).
* Service accounts from [here](https://cloud.google.com/iam/docs/service-accounts).
### Service account for running terraform
* Create a GCP `service account`.
* The service account should have the following iam roles/permissions.
```
	storage.buckets.create
```
* Download the json formatted service account key to this current folder and
  rename it to `credentials.json`. In case the key file has a different name or
  resides in a different path, it can be set through `service_account_file`
  terraform variable. This credentials will be used by terraform to
  create the cluster.
## Create bucket
### Setting variables
* All the variables are defined in the `main.ts` file.
* __Required:__ `project_id`.
* __Required:__ `bucket_name`.
* __Optional:__ Read rest of the variables from `main.ts` file. If not set, their default values will be used.
* Read [here](https://developer.hashicorp.com/terraform/cdktf/concepts/variables-and-outputs#passing-input-variables-to-cdktf) to understand various ways of passing input variables.
### Deploy with CDK for terraform
* `yarn` - To install all dependencies.
* `yarn synth -var project_id=<value> -var bucket_name=<value>` - Generates
  terraform configuraion for an application. For details read [here](https://developer.hashicorp.com/terraform/cdktf/cli-reference/commands#synth)
* `terraform apply -var project_id=<value> -var bucket_name=<value>` - To
  create the resources. A var file can be used instead of command line
  arguments.
* `yarn deploy` - Deploys the application. For details read [here](https://developer.hashicorp.com/terraform/cdktf/cli-reference/commands#deploy)
* `yarn destory` - Obvious, isn't it.
