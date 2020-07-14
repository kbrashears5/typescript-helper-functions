import { ObjectOperations } from './object-operations';

const objectOperations = new ObjectOperations();

/**
 * Test the AreObjectsEqual
 */
describe(`${ObjectOperations.name}.${objectOperations.AreObjectsEqual.name}`, () => {
    test('should determine equal - exclusions', () => {
        const object1 = { value1: 'value1', value2: 0 };
        const object2 = { value1: 'value1' };
        const actual = objectOperations.AreObjectsEqual(object1, object2, 'value2');
        return expect(actual).toEqual(true);
    });
    test('should determine equal - no exclusions', () => {
        const object1 = { value1: 'value1' };
        const object2 = { value1: 'value1' };
        const actual = objectOperations.AreObjectsEqual(object1, object2);
        return expect(actual).toEqual(true);
    });
    test('should determine not equal - exclusions', () => {
        const object1 = { value1: 'value1' };
        const object2 = { value1: 'value1', value2: false };
        const actual = objectOperations.AreObjectsEqual(object1, object2, 'value1');
        return expect(actual).toEqual(false);
    });
    test('should determine not equal - no exclusions', () => {
        const object1 = { value1: 'value1' };
        const object2 = { value1: 'value1', value2: false };
        const actual = objectOperations.AreObjectsEqual(object1, object2);
        return expect(actual).toEqual(false);
    });
});

/**
 * Test the CloneObject method
 */
describe(`${ObjectOperations.name}.${objectOperations.CloneObject.name}`, () => {
    test('should clone - empty object exclusions', () => {
        const expected = {};
        const actual = objectOperations.CloneObject(expected, 'value2');
        return expect(actual).toEqual(expected);
    });
    test('should clone - empty object no exclusions', () => {
        const expected = {};
        const actual = objectOperations.CloneObject(expected);
        return expect(actual).toEqual(expected);
    });
    test('should clone - exclusions', () => {
        const source = { value1: 'value1', value2: 0 };
        const expected = { value1: 'value1' };
        const actual = objectOperations.CloneObject(source, 'value2');
        return expect(actual).toEqual(expected);
    });
    test('should clone - no exclusions', () => {
        const expected = { value1: 'value1', value2: 0 };
        const actual = objectOperations.CloneObject(expected);
        return expect(actual).toEqual(expected);
    });
});

/**
 * Test the CopyProperty method
 */
describe(`${ObjectOperations.name}.${objectOperations.CopyProperty.name}`, () => {
    test('should throw - null source', () => {
        const source = {};
        const target = { value1: 'value11' };
        const result = () => objectOperations.CopyProperty(source, target, 'value1');
        return expect(result).toThrow();
    });
    test('should throw - null target', () => {
        const source = { value1: 'value1' };
        const target = {};
        const result = () => objectOperations.CopyProperty(source, target, 'value1');
        return expect(result).toThrow();
    });
    test('should throw - null propertyName', () => {
        const source = { value1: 'value1' };
        const target = { value1: 'value11' };
        const result = () => objectOperations.CopyProperty(source, target, '');
        return expect(result).toThrow();
    });
    test('should copy value1', () => {
        const source = { value1: 'value1' };
        const target = { value1: 'value11' };
        const expected = { value1: 'value1' };
        objectOperations.CopyProperty(source, target, 'value1');
        return expect(target).toEqual(expected);
    });
    test('should append value2', () => {
        const source = { value1: 'value1', value2: 0 };
        const target = { value1: 'value1' };
        const expected = { value1: 'value1', value2: 0 };
        objectOperations.CopyProperty(source, target, 'value2', true);
        return expect(target).toEqual(expected);
    });
    test('should not append value2', () => {
        const source = { value1: 'value1', value2: 0 };
        const target = { value1: 'value1' };
        const expected = { value1: 'value1' };
        objectOperations.CopyProperty(source, target, 'value2');
        return expect(target).toEqual(expected);
    });
});

/**
 * Test the GetProperty method
 */
describe(`${ObjectOperations.name}.${objectOperations.GetProperty.name}`, () => {
    test('should throw - null source', () => {
        const source = {};
        const result = () => objectOperations.GetProperty<string>(source, 'value2', 'default');
        return expect(result).toThrow();
    });
    test('should return default value for invalid property', () => {
        const source = { value1: 'value1' };
        const actual = objectOperations.GetProperty<string>(source, 'value2', 'default');
        const expected = 'default';
        return expect(actual).toEqual(expected);
    });
    test('should return default value for valid property that is null', () => {
        const source = { value1: undefined };
        const actual = objectOperations.GetProperty<string>(source, 'value1', 'default');
        const expected = 'default';
        return expect(actual).toEqual(expected);
    });
    test('should return value for valid property', () => {
        const source = { value1: 'value1' };
        const actual = objectOperations.GetProperty<string>(source, 'value1', 'default');
        const expected = 'value1';
        return expect(actual).toEqual(expected);
    });
    test('should return value for valid property without regard to case', () => {
        const source = { value1: 'value1' };
        const actual = objectOperations.GetProperty<string>(source, 'Value1', 'default');
        const expected = 'value1';
        return expect(actual).toEqual(expected);
    });
});

/**
 * Test the IsMatch method
 */
describe(`${ObjectOperations.name}.${objectOperations.IsMatch.name}`, () => {
    test('should throw - null pattern', () => {
        const source = 'big dog';
        const result = () => objectOperations.IsMatch('', source);
        return expect(result).toThrow();
    });
    test('should throw - null value', () => {
        const source = '';
        const result = () => objectOperations.IsMatch('*', source);
        return expect(result).toThrow();
    });
    test('should return true for wildcard pattern', () => {
        const source = 'big dog';
        const actual = objectOperations.IsMatch('*', source);
        return expect(actual).toEqual(true);
    });
    test('should return true for startsWith pattern', () => {
        const source = 'big dog';
        const actual = objectOperations.IsMatch('big*', source);
        return expect(actual).toEqual(true);
    });
    test('should return true for endsWith pattern', () => {
        const source = 'big dog';
        const actual = objectOperations.IsMatch('*dog', source);
        return expect(actual).toEqual(true);
    });
    test('should return false for not pattern', () => {
        const source = 'dog';
        const actual = objectOperations.IsMatch('!dog', source);
        return expect(actual).toEqual(false);
    });
    test('should return true for not pattern', () => {
        const source = 'doggy';
        const actual = objectOperations.IsMatch('!dog', source);
        return expect(actual).toEqual(true);
    });
});

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
 * Test the IsPropertyEqual method
 */
describe(`${ObjectOperations.name}.${objectOperations.IsPropertyEqual.name}`, () => {
    test('should throw - null item1', () => {
        const object1 = {};
        const object2 = { value1: 'value1' };
        const result = () => objectOperations.IsPropertyEqual(object1, object2, 'value1');
        return expect(result).toThrow();
    });
    test('should throw - null item2', () => {
        const object1 = { value1: 'value1' };
        const object2 = {};
        const result = () => objectOperations.IsPropertyEqual(object1, object2, 'value1');
        return expect(result).toThrow();
    });
    test('should throw - null propertyName', () => {
        const object1 = { value1: 'value1' };
        const object2 = { value1: 'value1' };
        const result = () => objectOperations.IsPropertyEqual(object1, object2, '');
        return expect(result).toThrow();
    });
    test('should determine equal', () => {
        const object1 = { value1: 'value1', value2: 0 };
        const object2 = { value1: 'value1' };
        const actual = objectOperations.IsPropertyEqual(object1, object2, 'value1');
        return expect(actual).toEqual(true);
    });
    test('should determine not equal - invalid property', () => {
        const object1 = { value1: 'value1', value2: 0 };
        const object2 = { value1: 'value1' };
        const actual = objectOperations.IsPropertyEqual(object1, object2, 'value2');
        return expect(actual).toEqual(false);
    });
    test('should determine not equal - valid property', () => {
        const object1 = { value1: 'value1', value2: 0 };
        const object2 = { value1: 'value11' };
        const actual = objectOperations.IsPropertyEqual(object1, object2, 'value1');
        return expect(actual).toEqual(false);
    });
});

/**
 * Test the MergeObjects method
 */
describe(`${ObjectOperations.name}.${objectOperations.MergeObjects.name}`, () => {
    test('should merge - both null', () => {
        const expected = {};
        const actual = objectOperations.MergeObjects<any>(undefined, null);
        return expect(actual).toEqual(expected);
    });
    test('should merge - source1 null', () => {
        const source2 = { value1: 'value1' };
        const expected = { value1: 'value1' };
        const actual = objectOperations.MergeObjects<any>(undefined, source2);
        return expect(actual).toEqual(expected);
    });
    test('should merge - source2 null', () => {
        const source1 = { value1: 'value1' };
        const expected = { value1: 'value1' };
        const actual = objectOperations.MergeObjects<any>(source1, undefined);
        return expect(actual).toEqual(expected);
    });
    test('should merge - no overlap', () => {
        const source1 = { value1: 'value1' };
        const source2 = { value2: 'value2' };
        const expected = { value1: 'value1', value2: 'value2' };
        const actual = objectOperations.MergeObjects<any>(source1, source2);
        return expect(actual).toEqual(expected);
    });
    test('should merge - value1 undefined on source2', () => {
        const source1 = { value1: 'value1' };
        const source2 = { value1: undefined, value2: 'value2' };
        const expected = { value1: 'value1', value2: 'value2' };
        const actual = objectOperations.MergeObjects<any>(source1, source2);
        return expect(actual).toEqual(expected);
    });
    test('should merge - value2 undefined on source1', () => {
        const source1 = { value1: 'value1', value2: undefined };
        const source2 = { value2: 'value2' };
        const expected = { value1: 'value1', value2: 'value2' };
        const actual = objectOperations.MergeObjects<any>(source1, source2);
        return expect(actual).toEqual(expected);
    });
    test('should merge - nested on source1', () => {
        const nested = { x: 1, y: 'y' };
        const source1 = { value1: 'value1', nested };
        const source2 = { value2: 'value2' };
        const expected = { value1: 'value1', value2: 'value2', nested };
        const actual = objectOperations.MergeObjects<any>(source1, source2);
        return expect(actual).toEqual(expected);
    });
    test('should merge - nested on source2', () => {
        const nested = { x: 1, y: 'y' };
        const source1 = { value1: 'value1' };
        const source2 = { value2: 'value2', nested };
        const expected = { value1: 'value1', value2: 'value2', nested };
        const actual = objectOperations.MergeObjects<any>(source1, source2);
        return expect(actual).toEqual(expected);
    });
    test('should merge - nested on both', () => {
        const source1 = { value1: 'value1', nested: { x: 1, y: 'y' } };
        const source2 = { value2: 'value2', nested: { x: 2, y: 'y' } };
        const expected = { value1: 'value1', value2: 'value2', nested: { x: 2, y: 'y' } };
        const actual = objectOperations.MergeObjects<any>(source1, source2);
        return expect(actual).toEqual(expected);
    });
    test('should merge - nested on both with null on source1', () => {
        const source1 = { value1: 'value1', nested: { x: 1 } };
        const source2 = { value2: 'value2', nested: { x: 2, y: 'y' } };
        const expected = { value1: 'value1', value2: 'value2', nested: { x: 2, y: 'y' } };
        const actual = objectOperations.MergeObjects<any>(source1, source2);
        return expect(actual).toEqual(expected);
    });
    test('should merge - nested on both with null on source2', () => {
        const source1 = { value1: 'value1', nested: { x: 1, y: 'y' } };
        const source2 = { value2: 'value2', nested: { x: 2 } };
        const expected = { value1: 'value1', value2: 'value2', nested: { x: 2, y: 'y' } };
        const actual = objectOperations.MergeObjects<any>(source1, source2);
        return expect(actual).toEqual(expected);
    });
});

/**
 * Test the RemoveUndefinedElements method
 */
describe(`${ObjectOperations.name}.${objectOperations.RemoveUndefinedElements.name}`, () => {
    test('should return empty object', () => {
        const source = { value1: undefined };
        const expected = {};
        const actual = objectOperations.RemoveUndefinedElements(source);
        return expect(actual).toEqual(expected);
    });
    test('should return object with null value', () => {
        const source = { value1: null };
        const expected = { value1: null };
        const actual = objectOperations.RemoveUndefinedElements(source);
        return expect(actual).toEqual(expected);
    });
    test('should return object with one value removed', () => {
        const source = { value1: 0, value2: undefined };
        const expected = { value1: 0 };
        const actual = objectOperations.RemoveUndefinedElements(source);
        return expect(actual).toEqual(expected);
    });
});

/**
 * Test the SetProperty method
 */
describe(`${ObjectOperations.name}.${objectOperations.SetProperty.name}`, () => {
    test('should throw - null target', () => {
        const target = {};
        const result = () => objectOperations.SetProperty(target, '', 2, false);
        return expect(result).toThrow();
    });
    test('should return unchanged object empty property name', () => {
        const target = { value1: 0 };
        const expected = { value1: 0 };
        objectOperations.SetProperty(target, '', 2, false);
        return expect(target).toEqual(expected);
    });
    test('should return unchanged object invalid property name', () => {
        const target = { value1: 0 };
        const expected = { value1: 0 };
        objectOperations.SetProperty(target, 'value2', 2, false);
        return expect(target).toEqual(expected);
    });
    test('should return changed object append property', () => {
        const target = { value1: 0 };
        const expected = { value1: 0, value2: 2 };
        objectOperations.SetProperty(target, 'value2', 2);
        return expect(target).toEqual(expected);
    });
    test('should return changed object update property', () => {
        const target = { value1: 0 };
        const expected = { value1: 1 };
        objectOperations.SetProperty(target, 'value1', 1);
        return expect(target).toEqual(expected);
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
