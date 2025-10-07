import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Bold, Italic, Underline, Highlighter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
}

const HIGHLIGHT_COLORS = [
  { name: 'Amarelo', color: '#FEF08A', class: 'bg-yellow-200' },
  { name: 'Verde', color: '#BBF7D0', class: 'bg-green-200' },
  { name: 'Azul', color: '#BFDBFE', class: 'bg-blue-200' },
  { name: 'Rosa', color: '#FBCFE8', class: 'bg-pink-200' },
  { name: 'Roxo', color: '#DDD6FE', class: 'bg-purple-200' },
  { name: 'Laranja', color: '#FED7AA', class: 'bg-orange-200' },
];

export const RichTextEditor = ({ value, onChange, placeholder, className, minHeight = '150px' }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const applyHighlight = (color: string) => {
    document.execCommand('hiliteColor', false, color);
    editorRef.current?.focus();
  };

  return (
    <div className={cn("border rounded-md", className)}>
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b bg-muted/30 flex-wrap">
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => execCommand('bold')}
          className="h-8 w-8 p-0"
          title="Negrito"
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => execCommand('italic')}
          className="h-8 w-8 p-0"
          title="Itálico"
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => execCommand('underline')}
          className="h-8 w-8 p-0"
          title="Sublinhado"
        >
          <Underline className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        <div className="flex items-center gap-1">
          <Highlighter className="w-4 h-4 text-muted-foreground mr-1" />
          {HIGHLIGHT_COLORS.map((colorOption) => (
            <button
              key={colorOption.name}
              type="button"
              onClick={() => applyHighlight(colorOption.color)}
              className={cn(
                "h-6 w-6 rounded border-2 border-gray-300 hover:border-gray-500 transition-colors",
                colorOption.class
              )}
              title={colorOption.name}
            />
          ))}
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-b-md"
        style={{ minHeight }}
        data-placeholder={placeholder}
        suppressContentEditableWarning
      />

      <style>
        {`
          [contenteditable][data-placeholder]:empty:before {
            content: attr(data-placeholder);
            color: hsl(var(--muted-foreground));
            pointer-events: none;
          }
          [contenteditable] {
            outline: none;
          }
        `}
      </style>
    </div>
  );
};
