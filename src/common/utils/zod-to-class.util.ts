import { z } from 'zod';

/**
 * Creates a class from a Zod schema for validation and conversion.
 * @param schema Zod schema to convert.
 */
export function ZodClass<T extends z.ZodRawShape>(schema: z.ZodObject<T>) {
  return class {
    constructor(data?: z.infer<typeof schema>) {
      if (data) {
        const validated = schema.parse(data);
        Object.assign(this, validated);
      }
    }

    static create(data: unknown) {
      const validated = schema.parse(data);
      const instance = new this();
      Object.assign(instance, validated);
      return instance;
    }

    static validate(data: unknown): z.infer<typeof schema> {
      return schema.parse(data);
    }

    static safeParse(data: unknown): ReturnType<typeof schema.safeParse> {
      return schema.safeParse(data);
    }

    static get schema(): z.ZodObject<T> {
      return schema;
    }

    update(data: Partial<z.infer<typeof schema>>): void {
      const currentData = { ...this } as z.infer<typeof schema>;
      const mergedData = { ...currentData, ...data };
      const validated = schema.parse(mergedData);
      Object.assign(this, validated);
    }

    toPlainObject(): z.infer<typeof schema> {
      const obj: any = {};
      for (const key in this) {
        if (this.hasOwnProperty(key) && typeof this[key] !== 'function') {
          obj[key] = this[key];
        }
      }
      return obj;
    }

    isValid(): boolean {
      try {
        schema.parse(this);
        return true;
      } catch {
        return false;
      }
    }
  } as unknown as {
    new (data?: z.infer<typeof schema>): z.infer<typeof schema> & {
      update(data: Partial<z.infer<typeof schema>>): void;
      toPlainObject(): z.infer<typeof schema>;
      isValid(): boolean;
    };
    create(data: unknown): z.infer<typeof schema>;
    validate(data: unknown): z.infer<typeof schema>;
    safeParse(data: unknown): ReturnType<typeof schema.safeParse>;
    schema: z.ZodObject<T>;
  };
}

/**
 * Type helper to get the class type from a Zod schema.
 */
export type ZodClassType<T extends z.ZodRawShape> = new (
  data?: z.infer<z.ZodObject<T>>,
) => z.infer<z.ZodObject<T>>;
