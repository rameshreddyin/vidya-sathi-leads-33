
/**
 * Sanitizes a string to prevent XSS attacks
 * Escapes HTML special characters and removes potentially dangerous content
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Sanitizes an object's string properties recursively
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const result = { ...obj };
  
  Object.keys(result).forEach(key => {
    if (typeof result[key] === 'string') {
      result[key] = sanitizeInput(result[key]);
    } else if (typeof result[key] === 'object' && result[key] !== null) {
      result[key] = sanitizeObject(result[key]);
    }
  });
  
  return result;
}
