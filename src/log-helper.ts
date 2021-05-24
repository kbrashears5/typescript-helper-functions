import { ILogger } from 'typescript-ilogger';

/**
 * Functions to help logging
 */
export class LogHelper {
  /**
   * Logger
   */
  public Logger: ILogger;

  /**
   * Create new instance of LogHelper
   * @param logger {ILogger} Logger
   */
  constructor(logger: ILogger) {
    this.Logger = logger;
  }

  /**
   * Log the inputs to a function
   * @param action {string} Action method currently in
   * @param inputs {object} Inputs to log
   */
  public LogInputs(action: string, inputs: any): void {
    this.Logger.Trace(`[${action}]-Inputs: ${JSON.stringify({ inputs })}`);
  }

  /**
   * Log the request to a SDK function call
   * @param action {string} Action method currently in
   * @param inputs {object} Inputs to log
   */
  public LogRequest(action: string, request: any): void {
    this.Logger.Trace(`[${action}]-Request: ${JSON.stringify({ request })}`);
  }

  /**
   * Log the response to a SDK function call
   * @param action {string} Action method currently in
   * @param inputs {object} Inputs to log
   */
  public LogResponse(action: string, response: any): void {
    this.Logger.Trace(`[${action}]-Response: ${JSON.stringify({ response })}`);
  }
}
