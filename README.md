# typescript-helper-functions
Typescript Helper Functions

## Install
```
npm install typescript-helper-functions@latest
```

## Usage
### Base Class
Inherit from this class to get some extra functionality
```javascript
public class Class1 extends BaseClass{
    
}
```

### LogHelper
Helper class to log in a consistent way
```javascript
const logHelper = new LogHelper(LogLevel.Trace);

logHelper.LogInputs('functionName',
    new { param1, param2 });
```

### ObjectOperations
Helper class to invoke operations on object types
```javascript
const objectOperations = new ObjectOperations();

logHelper.ToString(true);
```