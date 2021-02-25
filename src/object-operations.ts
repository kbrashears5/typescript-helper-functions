import { AnyObject } from './any-object';

/**
 * Functions to operate on objects
 */
export class ObjectOperations {
  /**
   * Text Decoder
   */
  private TextDecoder: TextDecoder;

  /**
   * Text Encoder
   */
  private TextEncoder: TextEncoder;

  /**
   * Create new instance of ObjectOperations
   */
  constructor() {
    this.TextDecoder = new TextDecoder();
    this.TextEncoder = new TextEncoder();
  }

  /**
   * Returns whether the two given objects are equal
   * @param object1 {object} - First object in the comparison
   * @param object2 {object} - Second object in the comparison
   * @param excludeList {string[]} - List of property names to exclude during the comparison
   */
  public AreObjectsEqual(
    object1: object,
    object2: object,
    ...excludeList: string[]
  ): boolean {
    const excludes = excludeList || [];

    const propNames = [
      ...new Set(
        Object.getOwnPropertyNames(object1).concat(
          Object.getOwnPropertyNames(object2),
        ),
      ),
    ];

    const diffList = propNames
      .filter((column) => excludes.indexOf(column) < 0)
      .filter((column) => !this.IsPropertyEqual(object1, object2, column));

    return diffList.length < 1;
  }

  /**
   * Clones the given object
   * @param source {T} - Source object
   * @param excludeList {string[]} - List of property names to exclude from the clone
   */
  public CloneObject<T extends AnyObject>(source: T, ...excludeList: string[]) {
    const result: any = Object.assign({}, source);

    if (excludeList) {
      excludeList.forEach((val) => {
        result[val] = undefined;
      });
    }

    return this.RemoveUndefinedElements<T>(result);
  }

  /**
   * Convert a string to an array buffer
   * @param value {string} - Value to encode
   */
  public ConvertArrayBufferToString(value: Uint8Array): string {
    if (this.IsNullOrEmpty(value))
      throw new Error(`Value cannot be null or undefined: [value]`);

    return this.TextDecoder.decode(value);
  }

  /**
   * Convert a string to an array buffer
   * @param value {string} - Value to encode
   */
  public ConvertStringToArrayBuffer(value: string): Uint8Array {
    if (this.IsNullOrWhitespace(value))
      throw new Error(`Value cannot be null or undefined: [value]`);

    return this.TextEncoder.encode(value);
  }

  /**
   * Copies the value of a property from one object to another
   * @param source {object} - Source object
   * @param target {object} - Target object
   * @param propertyName {string} - Property name
   * @param append {boolean} - Indicates whether to add the property to the target object if it doesn't exist
   */
  public CopyProperty(
    source: any,
    target: any,
    propertyName: string,
    append: boolean = false,
  ) {
    if (this.IsNullOrEmpty(source))
      throw new Error(`Value cannot be null or undefined: [source]`);
    if (this.IsNullOrEmpty(target))
      throw new Error(`Value cannot be null or undefined: [target]`);
    if (this.IsNullOrWhitespace(propertyName))
      throw new Error(`Value cannot be null or undefined: [propertyName]`);

    if (!source.hasOwnProperty(propertyName)) {
      return;
    }

    if (append || target.hasOwnProperty(propertyName)) {
      target[propertyName] = source[propertyName];
    }
  }

  /**
   * Returns the value of a given property from a given object
   * @param source {object} - Object from which to get the value
   * @param propertyName {string} - Property name from which to get the value
   * @param defaultValue {T} - Default to use if the property doesn't exist or is undefined
   */
  public GetProperty<T>(
    source: any,
    propertyName: string,
    defaultValue?: T,
  ): T | undefined {
    if (this.IsNullOrEmpty(source))
      throw new Error(`Value cannot be null or undefined: [source]`);
    if (this.IsNullOrWhitespace(propertyName)) {
      return defaultValue;
    }

    const key = Object.keys(source).find(
      (k) => k.toLowerCase() === propertyName.toLowerCase(),
    );

    const result = key ? source[key] : undefined;

    return result || defaultValue;
  }

  /**
   * Indicates whether the given value matches the given pattern.
   * @param pattern {string} - Pattern
   * @param value {string} - Value
   */
  public IsMatch(pattern: string, value: string) {
    if (this.IsNullOrWhitespace(pattern))
      throw new Error(`Value cannot be null or undefined: [pattern]`);
    if (this.IsNullOrWhitespace(value))
      throw new Error(`Value cannot be null or undefined: [value]`);

    pattern = pattern.toUpperCase();

    value = value.toUpperCase();

    if (pattern === '*') {
      return true;
    }
    if (pattern.startsWith('!') && pattern.substr(1) !== value) {
      return true;
    }
    if (
      pattern.endsWith('*') &&
      value.startsWith(pattern.substr(0, pattern.length - 1))
    ) {
      return true;
    }
    if (pattern.startsWith('*') && value.endsWith(pattern.substr(1))) {
      return true;
    }

    return pattern === value;
  }

  /**
   * Determines whether or not the given value is null or empty
   * @param value {object | string | undefined | null} Value to check if null or empty
   */
  public IsNullOrEmpty(value: object | string | undefined | null): boolean {
    switch (typeof value) {
      case 'object':
        const o: object = value || {};
        return Object.keys(o).length === 0;
      case 'string':
        const s: string = value || '';
        return s.length < 1;
      default:
        return true;
    }
  }

  /**
   * Determines whether or not the given value is null or whitespace
   * @param value {string | undefined | null} Value to check if null or whitespace
   */
  public IsNullOrWhitespace(value: string | undefined | null): boolean {
    return this.IsNullOrEmpty((value || '').trim());
  }

  /**
   * Returns whether the value of a given property is the same on two objects
   * @param item1 {object} - First object in the comparison
   * @param item2 {object} - Second object in the comparison
   * @param propertyName {string} - Property name
   */
  public IsPropertyEqual(
    item1: any,
    item2: any,
    propertyName: string,
  ): boolean {
    if (this.IsNullOrEmpty(item1))
      throw new Error(`Value cannot be null or undefined: [item1]`);
    if (this.IsNullOrEmpty(item2))
      throw new Error(`Value cannot be null or undefined: [item2]`);
    if (this.IsNullOrWhitespace(propertyName))
      throw new Error(`Value cannot be null or undefined: [propertyName]`);

    const oldValue = item1[propertyName];

    const newValue = item2[propertyName];

    return Object.is(oldValue, newValue);
  }

  /**
   * Returns a new object that is the combination of the supplied source objects.
   * @param object1 {object} - First object.
   * @param object2 {object} - Second object.
   */
  public MergeObjects<T extends AnyObject>(object1: T, object2: T) {
    const result = {};

    // Merge first object
    if (object1) {
      Object.getOwnPropertyNames(object1).forEach((name) =>
        this.MergeObjectProperty(result, object1, object2, name),
      );
    }

    // Merge second object
    if (object2) {
      Object.getOwnPropertyNames(object2).forEach((name) =>
        this.MergeObjectProperty(result, object1, object2, name),
      );
    }

    return result as T;
  }

  /**
   * Sets the value for the given property on the target based upon the given sources.
   * @param target {object} - Target object
   * @param source1 {object} - Source object 1.
   * @param source2 {object} - Source object 2.
   * @param propertyName {string} - Property name.
   */
  public MergeObjectProperty<T extends AnyObject>(
    target: T,
    source1: T,
    source2: T,
    propertyName: string,
  ) {
    const value1 =
      source1 && source1.hasOwnProperty(propertyName)
        ? source1[propertyName]
        : undefined;

    const value2 =
      source2 && source2.hasOwnProperty(propertyName)
        ? source2[propertyName]
        : undefined;

    const dest = target as any;

    if (typeof value1 === 'object' && !Array.isArray(value1)) {
      dest[propertyName] = this.MergeObjects(value1, value2);
    } else if (value2 === undefined) {
      dest[propertyName] = value1;
    } else {
      dest[propertyName] = value2;
    }
  }

  /**
   * Returns a new object based on the given source omitting undefined values
   * @param source {T} - Source object
   */
  public RemoveUndefinedElements<T extends AnyObject>(source: T): T {
    const result = Object.assign({}, source);

    Object.getOwnPropertyNames(source).forEach((val) => {
      const value = source[val];

      if (value === undefined) {
        delete result[val];
      }
    });
    return result;
  }

  /**
   * Sets the value of a given property on the given object
   * @param target {object} - Object to target
   * @param propertyName {string} - Property name to target
   * @param value {any} - Value to set
   * @param append {boolean} - Indicates whether to add the property to the target object if it doesn't exist
   */
  public SetProperty(
    target: any,
    propertyName?: string,
    value?: any,
    append: boolean = true,
  ) {
    if (this.IsNullOrEmpty(target))
      throw new Error(`Value cannot be null or undefined: [target]`);

    propertyName = propertyName || '';

    if (this.IsNullOrWhitespace(propertyName)) {
      return;
    }

    if (append || target.hasOwnProperty(propertyName)) {
      target[propertyName] = value;
    }
  }

  /**
   * Converts to string
   * @param value {any} Value to convert to string
   */
  public ToString(value: any): string {
    switch (typeof value) {
      case 'boolean':
      case 'number':
      case 'string':
        return value.toString();

      case 'object':
        return JSON.stringify(value);

      default:
        return value || '';
    }
  }
}
