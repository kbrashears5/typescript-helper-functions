import { LogLevel, Logger } from 'typescript-ilogger';
import { LogHelper } from './log-helper';

const logger = new Logger(LogLevel.Off);

/**
 * Test the constructor
 */
describe(`${LogHelper.name}`, () => {
  test('should create class and have logger defined', () => {
    const logHelper = new LogHelper(logger);
    return expect(logHelper.Logger).toBeDefined();
  });
});
