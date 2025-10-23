import {SubProcess, TeenProcessExecResult} from 'teen_process';

/**
 * Information about a running process on the device
 */
export interface ProcessInfo {
  /** The process identifier */
  processIdentifier: number;
  /** The executable path */
  executable: string;
}

/**
 * Information about an installed app on the device
 */
export interface AppInfo {
  /** Whether this is an app clip */
  appClip: boolean;
  /** Whether this app was built by a developer */
  builtByDeveloper: boolean;
  /** The bundle identifier */
  bundleIdentifier: string;
  /** The bundle version */
  bundleVersion: string;
  /** Whether this is a default system app */
  defaultApp: boolean;
  /** Whether this app is hidden */
  hidden: boolean;
  /** Whether this is an internal system app */
  internalApp: boolean;
  /** The app name */
  name: string;
  /** Whether this app can be removed */
  removable: boolean;
  /** The app URL/path */
  url: string;
  /** The app version */
  version: string;
}

/**
 * Options for executing devicectl commands
 */
export interface ExecuteOptions {
  /** Whether to log stdout output */
  logStdout?: boolean;
  /** Whether to return JSON output */
  asJson?: boolean;
  /** Whether to run the command asynchronously */
  asynchronous?: boolean;
  /** Additional subcommand options */
  subcommandOptions?: string[] | string;
  /** Timeout in milliseconds */
  timeout?: number;
}

/**
 * Options for asynchronous execution
 */
export interface AsyncExecuteOptions extends ExecuteOptions {
  asynchronous: true;
}

/**
 * Options for listing files on the device
 */
export interface ListFilesOptions {
  /** The username of the user we should target. Only relevant for certain domains. */
  username?: string;
  /** A subdirectory within the domain. If not specified, defaults to the root. */
  subdirectory?: string;
}

/**
 * Options for pulling files from the device
 */
export interface PullFileOptions {
  /** The username of the user we should target. Only relevant for certain domains. */
  username?: string;
  /** The file service domain. Valid values are: temporary, rootStaging, appDataContainer, appGroupDataContainer, systemCrashLogs */
  domainType: string;
  /** A unique string used to provide additional context to the domain */
  domainIdentifier: string;
  /** The timeout for pulling a file in milliseconds */
  timeout?: number;
}

/**
 * Options for launching an app
 */
export interface LaunchAppOptions {
  /** Environment variables for the launching app process */
  env?: Record<string, string | number>;
  /** Whether to terminate the already running app */
  terminateExisting?: boolean;
}

/**
 * Result type for synchronous execution
 */
export type SyncExecuteResult = TeenProcessExecResult<string>;

/**
 * Result type for asynchronous execution
 */
export type AsyncExecuteResult = SubProcess;

/**
 * Union type for execute method return
 */
export type ExecuteResult<T extends ExecuteOptions> = T extends AsyncExecuteOptions
  ? AsyncExecuteResult
  : SyncExecuteResult;
