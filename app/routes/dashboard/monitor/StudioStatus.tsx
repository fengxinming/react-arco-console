import { Card, Typography, Tag, Space, Descriptions } from '@arco-design/web-react';
import { useTranslation } from 'react-i18next';

export default function StudioStatus() {
  const { t } = useTranslation();

  const dataStatus = [
    {
      label: (
        <span>
          <Typography.Text className="pr-[8px]">
            {t('monitor.studioStatus.mainstream')}
          </Typography.Text>
          {t('monitor.studioStatus.bitRate')}
        </span>
      ),
      value: '6 Mbps',
    },
    {
      label: t('monitor.studioStatus.frameRate'),
      value: '60',
    },
    {
      label: (
        <span>
          <Typography.Text className="pr-[8px]">
            {t('monitor.studioStatus.hotStandby')}
          </Typography.Text>
          {t('monitor.studioStatus.bitRate')}
        </span>
      ),
      value: '6 Mbps',
    },
    {
      label: t('monitor.studioStatus.frameRate'),
      value: '60',
    },
    {
      label: (
        <span>
          <Typography.Text className="pr-[8px]">
            {t('monitor.studioStatus.coldStandby')}
          </Typography.Text>
          {t('monitor.studioStatus.bitRate')}
        </span>
      ),
      value: '6 Mbps',
    },
    {
      label: t('monitor.studioStatus.frameRate'),
      value: '60',
    },
  ];

  const dataPicture = [
    { label: t('monitor.studioStatus.line'), value: '热备' },
    { label: 'CDN', value: 'KS' },
    { label: t('monitor.studioStatus.play'), value: 'FLV' },
    { label: t('monitor.studioStatus.pictureQuality'), value: '原画' },
  ];

  return (
    <Card bordered={false}>
      <Space align="start">
        <Typography.Title heading={6}>
          {t('monitor.studioStatus.title.studioStatus')}
        </Typography.Title>
        <Tag color="green">{t('monitor.studioStatus.smooth')}</Tag>
      </Space>
      <Descriptions colon=": " layout="horizontal" data={dataStatus} column={2} />
      <Typography.Title className="mb-[16px]" heading={6}>
        {t('monitor.studioStatus.title.pictureInfo')}
      </Typography.Title>
      <Descriptions colon=": " layout="horizontal" data={dataPicture} column={2} />
    </Card>
  );
}
