import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

/**
 * Shared validation schemas for edge functions
 * Provides defense-in-depth input validation
 */

export const userIdSchema = z.object({
  userId: z.string().uuid({ message: 'Invalid user ID format' })
});

export type UserIdInput = z.infer<typeof userIdSchema>;

/**
 * Validates request body against a schema
 * Returns parsed data or throws validation error
 */
export function validateRequest<T>(
  schema: z.ZodSchema<T>,
  body: unknown
): { success: true; data: T } | { success: false; error: string } {
  const validation = schema.safeParse(body);
  
  if (!validation.success) {
    const firstError = validation.error.errors[0];
    return {
      success: false,
      error: firstError.message
    };
  }
  
  return {
    success: true,
    data: validation.data
  };
}
