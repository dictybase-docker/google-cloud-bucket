import * as cdktf from "cdktf"
import { Construct } from "constructs"
import { TerraformStack } from "cdktf"
import * as path from "path"
import * as fs from "fs"
import { StorageBucket } from "@cdktf/provider-google/lib/storage-bucket"

class BucketStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id)

    const bucketName = new cdktf.TerraformVariable(this, "bucket_name", {
      description: `GCS bucket name where terraform remote state is stored.`,
      type: "string",
      nullable: false,
    })
    const projectId = new cdktf.TerraformVariable(this, "project_id", {
      description: "gcp project id",
      type: "string",
      nullable: false,
    })
    const region = new cdktf.TerraformVariable(this, "region", {
      default: "us-central1",
      description: "gcp region",
    })
    const zone = new cdktf.TerraformVariable(this, "zone", {
      default: "us-central1-c",
      description: "gcp zone name within a region",
    })
    new StorageBucket(this, "private-cluster", {
      forceDestroy: true,
      name: bucketName.value,
      location: "US",
      versioning: {
        enabled: true,
      },
    })
    const content = this._read_credentials("credentials.json")
    new google.provider.GoogleProvider(this, "google", {
      credentials: content,
      project: projectId.value,
      region: region.value,
      zone: zone.value,
    })
  }
  _read_credentials(name: string) {
    let cred_path: string = ""
    const default_path = path.join(process.cwd(), name)
    if (fs.existsSync(default_path)) {
      cred_path = default_path
    } else {
      const path_from_env = process.env["TF_VAR_service_account_file"]
      if (path_from_env) {
        cred_path = path.join(process.cwd(), path_from_env)
      }
    }
    return fs.readFileSync(cred_path).toString()
  }
}

export default BucketStack
