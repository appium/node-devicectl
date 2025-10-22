# node-devicectl

Node.js wrapper around Apple's `devicectl` tool, the command-line utility to control iOS devices. `devicectl` is run as a sub-command of xcrun and requires Xcode 15+ and iOS 17+.

## Installation

Install through npm.

```bash
npm install node-devicectl
```

## API

The module exports a single class `Devicectl`. This class contains methods which wrap various devicectl subcommands.

### Advanced Usage

Any devicectl subcommand could be called via `execute` method,
which accepts the subcommand itself as the first argument and the set of options. For example:

```typescript
import { Devicectl } from 'node-devicectl';

const devicectl = new Devicectl('device-udid');
const processes = await devicectl.listProcesses();
await devicectl.launchApp('com.example.app', {
  env: { DEBUG: '1' },
  terminateExisting: true
});
```

## Requirements

- Xcode 15+
- iOS 17+
- Node.js 20.19.0+ || 22.12.0+ || 24.0.0+

## License

Apache-2.0
