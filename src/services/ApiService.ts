/**
 * API Service - Centralized HTTP client following Single Responsibility Principle
 * Handles all API communications with proper error handling and logging
 */

export interface ApiRequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message: string;
  status: number;
  timestamp: Date;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public endpoint: string,
    public originalError?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ApiService {
  private readonly baseUrl: string;
  private readonly defaultTimeout: number = 10000;
  private readonly defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  /**
   * Generic request method with error handling
   */
  protected async request<T>(
    endpoint: string,
    config: ApiRequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      timeout = this.defaultTimeout
    } = config;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const requestConfig: RequestInit = {
        method,
        headers: {
          ...this.defaultHeaders,
          ...headers
        },
        signal: controller.signal
      };

      if (body && method !== 'GET') {
        requestConfig.body = typeof body === 'string' ? body : JSON.stringify(body);
      }

      const response = await fetch(url, requestConfig);
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new ApiError(
          response.status,
          `HTTP ${response.status}: ${response.statusText}`,
          endpoint,
          response
        );
      }

      const data = await response.json();

      return {
        data,
        success: true,
        message: 'Request successful',
        status: response.status,
        timestamp: new Date()
      };

    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new ApiError(408, 'Request timeout', endpoint, error);
        }

        throw new ApiError(500, error.message, endpoint, error);
      }

      throw new ApiError(500, 'Unknown error occurred', endpoint, error);
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, config?: Omit<ApiRequestConfig, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, body?: any, config?: Omit<ApiRequestConfig, 'method'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'POST', body });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, body?: any, config?: Omit<ApiRequestConfig, 'method'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'PUT', body });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, config?: Omit<ApiRequestConfig, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, body?: any, config?: Omit<ApiRequestConfig, 'method'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'PATCH', body });
  }

  /**
   * Upload file
   */
  async uploadFile<T>(endpoint: string, file: File, additionalData?: Record<string, any>): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, typeof value === 'string' ? value : JSON.stringify(value));
      });
    }

    return this.request<T>(endpoint, {
      method: 'POST',
      body: formData,
      headers: {} // Let browser set Content-Type for multipart/form-data
    });
  }

  /**
   * Download file
   */
  async downloadFile(endpoint: string, filename?: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`);
      
      if (!response.ok) {
        throw new ApiError(response.status, 'Download failed', endpoint);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      throw error instanceof ApiError ? error : new ApiError(500, 'Download failed', endpoint, error);
    }
  }

  /**
   * Batch requests
   */
  async batch<T>(requests: Array<{ endpoint: string; config?: ApiRequestConfig }>): Promise<ApiResponse<T>[]> {
    const promises = requests.map(({ endpoint, config }) => this.request<T>(endpoint, config));
    return Promise.all(promises);
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<ApiResponse<{ status: string; timestamp: string }>> {
    return this.get('/health');
  }
}

// Mock API Service for development (when no backend is available)
export class MockApiService extends ApiService {
  private delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  protected async request<T>(endpoint: string, config: ApiRequestConfig = {}): Promise<ApiResponse<T>> {
    // Simulate network delay
    await this.delay(Math.random() * 1000 + 200);

    // Mock responses based on endpoint patterns
    if (endpoint.includes('/clubs')) {
      return this.mockClubsResponse<T>(endpoint, config);
    }

    if (endpoint.includes('/members')) {
      return this.mockMembersResponse<T>(endpoint, config);
    }

    if (endpoint.includes('/events')) {
      return this.mockEventsResponse<T>(endpoint, config);
    }

    if (endpoint.includes('/partners')) {
      return this.mockPartnersResponse<T>(endpoint, config);
    }

    // Default mock response
    return {
      data: {} as T,
      success: true,
      message: 'Mock response',
      status: 200,
      timestamp: new Date()
    };
  }

  private mockClubsResponse<T>(_endpoint: string, _config: ApiRequestConfig): ApiResponse<T> {
    // Use ClubService data for mock responses
    return {
      data: [] as T, // Would be populated with actual mock data
      success: true,
      message: 'Clubs retrieved successfully',
      status: 200,
      timestamp: new Date()
    };
  }

  private mockMembersResponse<T>(_endpoint: string, _config: ApiRequestConfig): ApiResponse<T> {
    return {
      data: [] as T,
      success: true,
      message: 'Members retrieved successfully',
      status: 200,
      timestamp: new Date()
    };
  }

  private mockEventsResponse<T>(_endpoint: string, _config: ApiRequestConfig): ApiResponse<T> {
    return {
      data: [] as T,
      success: true,
      message: 'Events retrieved successfully',
      status: 200,
      timestamp: new Date()
    };
  }

  private mockPartnersResponse<T>(_endpoint: string, _config: ApiRequestConfig): ApiResponse<T> {
    return {
      data: [] as T,
      success: true,
      message: 'Partners retrieved successfully',
      status: 200,
      timestamp: new Date()
    };
  }
}

// Environment-based service instantiation
const isDevelopment = import.meta.env.DEV;
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api';

export const apiService = isDevelopment && !apiBaseUrl.startsWith('http') 
  ? new MockApiService(apiBaseUrl)
  : new ApiService(apiBaseUrl);
