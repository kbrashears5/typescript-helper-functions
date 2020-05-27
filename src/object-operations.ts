/**
 * Functions to operate on objects
 */
export class ObjectOperations {
    /**
     * Determines whether or not the given value is null or empty
     * @param value {object | string | undefined | null} Value to check if null or empty
     */
    public IsNullOrEmpty(value: object | string | undefined | null): boolean {
        switch (typeof (value)) {
            case 'object':
                const o: object = (value || {});
                return Object.keys(o).length === 0;
            case 'string':
                const s: string = (value || '');
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
     * Converts to string
     * @param value {any} Value to convert to string
     */
    public ToString(value: any): string {
        switch (typeof (value)) {
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
