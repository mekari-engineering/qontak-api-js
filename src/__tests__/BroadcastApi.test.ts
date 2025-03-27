import { QontakClient } from '../index';
import { ApiClient } from '../core/core';
import { AxiosError } from 'axios';

// Mock the entire core module
jest.mock('../core/core', () => {
  const mockRequest = jest.fn();
  return {
    ApiClient: jest.fn().mockImplementation(() => ({
      request: mockRequest,
    })),
  };
});

describe('BroadcastApi', () => {
  let client: QontakClient;
  let mockApiClient: jest.Mocked<ApiClient>;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Create a new client instance for each test
    client = new QontakClient({
      clientId: 'test-client-id',
      clientSecret: 'test-client-secret',
    });

    // Get the mocked ApiClient instance
    mockApiClient = (client as any).broadcast.client;
  });

  describe('createBroadcastDirect', () => {
    const mockOtpTemplate = {
      to_name: "Test User",
      to_number: "628117661000",
      message_template_id: "60cccaa0-ccd9-4efd-bdfb-875859c4b50a",
      channel_integration_id: "56b60c3c-0123-46af-958b-32f3ad12ee37",
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
            value_text: "123454321",
            value: "otp"
          }
        ]
      }
    };

    it('should successfully send OTP message', async () => {
      const mockResponse = {
        id: "test-broadcast-id",
        status: "success",
        message: "Broadcast created successfully"
      };

      mockApiClient.request.mockResolvedValueOnce(mockResponse);

      const result = await client.broadcast.createBroadcastDirect(mockOtpTemplate);

      expect(result).toEqual(mockResponse);
      expect(mockApiClient.request).toHaveBeenCalledWith(
        'post',
        '/broadcasts/whatsapp/direct',
        mockOtpTemplate
      );
    });

    it('should handle invalid phone number', async () => {
      const mockError = new Error('Invalid phone number') as AxiosError;
      mockError.response = {
        status: 400,
        data: { message: 'Invalid phone number format' },
        statusText: 'Bad Request',
        headers: {},
        config: {} as any,
      };

      mockApiClient.request.mockRejectedValueOnce(mockError);

      await expect(client.broadcast.createBroadcastDirect(mockOtpTemplate))
        .rejects.toThrow('Invalid phone number');
    });

    it('should handle invalid template ID', async () => {
      const mockError = new Error('Invalid template') as AxiosError;
      mockError.response = {
        status: 404,
        data: { message: 'Template not found' },
        statusText: 'Not Found',
        headers: {},
        config: {} as any,
      };

      mockApiClient.request.mockRejectedValueOnce(mockError);

      await expect(client.broadcast.createBroadcastDirect(mockOtpTemplate))
        .rejects.toThrow('Invalid template');
    });

    it('should handle rate limiting', async () => {
      const mockError = new Error('Rate limit exceeded') as AxiosError;
      mockError.response = {
        status: 429,
        data: { message: 'Too many requests' },
        statusText: 'Too Many Requests',
        headers: {},
        config: {} as any,
      };

      mockApiClient.request.mockRejectedValueOnce(mockError);

      await expect(client.broadcast.createBroadcastDirect(mockOtpTemplate))
        .rejects.toThrow('Rate limit exceeded');
    });

    it('should validate required fields', async () => {
      const invalidTemplate = {
        ...mockOtpTemplate,
        to_number: undefined
      };

      const mockError = new Error('Validation failed') as AxiosError;
      mockError.response = {
        status: 400,
        data: { message: 'to_number is required' },
        statusText: 'Bad Request',
        headers: {},
        config: {} as any,
      };

      mockApiClient.request.mockRejectedValueOnce(mockError);

      await expect(client.broadcast.createBroadcastDirect(invalidTemplate as any))
        .rejects.toThrow('Validation failed');
    });
  });
}); 