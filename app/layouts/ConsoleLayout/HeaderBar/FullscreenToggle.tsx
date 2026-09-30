import { useState } from 'react';
import { IconFullscreen, IconFullscreenExit } from '@arco-design/web-react/icon';
import { useTranslation } from 'react-i18next';
import screenfull from 'screenfull';
import IconButton from './IconButton';

export default function FullscreenToggle() {
  const { t } = useTranslation();
  const [isFull, setIsFull] = useState(false);

  const toggle = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
      setIsFull((v) => !v);
    }
  };

  return (
    <IconButton
      icon={isFull ? <IconFullscreenExit /> : <IconFullscreen />}
      tooltip={t('common.fullscreen')}
      onClick={toggle}
    />
  );
}
