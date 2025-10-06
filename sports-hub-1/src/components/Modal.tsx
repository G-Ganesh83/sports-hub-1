import { ReactNode } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  maxWidthClass?: string;
};

export function Modal({ open, onOpenChange, title, children, maxWidthClass = 'sm:max-w-2xl' }: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${maxWidthClass} bg-white rounded-xl shadow-xl`}>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-2 space-y-4">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;


