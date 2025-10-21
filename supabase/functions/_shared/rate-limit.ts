/**
 * Rate Limiting para Edge Functions
 * Previne abuso e ataques de força bruta
 */

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

// Armazenamento em memória (simples, para produção considerar Redis)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export async function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = { maxRequests: 10, windowMs: 60000 }
): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
  const now = Date.now();
  const record = requestCounts.get(identifier);

  // Se não existe registro ou janela expirou, criar novo
  if (!record || now > record.resetTime) {
    const resetTime = now + config.windowMs;
    requestCounts.set(identifier, { count: 1, resetTime });
    return { allowed: true, remaining: config.maxRequests - 1, resetTime };
  }

  // Incrementar contador
  record.count++;

  // Verificar se excedeu o limite
  if (record.count > config.maxRequests) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }

  return {
    allowed: true,
    remaining: config.maxRequests - record.count,
    resetTime: record.resetTime
  };
}

export function getRateLimitHeaders(
  remaining: number,
  resetTime: number
): Record<string, string> {
  return {
    'X-RateLimit-Remaining': remaining.toString(),
    'X-RateLimit-Reset': new Date(resetTime).toISOString(),
    'Retry-After': Math.ceil((resetTime - Date.now()) / 1000).toString()
  };
}
