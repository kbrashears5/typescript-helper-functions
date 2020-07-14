import { ILogger } from 'typescript-ilogger';
import { LogHelper } from './log-helper';
import { ObjectOperations } from './object-operations';
import { Orchestrator } from './orchestrator';

/**
 * Base class
 */
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
     * Orchestrator
     */
    public Orchestrator: Orchestrator;

    /**
     * Initialize new instance of BaseClass
     * @param logger {ILogger} Logger
     */
    constructor(logger: ILogger) {
        this.Logger = logger;

        this.LogHelper = new LogHelper(this.Logger);

        this.ObjectOperations = new ObjectOperations();

        this.Orchestrator = new Orchestrator(this.Logger);
    }
}
