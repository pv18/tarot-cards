import React, { useState } from 'react';
import { FiShare2 } from 'react-icons/fi';
import { buildShareUrl } from '../../utils/share';
import { type IReading } from '../../types/types';
import { Button } from '../ui/Button';

interface ShareButtonProps {
  reading: Omit<IReading, 'id'>;
}

/** Копирует ссылку с закодированным раскладом */
export const ShareButton: React.FC<ShareButtonProps> = ({ reading }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    await navigator.clipboard.writeText(buildShareUrl(reading));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button size='large' icon={<FiShare2 />} onClick={handleShare}>
      {copied ? 'Ссылка скопирована' : 'Поделиться'}
    </Button>
  );
};
