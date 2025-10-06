import { ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';

type FileUploadProps = {
  label: string;
  accept?: string;
  multiple?: boolean;
  onFilesSelected: (files: FileList) => void;
};

export function FileUpload({ label, accept, multiple, onFilesSelected }: FileUploadProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(e.target.files);
    }
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground/90">{label}</label>
      <div className="flex items-center gap-3">
        <input type="file" accept={accept} multiple={multiple} onChange={handleChange} className="hidden" id="file-input" />
        <Button type="button" onClick={() => document.getElementById('file-input')?.click()} className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          Upload
        </Button>
      </div>
    </div>
  );
}

export default FileUpload;


