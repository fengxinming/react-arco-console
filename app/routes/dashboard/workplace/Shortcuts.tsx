import { Card, Divider, Message, Typography, Link } from '@arco-design/web-react';
import {
  IconFile,
  IconStorage,
  IconSettings,
  IconMobile,
  IconFire,
} from '@arco-design/web-react/icon';
import { useTranslation } from 'react-i18next';
import styles from './style.module.styl';

export default function Shortcuts() {
  const { t } = useTranslation();

  const shortcuts = [
    { title: t('workplace.contentMgmt'), key: 'Content Management', icon: <IconFile /> },
    { title: t('workplace.contentStatistic'), key: 'Content Statistic', icon: <IconStorage /> },
    { title: t('workplace.advancedMgmt'), key: 'Advanced Management', icon: <IconSettings /> },
    { title: t('workplace.onlinePromotion'), key: 'Online Promotion', icon: <IconMobile /> },
    { title: t('workplace.marketing'), key: 'Marketing', icon: <IconFire /> },
  ];

  const recentShortcuts = [
    { title: t('workplace.contentStatistic'), key: 'Content Statistic', icon: <IconStorage /> },
    { title: t('workplace.contentMgmt'), key: 'Content Management', icon: <IconFile /> },
    { title: t('workplace.advancedMgmt'), key: 'Advanced Management', icon: <IconSettings /> },
  ];

  function onClickShortcut(key: string) {
    Message.info({ content: `You clicked ${key}` });
  }

  return (
    <Card bordered={false}>
      <div className="flex justify-between">
        <Typography.Title heading={6}>{t('workplace.shortcuts')}</Typography.Title>
        <Link>{t('workplace.seeMore')}</Link>
      </div>
      <div className={styles['shortcut-list']}>
        {shortcuts.map((s) => (
          <div
            key={s.key}
            className={styles['shortcut-item']}
            onClick={() => onClickShortcut(s.key)}
          >
            <div className={styles['shortcut-icon']}>{s.icon}</div>
            <div className={styles['shortcut-title']}>{s.title}</div>
          </div>
        ))}
      </div>
      <Divider />
      <Typography.Title heading={6}>{t('workplace.recent')}</Typography.Title>
      <div className={styles['shortcut-list']}>
        {recentShortcuts.map((s) => (
          <div
            key={s.key}
            className={styles['shortcut-item']}
            onClick={() => onClickShortcut(s.key)}
          >
            <div className={styles['shortcut-icon']}>{s.icon}</div>
            <div className={styles['shortcut-title']}>{s.title}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
