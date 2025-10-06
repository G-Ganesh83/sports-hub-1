import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ReactNode } from 'react';

type InputFieldProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string | number | undefined;
  onChange: (value: string) => void;
  rightElement?: ReactNode;
  readOnly?: boolean;
};

export function InputField({ id, label, type = 'text', placeholder, value, onChange, rightElement, readOnly }: InputFieldProps) {
  return (
    <div className="space-y-1">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value as any}
          readOnly={readOnly}
          onChange={(e) => onChange(e.target.value)}
          className="pr-10"
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-2 flex items-center text-muted-foreground">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}

export default InputField;


