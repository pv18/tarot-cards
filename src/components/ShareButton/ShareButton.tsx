import React, { useState } from 'react';
import { Button } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';
import { buildShareUrl } from '../../utils/share';
import { type IReading } from '../../types/types';

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
    <Button size='large' icon={<ShareAltOutlined />} onClick={handleShare}>
      {copied ? 'Ссылка скопирована' : 'Поделиться'}
    </Button>
  );
};
