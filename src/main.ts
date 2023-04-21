import { App } from "cdktf"
import BucketStack from "./bucket"
import { argv } from "./command_options"

const app = new App()
new BucketStack(app, "gcs-bucket-cdktf", {
  bucketName: argv.bn,
  projectId: argv.pi,
  zone: argv.z,
  region: argv.rg,
  credentials: argv.c,
})
app.synth()
