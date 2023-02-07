import { App } from "cdktf"
import BucketStack from "./bucket"

const app = new App()
new BucketStack(app, "gcs-bucket-cdktf")
app.synth()
