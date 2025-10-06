import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

type TextAreaProps = {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
};

export function TextArea({ id, label, placeholder, value, onChange, rows = 4 }: TextAreaProps) {
  return (
    <div className="space-y-1">
      <Label htmlFor={id}>{label}</Label>
      <Textarea id={id} placeholder={placeholder} value={value} rows={rows} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export default TextArea;


