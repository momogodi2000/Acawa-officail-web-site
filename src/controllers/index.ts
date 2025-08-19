// Central export for all controllers following MVC architecture
export * from './ClubController';
export * from './FormController';

// Controller factory for dependency injection
export class ControllerFactory {
  private static controllers: Map<string, any> = new Map();

  static async getClubController() {
    if (!this.controllers.has('clubController')) {
      const { clubController } = await import('./ClubController');
      this.controllers.set('clubController', clubController);
    }
    return this.controllers.get('clubController');
  }

  static async getFormController() {
    if (!this.controllers.has('formController')) {
      const { formController } = await import('./FormController');
      this.controllers.set('formController', formController);
    }
    return this.controllers.get('formController');
  }

  static clearCache() {
    this.controllers.clear();
  }
}
