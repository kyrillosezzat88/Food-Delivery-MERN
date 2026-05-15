// utils/validateField.ts
import { z, ZodObject,  type ZodRawShape } from "zod";

export function validateField<
  TShape extends ZodRawShape,
  TField extends keyof TShape,
>(
  schema: ZodObject<TShape>,
  field: TField,
  value: unknown,
): string | undefined {
  try {
    (schema.shape[field] as unknown as z.ZodType<unknown>).parse(value);
    return undefined;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.issues[0]?.message;
    }

    return "Invalid value";
  }
}
