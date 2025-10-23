import _ from 'lodash';
import type {LaunchAppOptions} from '../types';
import type {Devicectl} from '../devicectl';

/**
 * Simulates memory warning for the process with the given PID
 */
export async function sendMemoryWarning(this: Devicectl, pid: number | string): Promise<void> {
  await this.execute(['device', 'process', 'sendMemoryWarning'], {
    subcommandOptions: ['--pid', `${pid}`],
  });
}

/**
 * Send POSIX signal to the running process
 */
export async function sendSignalToProcess(
  this: Devicectl,
  pid: number | string,
  signal: number | string,
): Promise<void> {
  await this.execute(['device', 'process', 'signal'], {
    subcommandOptions: ['--signal', `${signal}`, '--pid', `${pid}`],
  });
}

/**
 * Launch the given bundle id application with the given environment variable.
 * This method is over devicectl command, this it may take additional seconds to launch the app.
 * Please use via WDA or via appium-ios-device as primary method to launch app if possible.
 */
export async function launchApp(
  this: Devicectl,
  bundleId: string,
  opts: LaunchAppOptions = {},
): Promise<void> {
  const {env, terminateExisting = false} = opts;

  const subcommandOptions: string[] = [];

  if (terminateExisting) {
    subcommandOptions.push('--terminate-existing');
  }

  if (!_.isEmpty(env)) {
    subcommandOptions.push(
      '--environment-variables',
      JSON.stringify(_.mapValues(env, (v) => _.toString(v))),
    );
  }

  // The bundle id should be the last to apply arguments properly.
  // devicectl command might not raise exception while the order is wrong.
  subcommandOptions.push(bundleId);

  await this.execute(['device', 'process', 'launch'], {
    subcommandOptions,
    asJson: false,
  });
}
