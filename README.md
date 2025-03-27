# Qontak Client SDK

[![npm version](https://img.shields.io/npm/v/qontak-client.svg)](https://www.npmjs.com/package/qontak-client)
[![License](https://img.shields.io/npm/l/qontak-client.svg)](https://github.com/yourusername/qontak-client-js/blob/main/LICENSE)

A powerful NodeJS SDK for interacting with the [Mekari Qontak API](https://docs.qontak.com). This library provides a streamlined and developer-friendly way to integrate messaging capabilities into your applications.

## Prerequisites
- Node.js version 14 or higher
- WhatsApp Business API account
- [A Qontak account](https://qontak.com) with WhatsApp Channel enabled
- [API credentials](https://developers.mekari.com/docs/kb/managing-applications/create-application) (Client ID and Client Secret)
- [Approved message templates](https://chat.qontak.com/campaign/templates/whatsapp)
  
## Features

- 🔐 Secure authentication with HMAC
- 📱 WhatsApp messaging integration
- 📤 File upload capabilities
- 💬 Conversation management
- 🔄 TypeScript support
- 📦 Zero dependencies (except axios)

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Authentication](#authentication)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [Support](#support)
- [Testing](#testing)
- [Releasing to NPM](#releasing-to-npm)

## Installation

```bash
npm install qontak-client
# or
yarn add qontak-client
```

## Quick Start

```typescript
import { QontakClient } from "qontak-client";

const api = new QontakClient({
  clientId: "YOUR_CLIENT_ID",
  clientSecret: "YOUR_CLIENT_SECRET",
});

// Example: Send WhatsApp OTP message
try {
  const response = await api.broadcast.createBroadcastDirect({
    to_name: "John Doe",
    to_number: "6281234567890", // Example dummy number
    message_template_id: "YOUR_TEMPLATE_ID",
    channel_integration_id: "YOUR_CHANNEL_ID",
    language: {
      code: "id"
    },
    parameters: {
      buttons: [
        {
          index: "0",
          type: "url",
          value: "123456"
        }
      ],
      body: [
        {
          key: "1",
          value_text: "123456",
          value: "otp"
        }
      ]
    }
  });
  console.log("Response:", response);
} catch (error) {
  console.error("Error:", error.response.data);
}
```

## Authentication

### Setting Up HMAC Credentials

1. Access the Mekari Developer Center:
   - Production: https://developers.mekari.com
   - Staging: https://developers.mekari.io

2. Create an HMAC Auth Application using your Admin Account:
   - Follow the guide at [Managing Applications](https://developers.mekari.com/docs/kb/managing-applications/create-application)
   - You'll receive a client ID and client secret

3. Required Scopes:
   ```javascript
   qontak-chat:all  // Access to api.mekari.com/qontak/chat
   qontak-crm:all   // Access to api.mekari.com/qontak/crm
   ```

## API Reference

### Available Methods

- WhatsApp Templates
  - `getListWhatsappTemplate()`
  - `sendWhatsAppMessage()`
  - `uploadMedia()`

- CRM Operations
  - `createContact()`
  - `updateContact()`
  - `getContact()`

For detailed API documentation, visit [docs.qontak.com](https://docs.qontak.com)

## Examples

Check out our example applications:
- [Basic Usage Example](ExampleApplication.md)
- [WhatsApp Broadcast API Guide](WhatsAppBroadcastAPI.md)

## Error Handling

The SDK includes comprehensive error handling:

```typescript
try {
  const response = await api.template.getListWhatsappTemplate();
} catch (error) {
  if (error.response) {
    // API error with response
    console.error('API Error:', error.response.data);
  } else if (error.request) {
    // Network error
    console.error('Network Error:', error.request);
  } else {
    // Other errors
    console.error('Error:', error.message);
  }
}
```

## HTTP Error Codes

The API may return the following HTTP status codes:

| Status Code | Name | Description | Common Causes | Solution |
|-------------|------|-------------|---------------|-----------|
| 401 | Unauthorized | Authentication failed | - Invalid credentials<br>- Missing credentials<br>- Expired token | - Check client ID and secret<br>- Ensure credentials are valid<br>- Refresh authentication token |
| 403 | Forbidden | Access denied | - Insufficient permissions<br>- Missing required scopes<br>- Invalid scopes | - Verify required scopes (`qontak-chat:all`, `qontak-crm:all`)<br>- Check application permissions<br>- Contact support if issue persists |
| 404 | Not Found | Resource unavailable | - Invalid endpoint URL<br>- Resource doesn't exist<br>- Deleted resource | - Verify endpoint URL<br>- Check resource ID<br>- Ensure resource exists |
| 429 | Too Many Requests | Rate limit exceeded | - Too many requests<br>- Rate limit reached<br>- Burst of requests | - Implement exponential backoff<br>- Reduce request frequency<br>- Wait before retrying |
| 500 | Internal Server Error | Server error | - Server processing error<br>- Database error<br>- System failure | - Wait and retry<br>- Contact support if persistent<br>- Check API status |
| 502 | Bad Gateway | Gateway error | - Invalid response from upstream<br>- Network issues<br>- Service unavailable | - Wait and retry<br>- Check API status<br>- Contact support |
| 503 | Service Unavailable | Service down | - Maintenance<br>- Overload<br>- System failure | - Wait and retry<br>- Check maintenance schedule<br>- Contact support |
| 504 | Gateway Timeout | Request timeout | - Slow response<br>- Network issues<br>- Server overload | - Implement timeout handling<br>- Retry with backoff<br>- Contact support |

### Best Practices for Error Handling

```typescript
try {
  const response = await api.template.getListWhatsappTemplate();
} catch (error) {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        console.error('Authentication failed. Please check your credentials.');
        break;
      case 403:
        console.error('Access forbidden. Check your permissions and scopes.');
        break;
      case 404:
        console.error('Resource not found. Verify the endpoint URL.');
        break;
      case 429:
        console.error('Rate limit exceeded. Please wait before retrying.');
        // Implement exponential backoff here
        break;
      case 500:
        console.error('Internal server error. Please try again later.');
        break;
      default:
        console.error('API Error:', error.response.data);
    }
  }
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

- Documentation: [docs.qontak.com](https://docs.qontak.com)
- Product Website: [qontak.com](https://qontak.com)
- Support Center: [help-center.mekari.com](https://help-center.mekari.com)

For integration support, contact:
- Your company's Mekari representative (Presales/Aftersales team)
- Support Center (details available at [help-center.mekari.com](https://help-center.mekari.com/hc/id/articles/35653051467545-Bagaimana-Cara-Menggunakan-Support-Center-pada-Mekari-Account))

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Testing

The project uses Jest for testing. To run the tests:

```bash
# Run all tests
npm test

# Run tests in watch mode (good for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Test Structure

Tests are located in the `src/__tests__` directory and follow these conventions:
- Test files are named `*.test.ts`
- Each test file corresponds to a specific module
- Tests are organized using `describe` blocks for grouping
- Each test case uses `it` or `test` for individual tests

### Test Coverage

The project maintains a minimum test coverage requirement. You can view the coverage report by running:
```bash
npm run test:coverage
```

This will generate a coverage report in the `coverage` directory.

## Releasing to NPM

### Prerequisites
- NPM account with access to the package
- NPM access token with publish permissions
- GitHub account with repository access
- GitHub personal access token with repo permissions

### Setup
1. Add your NPM token to GitHub repository secrets:
   - Go to your repository settings
   - Navigate to Secrets and Variables > Actions
   - Add a new secret named `NPM_TOKEN` with your npm access token

2. Configure your NPM account:
```bash
# Login to NPM
npm login

# Set up your package scope (if using a scope)
npm config set scope @your-scope
```

### Version Management
The project follows [Semantic Versioning](https://semver.org/):
- `MAJOR` version for incompatible API changes
- `MINOR` version for backwards-compatible functionality additions
- `PATCH` version for backwards-compatible bug fixes

### Release Process
1. Update the version:
```bash
# For patch updates (bug fixes)
npm version patch

# For minor updates (new features)
npm version minor

# For major updates (breaking changes)
npm version major
```

2. Push changes and tags:
```bash
git push origin main --tags
```

The GitHub Actions workflow will automatically:
- Build the project
- Run tests
- Create a GitHub release
- Publish to NPM
- Include all necessary files in the release

### Release Files
The following files are included in each release:
- `dist/**/*` - Compiled JavaScript files
- `package.json` - Package configuration
- `package-lock.json` - Dependency lock file
- `README.md` - Documentation
- `CHANGELOG.md` - Version history
- `LICENSE` - License file

### Troubleshooting
If the release fails:
1. Check the GitHub Actions logs for errors
2. Verify your NPM token has publish permissions
3. Ensure all tests pass locally
4. Check if the version number is already taken on NPM
5. Verify the package name is available

### Best Practices
1. **Before Release**
   - Update CHANGELOG.md
   - Run tests locally
   - Check for breaking changes
   - Update documentation if needed

2. **During Release**
   - Use semantic versioning
   - Tag releases with git
   - Include all necessary files
   - Test the published package

3. **After Release**
   - Verify the package on NPM
   - Test installation in a new project
   - Update documentation if needed
   - Monitor for issues

### Beta Releases
To publish a beta version:
```bash
# Create a beta version
npm version prerelease --preid=beta

# Push changes and tags
git push origin main --tags
```

The package will be published with the beta tag:
```bash
npm install qontak-client@beta
```

### Rollback
If you need to rollback a release:
1. Unpublish the version:
```bash
npm unpublish qontak-client@<version>
```

2. Create a new patch version:
```bash
npm version patch
```

3. Push the changes:
```bash
git push origin main --tags
```

### Support
For release-related issues:
1. Check the [GitHub Issues](https://github.com/your-org/qontak-client/issues)
2. Review the [NPM documentation](https://docs.npmjs.com/)
3. Contact the maintainers

