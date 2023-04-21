import "cdktf/lib/testing/adapters/jest" // Load types for expect matchers
import { Testing, App } from "cdktf"
import BucketStack from "../src/bucket"
import { StorageBucket } from "@cdktf/provider-google/lib/storage-bucket"
import { GoogleProvider } from "@cdktf/provider-google/lib/provider"

describe("BucketStack Application", () => {
  let stack: BucketStack
  let app: App
  beforeAll(() => {
    app = Testing.app()
    stack = new BucketStack(app, "test-bucket", {
      bucketName: "django",
      projectId: "chain",
      zone: "central",
      region: "central1",
      credentials: "../test_cred.json",
    })
  })
  test("check if it has google provider", () => {
    expect(Testing.synth(stack)).toHaveProvider(GoogleProvider)
  })
  test("check if it has storage bucket resource", () => {
    expect(Testing.synth(stack)).toHaveResource(StorageBucket)
  })
  test("check if the produced terraform configuration is valid", () => {
    expect(Testing.fullSynth(stack)).toBeValidTerraform()
  })
  /* test("check if the terraform configuration can be planned", () => {
    expect(Testing.fullSynth(stack)).toPlanSuccessfully()
  }) */
})
