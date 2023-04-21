import { Construct } from "constructs"
import { TerraformStack } from "cdktf"
import { readFileSync } from "fs"
import { StorageBucket } from "@cdktf/provider-google/lib/storage-bucket"
import { GoogleProvider } from "@cdktf/provider-google/lib/provider"

type BucketStackProperties = {
  credentials: string
  bucketName: string
  projectId: string
  region: string
  zone: string
}

class BucketStack extends TerraformStack {
  constructor(scope: Construct, id: string, options: BucketStackProperties) {
    super(scope, id)
    const { credentials, bucketName, projectId, region, zone } = options
    new StorageBucket(this, "private-cluster", {
      forceDestroy: true,
      name: bucketName,
      location: "US",
      versioning: {
        enabled: true,
      },
    })
    new GoogleProvider(this, "google", {
      credentials: readFileSync(credentials).toString(),
      project: projectId,
      region: region,
      zone: zone,
    })
  }
}

export { BucketStack }
