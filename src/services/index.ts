// Central export for all services following Dependency Inversion Principle
export * from './ApiService';
export * from './WhatsAppService';
export * from './ClubService';

// Service container for dependency injection
export class ServiceContainer {
  private static instance: ServiceContainer;
  private services: Map<string, any> = new Map();

  private constructor() {}

  static getInstance(): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer();
    }
    return ServiceContainer.instance;
  }

  register<T>(name: string, service: T): void {
    this.services.set(name, service);
  }

  get<T>(name: string): T {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`Service ${name} not found`);
    }
    return service;
  }

  has(name: string): boolean {
    return this.services.has(name);
  }
}

// Initialize default services
const container = ServiceContainer.getInstance();

// Register services (lazy loading)
import('./ApiService').then(({ apiService }) => {
  container.register('apiService', apiService);
});

import('./WhatsAppService').then(({ whatsAppService }) => {
  container.register('whatsAppService', whatsAppService);
});

import('./ClubService').then(({ clubService }) => {
  container.register('clubService', clubService);
});

export { container as serviceContainer };
