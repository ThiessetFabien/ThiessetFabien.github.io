import DOMPurifier from 'isomorphic-dompurify';

type SanitizeValue = string | number | boolean | null | undefined;

export class SanitizationService {
  private static instance: SanitizationService;
  private constructor() {}

  public static getInstance(): SanitizationService {
    if (!SanitizationService.instance) {
      SanitizationService.instance = new SanitizationService();
    }
    return SanitizationService.instance;
  }

  public sanitizeInput(input: string): string {
    return DOMPurifier.sanitize(input, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    });
  }

  public sanitizeObject<T extends Record<string, SanitizeValue>>(data: T): T {
    return Object.keys(data).reduce((acc, key) => {
      const value = data[key];
      return {
        ...acc,
        [key]: typeof value === 'string' ? this.sanitizeInput(value) : value,
      };
    }, {} as T);
  }
}
