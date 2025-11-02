import {exec, SubProcess} from 'teen_process';
import _ from 'lodash';
import logger from '@appium/logger';
import type {ExecuteOptions, ExecuteResult} from './types';
import * as processMixins from './mixins/process';
import * as infoMixins from './mixins/info';
import * as copyMixins from './mixins/copy';
import * as listMixins from './mixins/list';

const XCRUN = 'xcrun';
const LOG_TAG = 'Devicectl';

/**
 * Node.js wrapper around Apple's devicectl tool
 *
 * This class provides methods to interact with iOS devices using the devicectl command-line tool.
 * It requires Xcode 15+ and iOS 17+ to function properly.
 *
 */
export class Devicectl {
  /** The unique device identifier */
  public readonly udid: string;

  /**
   * Creates a new Devicectl instance
   *
   * @param udid - The unique device identifier
   */
  constructor(udid: string) {
    this.udid = udid;
  }

  /**
   * Executes a devicectl command
   *
   * @param subcommand - The devicectl subcommand to execute
   * @param opts - Execution options
   * @returns Promise that resolves to the command result
   */
  async execute<T extends ExecuteOptions>(
    subcommand: string[],
    opts?: T,
  ): Promise<ExecuteResult<T>> {
    const {
      logStdout = false,
      asynchronous = false,
      asJson = true,
      noDevice = false,
      subcommandOptions,
      timeout,
    } = opts ?? {};

    const finalArgs = ['devicectl', ...subcommand, ...(noDevice ? [] : ['--device', this.udid])];

    if (subcommandOptions && !_.isEmpty(subcommandOptions)) {
      finalArgs.push(
        ...(Array.isArray(subcommandOptions) ? subcommandOptions : [subcommandOptions]),
      );
    }

    if (asJson) {
      finalArgs.push('--quiet', '--json-output', '-');
    }

    const cmdStr = [XCRUN, ...finalArgs].map((arg) => `"${arg}"`).join(' ');
    logger.debug(LOG_TAG, `Executing ${cmdStr}`);

    try {
      if (asynchronous) {
        const result = new SubProcess(XCRUN, finalArgs);
        await result.start(0);
        return result as ExecuteResult<T>;
      }

      const result = await exec(XCRUN, finalArgs, ...(_.isNumber(timeout) ? [{timeout}] : []));

      if (logStdout) {
        logger.debug(LOG_TAG, `Command output: ${result.stdout}`);
      }

      return result as ExecuteResult<T>;
    } catch (e: any) {
      throw new Error(`'${cmdStr}' failed. Original error: ${e.stderr || e.stdout || e.message}`);
    }
  }

  sendMemoryWarning = processMixins.sendMemoryWarning;
  sendSignalToProcess = processMixins.sendSignalToProcess;
  launchApp = processMixins.launchApp;

  listProcesses = infoMixins.listProcesses;
  listApps = infoMixins.listApps;

  listFiles = copyMixins.listFiles;
  pullFile = copyMixins.pullFile;

  listDevices = listMixins.listDevices;
}
