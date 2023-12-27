# 🦕 jsx-sh/ipc

IPC (Inter process communication) utils for the [jsx-sh](https://github.com/jsx-sh) platform.

<br />

## Usage

Import in your deno script:

```typescript
import { IpcMessenger } from 'https://github.com/jsx-sh/ipc/raw/main/mod.ts';

const ipc = new IpcMessenger();

// Timeout is optional, defaults to 5000 ms
const promise = ipc.waitForMessageWithTimeout("app", "type", 5000);

// Some time later, we receive a message
ipc.onMessage("app", { type: "type", data: "data" });

// The promise will be resolved with the message
const message = await promise;
console.log(message);
```

<br />

## Test

```bash
# unit tests
deno task test
```

## Format code

```bash
deno fmt **/*.ts
```
