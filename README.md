<h1 align="center">typescript-helper-functions</h1>

<div align="center">
    
<b>Helper functions for Typescript</b>
    
[![CI/CD](https://github.com/kbrashears5/typescript-helper-functions/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/kbrashears5/typescript-helper-functions/actions/workflows/ci-cd.yml)

[![npm](https://img.shields.io/npm/v/typescript-helper-functions)](https://img.shields.io/npm/v/typescript-helper-functions)
[![npm](https://img.shields.io/npm/dt/typescript-helper-functions)](https://img.shields.io/npm/dt/typescript-helper-functions)

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

logHelper.LogInputs('functionName', new { param1, param2 }());
```

### ObjectOperations

Helper class to invoke operations on object types

```javascript
const objectOperations = new ObjectOperations();

logHelper.ToString(true);
```

### Orchestrator

Helper class to invoke operations on object types

```javascript
const logger = new Logger(LogLevel.Trace);

const orchestrator = new Orchestrator(logger);

orchestrator.Orchestrate(() => {
  console.log('function');
});
```

## Development

Clone the latest and run

```npm
npm run prep
```

to install packages and prep the git hooks
