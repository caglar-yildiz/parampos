# Parampos TypeScript Library

This library provides an easy way to integrate the Parampos service into your Node.js projects using TypeScript.

## Installation

Install the library via npm. Open your command line, navigate to your project root and enter the following:
``npm install ``

```
import { Parampos } from 'parampos';

const paramposInstance = new Parampos({
CLIENT_CODE: 'your_client_code',
CLIENT_USERNAME: 'your_username',
CLIENT_PASSWORD: 'your_password',
MODE: 'test' // or 'production'
});

paramposInstance.getClient()
.then(client => {
// Now, you can use the client here
// For example to make a BIN_SanalPosAsyncImpl call:
// client.BIN_SanalPosAsyncImpl(input)
})
.catch(error => {
// Handle any error that occurred while trying to use the Parampos service
console.error(error);
});
```

## Important
Make sure to avoid exposing your CLIENT_CODE, CLIENT_USERNAME and CLIENT_PASSWORD in your client-side code!
