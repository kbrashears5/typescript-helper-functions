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
     * Create new instance of LoggingHelper
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
    public TraceInputs(action: string,
        inputs: object): void {
        this.Logger.Trace(`[${action}]-Inputs: ${JSON.stringify({ inputs })}`);
    }

    /**
     * Log the response to a SDK function call
     * @param action {string} Action method currently in
     * @param inputs {object} Inputs to log
     */
    public TraceResponse(action: string,
        response: object): void {
        this.Logger.Trace(`[${action}]-Response: ${JSON.stringify({ response })}`);
    }

    /**
     * Log the request to a SDK function call
     * @param action {string} Action method currently in
     * @param inputs {object} Inputs to log
     */
    public TraceRequest(action: string,
        request: object): void {
        this.Logger.Trace(`[${action}]-Request: ${JSON.stringify({ request })}`);
    }


}
