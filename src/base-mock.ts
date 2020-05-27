/**
 * Base Mock
 */
export abstract class BaseMock {

    /**
     * Gets the mock functions
     */
    public get Mock() { return this.Mocks; }

    /**
     * Mock functions
     */
    private Mocks: any;

    /**
     * Create a new instance of BaseMock
     */
    constructor(returnError: boolean) {
        this.Mocks = this.CreateMock(returnError);
    }

    /**
     * Function to create the mock objects
     */
    protected abstract CreateMock(returnError: boolean): any;
}
