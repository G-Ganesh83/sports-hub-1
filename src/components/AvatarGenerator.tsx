import { useMemo } from 'react';

type AvatarGeneratorProps = {
  name: string;
  size?: number;
  className?: string;
};

export function AvatarGenerator({ name, size = 96, className }: AvatarGeneratorProps) {
  const seed = useMemo(() => (name || 'user').trim() || 'user', [name]);
  const url = useMemo(() => {
    const encoded = encodeURIComponent(seed);
    return `https://api.dicebear.com/8.x/initials/svg?seed=${encoded}&backgroundColor=0ea5e9,6366f1&size=${size}`;
  }, [seed, size]);

  return (
    <img
      src={url}
      alt={seed}
      width={size}
      height={size}
      className={`rounded-full ring-2 ring-white shadow ${className || ''}`}
    />
  );
}

export default AvatarGenerator;


