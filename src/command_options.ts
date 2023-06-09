import yargs from "yargs/yargs"

const argv = yargs(process.argv.slice(2))
  .options({
    pi: {
      alias: "project-id",
      type: "string",
      demandOption: true,
      description: "the google cloud project id",
    },
    rg: {
      alias: "region",
      type: "string",
      description: "the google cloud region",
      default: "us-central1",
    },
    z: {
      alias: "zone",
      type: "string",
      description: "the google cloud zone",
      default: "us-central1-c",
    },
    bn: {
      alias: "bucket-name",
      type: "string",
      default: "dicty-terraform-state",
      description: "GCS bucket name where terraform remote state is stored.",
    },
    bp: {
      alias: "bucket-prefix",
      type: "string",
      default: "log-bucket",
      description:
        "GCS bucket folder prefix where terraform remote state is stored.",
    },
    r: {
      alias: "remote",
      type: "boolean",
      default: true,
      description: "whether the remote gcs backend will be used",
    },
    c: {
      alias: "credentials",
      description: "service account credentials file for google provider",
      type: "string",
      default: "credentials.json",
    },
    lb: {
      alias: "log-bucket",
      description: "name of logging bucket",
      type: "string",
      default: "dicty-log-journal",
    },
    an: {
      alias: "analytics",
      type: "boolean",
      description: "analytics will be on or off for logging bucket",
      default: true,
    },
    rt: {
      alias: "retention",
      type: "number",
      default: 90,
      description: "retention time of log in the bucket",
    },
  })
  .parseSync()

export { argv }
