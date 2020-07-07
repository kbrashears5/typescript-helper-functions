import { ObjectOperations } from './object-operations';

const objectOperations = new ObjectOperations();

/**
 * Test the IsNullOrEmpty method
 */
describe(`${ObjectOperations.name}.${objectOperations.IsNullOrEmpty.name}`, () => {
    test(`object true`, () => {
        const actual = objectOperations.IsNullOrEmpty({});

        return expect(actual).toEqual(true);
    });
    test(`object false`, () => {
        const actual = objectOperations.IsNullOrEmpty({ key: true });

        return expect(actual).toEqual(false);
    });
    test(`string true`, () => {
        const actual = objectOperations.IsNullOrEmpty('');

        return expect(actual).toEqual(true);
    });
    test(`string false`, () => {
        const actual = objectOperations.IsNullOrEmpty('true');

        return expect(actual).toEqual(false);
    });
    test(`undefined`, () => {
        const actual = objectOperations.IsNullOrEmpty(undefined);

        return expect(actual).toEqual(true);
    });
    test(`null`, () => {
        const actual = objectOperations.IsNullOrEmpty(null);

        return expect(actual).toEqual(true);
    });
});

/**
 * Test the IsNullOrWhitespace method
 */
describe(`${ObjectOperations.name}.${objectOperations.IsNullOrWhitespace.name}`, () => {
    test(`string true`, () => {
        const actual = objectOperations.IsNullOrWhitespace('');

        return expect(actual).toEqual(true);
    });
    test(`string true with trim`, () => {
        const actual = objectOperations.IsNullOrWhitespace('   ');

        return expect(actual).toEqual(true);
    });
    test(`string false`, () => {
        const actual = objectOperations.IsNullOrWhitespace('true');

        return expect(actual).toEqual(false);
    });
    test(`undefined`, () => {
        const actual = objectOperations.IsNullOrWhitespace(undefined);

        return expect(actual).toEqual(true);
    });
    test(`null`, () => {
        const actual = objectOperations.IsNullOrWhitespace(null);

        return expect(actual).toEqual(true);
    });
});

/**
 * Test the ToString method
 */
describe(`${ObjectOperations.name}.${objectOperations.ToString.name}`, () => {
    test(`boolean`, () => {
        const actual = objectOperations.ToString(true);

        return expect(actual).toEqual('true');
    });
    test(`number`, () => {
        const actual = objectOperations.ToString(7);

        return expect(actual).toEqual('7');
    });
    test(`string`, () => {
        const actual = objectOperations.ToString('true');

        return expect(actual).toEqual('true');
    });
    test(`object`, () => {
        const actual = objectOperations.ToString({ key: true });

        return expect(actual).toEqual('{\"key\":true}');
    });
});
