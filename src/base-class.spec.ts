import { LogLevel, Logger } from 'typescript-ilogger';
import { BaseClass } from './base-class';

const logger = new Logger(LogLevel.Off);

/**
 * Test the constructor
 */
describe(`${BaseClass.name}`, () => {
    test('should create class and have logger defined', () => {
        const baseClass = new BaseClass(logger);
        return expect(baseClass.Logger).toBeDefined();
    });
    test('should create class and have log helper defined', () => {
        const baseClass = new BaseClass(logger);
        return expect(baseClass.LogHelper).toBeDefined();
    });
    test('should create class and have object operations defined', () => {
        const baseClass = new BaseClass(logger);
        return expect(baseClass.ObjectOperations).toBeDefined();
    });
    test('should create class and have orchestrator defined', () => {
        const baseClass = new BaseClass(logger);
        return expect(baseClass.Orchestrator).toBeDefined();
    });
});
