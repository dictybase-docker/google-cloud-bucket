import { App } from "cdktf"
import { BucketStack } from "./bucket"
import { LogBucketStack } from "./logBucketStack"
import { argv } from "./command_options"

const app = new App()
new BucketStack(app, "gcs-bucket-cdktf", {
  bucketName: argv.bn,
  projectId: argv.pi,
  zone: argv.z,
  region: argv.rg,
  credentials: argv.c,
})
new LogBucketStack(app, `log-bucket-${argv.pi}`, {
  provider: {
    credentials: argv.c,
    zone: argv.z,
    region: argv.rg,
    project: argv.pi,
  },
  bucket: {
    retention: argv.rt,
    analytics: argv.an,
    project: argv.pi,
    name: argv.lb,
    region: argv.rg,
  },
  remote: {
    credentials: argv.c,
    bucketName: argv.bn,
    bucketPrefix: argv.bp,
  },
})
app.synth()
