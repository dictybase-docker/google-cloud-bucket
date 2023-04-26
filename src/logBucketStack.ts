import { Construct } from "constructs"
import { TerraformStack, GcsBackend } from "cdktf"
import { readFileSync } from "fs"
import { GoogleProvider } from "@cdktf/provider-google/lib/provider"
import { LoggingProjectBucketConfig } from "@cdktf/provider-google/lib/logging-project-bucket-config"
import { LoggingProjectSink } from "@cdktf/provider-google/lib/logging-project-sink"

type ProviderProperties = {
  credentials: string
  zone: string
  region: string
  project: string
}

type RemoteStateProperties = {
  credentials: string
  bucketName: string
  bucketPrefix: string
}

type LogBucketProperties = {
  retention: number
  analytics: boolean
  project: string
  name: string
  region: string
}

type LogBucketStackProperties = {
  provider: ProviderProperties
  remote?: RemoteStateProperties
  bucket: LogBucketProperties
}

class LogBucketStack extends TerraformStack {
  constructor(scope: Construct, id: string, props: LogBucketStackProperties) {
    super(scope, id)
    const { provider, remote, bucket } = props
    new GoogleProvider(this, "google", {
      credentials: readFileSync(provider.credentials).toString(),
      project: provider.project,
      region: provider.region,
      zone: provider.zone,
    })
    if (remote) {
      new GcsBackend(this, {
        bucket: remote.bucketName,
        prefix: remote.bucketPrefix,
        credentials: readFileSync(remote.credentials).toString(),
      })
    }
    new LoggingProjectBucketConfig(this, `${id}-logging-bucket-config`, {
      project: bucket.project,
      location: bucket.region,
      bucketId: bucket.name,
      retentionDays: bucket.retention,
      enableAnalytics: bucket.analytics,
    })
    new LoggingProjectSink(this, `${id}-logging-sink`, {
      name: `${id}-logging-sink`,
      destination: `logging.googleapis.com/projects/${bucket.project}/locations/global/buckets/${bucket.name}`,
      filter: "resource.type = gce_instance",
    })
  }
}

export { LogBucketStack }
