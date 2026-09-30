import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Avatar,
  Badge,
  Button,
  Empty,
  List,
  Tabs,
  Tag,
  Trigger,
  Typography,
} from '@arco-design/web-react';
import { IconNotification } from '@arco-design/web-react/icon';
import { useTranslation } from 'react-i18next';
import { useNoticesQuery, useMarkRead } from '~/hooks/api/useNotice';
import IconButton from './IconButton';
import type { NoticeTab } from '~/api/types';
import styles from './style.module.styl';

const TABS: { key: NoticeTab; label: string }[] = [
  { key: 'message', label: 'navbar.notice.message' },
  { key: 'notice', label: 'navbar.notice.notice' },
  { key: 'todo', label: 'navbar.notice.todo' },
];

export default function Notification() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [noticeTab, setNoticeTab] = useState<NoticeTab>('message');
  const { data: notices = [], refetch } = useNoticesQuery();
  const { mutate: markReadMutate } = useMarkRead();

  const unread = notices.filter((n) => !n.read).length;
  const unreadByTab = (tab: NoticeTab) => notices.filter((n) => n.tab === tab && !n.read).length;

  // 标记为已读：本地乐观更新缓存（useMarkRead 内部 onMutate）
  const markAllRead = () => markReadMutate(undefined);
  const markRead = (id: string) => markReadMutate(id);

  const NotificationPopup = () => (
    <div className={styles['notice-panel']}>
      <Tabs type="rounded" activeTab={noticeTab} onChange={(k) => setNoticeTab(k as NoticeTab)}>
        {TABS.map((tab) => {
          const count = unreadByTab(tab.key);
          return (
            <Tabs.TabPane
              key={tab.key}
              title={count > 0 ? `${t(tab.label)} (${count})` : t(tab.label)}
            />
          );
        })}
      </Tabs>
      {notices.filter((n) => n.tab === noticeTab).length === 0 ? (
        <div className={styles['notice-empty']}>
          <Empty description={t('common.empty')} />
        </div>
      ) : (
        <List
          footer={
            <div className="flex">
              <div className={styles['notice-footer-item']}>
                <Button type="text" size="small" onClick={() => void markAllRead()}>
                  {t('navbar.notice.readAll')}
                </Button>
              </div>
              <div className={styles['notice-footer-item']}>
                <Button type="text" size="small" onClick={() => navigate('/dashboard/workplace')}>
                  {t('navbar.notice.more')}
                </Button>
              </div>
            </div>
          }
        >
          {notices
            .filter((n) => n.tab === noticeTab)
            .map((n) => (
              <List.Item key={n.id} actionLayout="vertical" style={{ opacity: n.read ? 0.5 : 1 }}>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    if (!n.read) {
                      markRead(n.id);
                    }
                  }}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar shape="circle" size={36}>
                        {n.avatar ? <img src={n.avatar} alt={n.name} /> : (n.name?.[0] ?? '?')}
                      </Avatar>
                    }
                    title={
                      <div className="flex justify-between items-center">
                        <span>{n.name}</span>
                        {!n.read && <Tag color="arcoblue">{t('navbar.notice.unread')}</Tag>}
                      </div>
                    }
                    description={
                      <div>
                        <div className={styles['notice-content']}>{n.content}</div>
                        <Typography.Text type="secondary" className="text-[12px]">
                          {n.time}
                        </Typography.Text>
                      </div>
                    }
                  />
                </div>
              </List.Item>
            ))}
        </List>
      )}
    </div>
  );

  return (
    <Trigger
      trigger="hover"
      popup={NotificationPopup}
      position="br"
      unmountOnExit={false}
      popupAlign={{ bottom: 4 }}
      onVisibleChange={(v) => {
        if (v) {
          refetch();
        }
      }}
    >
      <Badge count={unread} dot>
        <IconButton icon={<IconNotification />} />
      </Badge>
    </Trigger>
  );
}
