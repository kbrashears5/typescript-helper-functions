import { Orchestrator } from './orchestrator';
import { LogLevel, Logger } from 'typescript-ilogger';

const logger = new Logger(LogLevel.Off);
const orchestrator = new Orchestrator(logger);

/**
 * Test the constructor method
 */
describe(`${Orchestrator.name}`, () => {
    test('should create class and have logger defined', () => {
        const localOrchestrator = new Orchestrator(logger);
        return expect(localOrchestrator.Logger).toBeDefined();
    });
});

/**
 * Test the Orchestrate method
 */
describe(`${Orchestrator.name}.${orchestrator.Orchestrate.name}`, () => {
    test('should return true passing function', () => {
        const actual = orchestrator.Orchestrate(() => {
            // tslint comment
        });
        return expect(actual).toEqual(true);
    });
    test('should return false passing function that throws', () => {
        const actual = orchestrator.Orchestrate(() => {
            throw new Error();
        });
        return expect(actual).toEqual(false);
    });
});

/**
 * Test the OrchestrateAsync method
 */
describe(`${Orchestrator.name}.${orchestrator.OrchestrateAsync.name}`, () => {
    test('should return true passing function - async', () => {
        const actual = orchestrator.OrchestrateAsync(async () => {
            // tslint comment
        });
        return expect(actual).resolves.toEqual(true);
    });
    test('should return false passing function that throws - async', () => {
        const actual = orchestrator.OrchestrateAsync(async () => {
            throw new Error();
        });
        return expect(actual).resolves.toEqual(false);
    });
});
