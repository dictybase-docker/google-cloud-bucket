import * as cdktf from "cdktf"
import * as google from "./.gen/providers/google"
import { Construct } from "constructs"
import { TerraformStack } from "cdktf"

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
    const serviceAccountFile = new cdktf.TerraformVariable(
      this,
      "service_account_file",
      {
        default: "credentials.json",
        description: "path to service account key file",
      },
    )
    new google.storageBucket.StorageBucket(this, "private-cluster", {
      forceDestroy: true,
      name: bucketName.value,
      location: "US",
      versioning: {
        enabled: true,
      },
    })
    new google.provider.GoogleProvider(this, "google", {
      credentials: serviceAccountFile.value,
      project: projectId.value,
      region: region.value,
      zone: zone.value,
    })
  }
}

export default BucketStack
