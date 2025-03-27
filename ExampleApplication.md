# Client JS Example

⚠️ **Security Notice**: Never commit sensitive credentials to version control. Use environment variables for secrets.

Folder structure
```bash
client-js-example
|---  index.js
|---  package.json
|---  .env
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
  "license": "ISC",
  "dependencies": {
    "dotenv": "^16.4.7",
    "qontak-client": "^1.0.0"
  }
}
```

file .env
```bash
QONTAK_CLIENT_ID=your_client_id_here
QONTAK_CLIENT_SECRET=your_client_secret_here
```

file index.js
```javascript
require('dotenv').config();
const { QontakClient } = require("qontak-client");

// Validate environment variables
if (!process.env.QONTAK_CLIENT_ID || !process.env.QONTAK_CLIENT_SECRET) {
  throw new Error('Missing required environment variables. Please check your .env file.');
}

const api = new QontakClient({
  clientId: process.env.QONTAK_CLIENT_ID,
  clientSecret: process.env.QONTAK_CLIENT_SECRET,
});

async function sendOtp() {
  try {
    const withTextTemplate = {
      "to_name": "Test User",
      "to_number": "6281234567890", // Example dummy number
      "message_template_id": "your_template_id_here",
      "channel_integration_id": "your_channel_id_here",
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
            "key": "1",
            "value_text": "123456",
            "value": "otp"
          }
        ]
      }
    }
   
    const response = await api.broadcast.createBroadcastDirect(withTextTemplate);
    console.log("Response:", response);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

// Add error handling for uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Run the example
sendOtp().catch(console.error);
```

Command to run
```bash
# Install dependencies
npm install

# Run the example
node index.js
```

## Security Best Practices

1. **Environment Variables**
   - Never hardcode credentials
   - Use .env files for local development
   - Use secure secret management in production

2. **Error Handling**
   - Implement proper error handling
   - Don't expose sensitive information in error messages
   - Log errors securely

3. **Input Validation**
   - Validate all input parameters
   - Sanitize user input
   - Use TypeScript for type safety

4. **Rate Limiting**
   - Implement rate limiting in production
   - Handle API rate limits gracefully
   - Monitor API usage

5. **Secure Dependencies**
   - Keep dependencies updated
   - Use package-lock.json
   - Regular security audits
