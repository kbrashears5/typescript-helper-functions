import { ILogger } from 'typescript-ilogger';

/**
 * Functions to orchestrate code
 */
export class Orchestrator {

    /**
     * Logger
     */
    public Logger: ILogger;

    /**
     * Initialize new instance of BaseClass
     * @param logger {ILogger} Logger
     */
    constructor(logger: ILogger) {
        this.Logger = logger;
    }

    /**
     * Orchestrate a function
     * @param actionToTake {function} Async function to run.
     */
    public Orchestrate(actionToTake: () => void): boolean {
        const action = `${Orchestrator.name}.${this.OrchestrateAsync.name}`;

        // log that we are starting the orchestrator
        this.Logger.Information(`[${action}] Starting orchestration`);

        let successful = false;

        try {
            // process function
            actionToTake();

            successful = true;
        } catch (error) {
            this.Logger.Error(error);
        } finally {
            // log that we are finished with the orchestrator
            this.Logger.Information(`[${action}] Finished orchestration`);
        }

        return successful;
    }

    /**
     * Orchestrate a function with async calls in it
     * @param actionToTake {function} Async function to run.
     */
    public async OrchestrateAsync(actionToTake: () => Promise<void>): Promise<boolean> {
        const action = `${Orchestrator.name}.${this.OrchestrateAsync.name}`;

        // log that we are starting the orchestrator
        this.Logger.Information(`[${action}] Starting orchestration`);

        let successful = false;

        try {
            // process function
            await actionToTake();

            successful = true;
        } catch (error) {
            this.Logger.Error(error);
        } finally {
            // log that we are finished with the orchestrator
            this.Logger.Information(`[${action}] Finished orchestration`);
        }

        return successful;
    }
}
