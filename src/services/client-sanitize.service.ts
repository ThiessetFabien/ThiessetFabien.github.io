import DOMPurify from 'isomorphic-dompurify';

export class ClientSanitizationService {
  private static instance: ClientSanitizationService;

  private constructor() {}

  public static getInstance(): ClientSanitizationService {
    if (!ClientSanitizationService.instance) {
      ClientSanitizationService.instance = new ClientSanitizationService();
    }
    return ClientSanitizationService.instance;
  }

  public sanitizeString(data: string): string {
    return DOMPurify.sanitize(data);
  }

  public sanitizeObject<T>(obj: T): T {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }

    const result = {} as T;

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];

        if (typeof value === 'string') {
          (result as Record<string, unknown>)[key] = this.sanitizeString(value);
        } else if (typeof value === 'object' && value !== null) {
          (result as Record<string, unknown>)[key] = this.sanitizeObject(value);
        } else {
          (result as Record<string, unknown>)[key] = value;
        }
      }
    }

    return result;
  }
}
