# Client JS Example

Folder structure

```bash
client-js-example
|---  index.js                                                                                                                                                                                                                                                 
|---  package.json
```

file package.json
```javascript
{
  "name": "client-js-example",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

file index.js
```javascript
const { QontakClient } = require("qontak-client");

const api = new QontakClient ({
  clientId: "<Replace With Client ID>",
  clientSecret: "<Replace With Client Secret>",
});

async function sendOtp() {
  try {
    const withTextTemplate =         {
      "to_name": "Burhan",
      "to_number": "628117661000",
      "message_template_id": "60cccaa0-ccd9-4efd-bdfb-875859c4b50a",
      "channel_integration_id": "56b60c3c-0123-46af-958b-32f3ad12ee37",
      "language": {
          "code": "id"
      },
      "parameters": {
          "buttons": [
            {
              "index": "0",
              "type": "url",
              "value": "123456"
            }
          ],
          "body": [
              {
                  "key":"1",
                  "value_text":"123454321",
                  "value":"otp"
              }
          ]
      }
    }
   
    const response = await api.broadcast.createBroadcastDirect(withTextTemplate)
    console.log("Response:", response);
  } catch (error) {
    console.error("Error:", error.response.data);
  }
}
```

Command to run
```bash
npm install
node index.js
```
