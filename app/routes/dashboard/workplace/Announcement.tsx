import { useQuery } from '@tanstack/react-query';
import { Link, Card, Skeleton, Tag, Typography } from '@arco-design/web-react';
import { useTranslation } from 'react-i18next';
import styles from './style.module.styl';
import { fetchAnnouncement, dashboardKeys } from '~/api/dashboard';

function getTagColor(type: string) {
  switch (type) {
    case 'activity':
      return 'orangered';
    case 'info':
      return 'cyan';
    case 'notice':
      return 'arcoblue';
    default:
      return 'arcoblue';
  }
}

/** 公告：10s 轮询拉取 announcement */
export default function Announcement() {
  const { t } = useTranslation();
  const { data = [], isLoading: loading } = useQuery({
    queryKey: dashboardKeys.announcement,
    queryFn: fetchAnnouncement,
    refetchInterval: 10000,
  });

  return (
    <Card bordered={false}>
      <div className="flex justify-between">
        <Typography.Title heading={6}>{t('workplace.announcement')}</Typography.Title>
        <Link>{t('workplace.seeMore')}</Link>
      </div>
      <Skeleton loading={loading} text={{ rows: 5, width: '100%' }} animation>
        <div>
          {data.map((d) => (
            <div key={d.key} className={styles['announcement-item']}>
              <Tag color={getTagColor(d.type)} size="small">
                {t(`workplace.${d.type}`)}
              </Tag>
              <span className={styles['announcement-text']}>{d.content}</span>
            </div>
          ))}
        </div>
      </Skeleton>
    </Card>
  );
}
