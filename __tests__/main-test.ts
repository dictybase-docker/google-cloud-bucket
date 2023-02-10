import "cdktf/lib/testing/adapters/jest" // Load types for expect matchers
import { Testing, App } from "cdktf"
import BucketStack from "../bucket"
import { GoogleProvider } from "../.gen/providers/google/provider"
import { StorageBucket } from "../.gen/providers/google/storage-bucket"

describe("BucketStack Application", () => {
  let stack: BucketStack
  let app: App
  beforeAll(() => {
    app = Testing.app()
    stack = new BucketStack(app, "test-bucket")
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
