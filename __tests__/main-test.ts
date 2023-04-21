import "cdktf/lib/testing/adapters/jest" // Load types for expect matchers
import { Testing, App } from "cdktf"
import BucketStack from "../src/bucket"
import { LogBucketStack } from "../src/logBucketStack"
import { StorageBucket } from "@cdktf/provider-google/lib/storage-bucket"
import { GoogleProvider } from "@cdktf/provider-google/lib/provider"
import { LoggingProjectBucketConfig } from "@cdktf/provider-google/lib/logging-project-bucket-config"

describe("BucketStack Application", () => {
  const options = {
    bucketName: "django",
    projectId: "chain",
    zone: "central",
    region: "central1",
    credentials: "test_cred.json",
  }
  let stack: BucketStack
  let app: App
  beforeAll(() => {
    app = Testing.app()
    stack = new BucketStack(app, "test-bucket", options)
  })
  test("check if it has google provider", () => {
    expect(Testing.synth(stack)).toHaveProvider(GoogleProvider)
  })
  test("check if it has storage bucket resource", () => {
    expect(Testing.synth(stack)).toHaveResource(StorageBucket)
    expect(Testing.synth(stack)).toHaveResourceWithProperties(StorageBucket, {
      name: options.bucketName,
    })
  })
  test("check if the produced terraform configuration is valid", () => {
    expect(Testing.fullSynth(stack)).toBeValidTerraform()
  })
  test("check if the terraform configuration can be planned", () => {
    expect(Testing.fullSynth(stack)).toPlanSuccessfully()
  })
})

describe("LogBucketStack application", () => {
  const options = {
    provider: {
      credentials: "test_cred.json",
      zone: "central",
      region: "central1",
      project: "chain",
    },
    bucket: {
      retention: 20,
      analytics: false,
      project: "chain",
      name: "journal",
      region: "central",
    },
    remote: {
      credentials: "test_cred.json",
      bucketName: "django",
      bucketPrefix: "jacky_chiles",
    },
  }
  let stack: LogBucketStack
  let app: App
  beforeAll(() => {
    app = Testing.app()
    stack = new LogBucketStack(app, "test-log-bucket", options)
  })
  test("check if it has google provider", () => {
    expect(Testing.synth(stack)).toHaveProvider(GoogleProvider)
  })
  test("check if it has logging bucket config", () => {
    expect(Testing.synth(stack)).toHaveResource(LoggingProjectBucketConfig)
    expect(Testing.synth(stack)).toHaveResourceWithProperties(
      LoggingProjectBucketConfig,
      {
        project: options.provider.project,
        location: options.bucket.region,
        retention_days: options.bucket.retention,
        enable_analytics: options.bucket.analytics,
        bucket_id: options.bucket.name,
      },
    )
  })
})
