import DOMPurify from 'dompurify';

interface SafeHTMLProps {
  html: string;
  className?: string;
  allowedTags?: string[];
  allowedAttributes?: Record<string, string[]>;
}

/**
 * Componente seguro para renderizar HTML sanitizado
 * Previne ataques XSS ao limpar todo HTML antes de renderizar
 */
export const SafeHTML = ({ 
  html, 
  className = '',
  allowedTags,
  allowedAttributes
}: SafeHTMLProps) => {
  const config: any = {
    ALLOWED_TAGS: allowedTags || [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'a', 'span', 'div'
    ],
    ALLOW_DATA_ATTR: false,
    ALLOW_UNKNOWN_PROTOCOLS: false,
  };

  if (allowedAttributes) {
    config.ALLOWED_ATTR = allowedAttributes;
  }

  const sanitizedHTML = DOMPurify.sanitize(html, config);

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  );
};
