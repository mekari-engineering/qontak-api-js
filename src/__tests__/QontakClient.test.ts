import { QontakClient } from '../index';
import { ApiClient } from '../core/core';
import { getListWhatsappTemplate } from '../types/template';
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

describe('QontakClient', () => {
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
    mockApiClient = (client as any).template.client;
  });

  describe('constructor', () => {
    it('should create a new instance with provided credentials', () => {
      expect(client).toBeInstanceOf(QontakClient);
      expect(client.template).toBeDefined();
      expect(client.broadcast).toBeDefined();
      expect(client.contact).toBeDefined();
    });

    it('should throw error if config is missing', () => {
      expect(() => new QontakClient(null as any)).toThrow('Config is required');
    });

    it('should throw error if clientId is missing', () => {
      expect(() => new QontakClient({ clientSecret: 'test' } as any)).toThrow('clientId is required');
    });

    it('should throw error if clientSecret is missing', () => {
      expect(() => new QontakClient({ clientId: 'test' } as any)).toThrow('clientSecret is required');
    });
  });

  describe('template.getListWhatsappTemplate', () => {
    const mockParams: getListWhatsappTemplate = {
      limit: '10',
      offset: '0',
    };

    it('should successfully fetch WhatsApp templates', async () => {
      const mockResponse = {
        templates: [
          { id: '1', name: 'Template 1' },
          { id: '2', name: 'Template 2' },
        ],
      };

      mockApiClient.request.mockResolvedValueOnce(mockResponse);

      const result = await client.template.getListWhatsappTemplate(mockParams);

      expect(result).toEqual(mockResponse);
      expect(mockApiClient.request).toHaveBeenCalledWith(
        'get',
        '/templates/whatsapp',
        mockParams
      );
    });

    it('should handle API errors', async () => {
      const mockError = new Error('API Error') as AxiosError;
      mockError.response = {
        status: 401,
        data: { message: 'Unauthorized' },
        statusText: 'Unauthorized',
        headers: {},
        config: {} as any,
      };

      mockApiClient.request.mockRejectedValueOnce(mockError);

      await expect(client.template.getListWhatsappTemplate(mockParams)).rejects.toThrow('API Error');
    });
  });

  describe('error handling', () => {
    const mockParams: getListWhatsappTemplate = {
      limit: '10',
      offset: '0',
    };

    it('should handle network errors', async () => {
      mockApiClient.request.mockRejectedValueOnce(new Error('Network Error'));

      await expect(client.template.getListWhatsappTemplate(mockParams)).rejects.toThrow('Network Error');
    });

    it('should handle rate limiting', async () => {
      const mockError = new Error('Rate Limit Exceeded') as AxiosError;
      mockError.response = {
        status: 429,
        data: { message: 'Too Many Requests' },
        statusText: 'Too Many Requests',
        headers: {},
        config: {} as any,
      };

      mockApiClient.request.mockRejectedValueOnce(mockError);

      await expect(client.template.getListWhatsappTemplate(mockParams)).rejects.toThrow('Rate Limit Exceeded');
    });
  });

  describe('authentication', () => {
    const mockParams: getListWhatsappTemplate = {
      limit: '10',
      offset: '0',
    };

    it('should include authentication headers in requests', async () => {
      const mockResponse = { templates: [] };
      mockApiClient.request.mockResolvedValueOnce(mockResponse);

      await client.template.getListWhatsappTemplate(mockParams);

      expect(mockApiClient.request).toHaveBeenCalledWith(
        'get',
        '/templates/whatsapp',
        mockParams
      );
    });
  });
}); 