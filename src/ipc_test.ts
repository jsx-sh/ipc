import { assert } from "../dev_deps.ts";
import { IpcMessenger } from "./ipc.ts";

Deno.test("Test simple async message", async () => {
  const ipc = new IpcMessenger();
  const promise = ipc.waitForMessageWithTimeout("app", "type");

  ipc.onMessage("app", { type: "type", data: "data" });

  const message = await promise;
  assert.assertEquals(message.type, "type");
});