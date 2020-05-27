import { ILogger } from 'typescript-ilogger';
import { LogHelper } from './log-helper';
import { ObjectOperations } from './object-operations';

export class BaseClass {

    /**
     * Logger
     */
    public Logger: ILogger;

    /**
     * Log Helper
     */
    public LogHelper: LogHelper;

    /**
     * Object Operations
     */
    public ObjectOperations: ObjectOperations;

    /**
     * Initialize new instance of BaseClass
     * @param logger {ILogger} Logger
     */
    constructor(logger: ILogger) {
        this.Logger = logger;

        this.LogHelper = new LogHelper(this.Logger);

        this.ObjectOperations = new ObjectOperations();
    }
}
