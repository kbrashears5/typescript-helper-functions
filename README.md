<h1 align="center">typescript-helper-functions</h1>

<div align="center">
    
<b>Helper functions for Typescript</b>
    
[![Build Status](https://dev.azure.com/kbrashears5/github/_apis/build/status/kbrashears5.typescript-helper-functions?branchName=master)](https://dev.azure.com/kbrashears5/github/_build/latest?definitionId=9&branchName=master)
[![Tests](https://img.shields.io/azure-devops/tests/kbrashears5/github/9)](https://img.shields.io/azure-devops/tests/kbrashears5/github/9)
[![Code Coverage](https://img.shields.io/azure-devops/coverage/kbrashears5/github/9)](https://img.shields.io/azure-devops/coverage/kbrashears5/github/9)

[![npm](https://img.shields.io/npm/v/typescript-helper-functions)](https://img.shields.io/npm/v/typescript-helper-functions)
[![nuget](https://img.shields.io/npm/dt/typescript-helper-functions)](https://img.shields.io/npm/dt/typescript-helper-functions)
</div>

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