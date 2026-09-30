import { Button, Card, Radio, Tabs, Table, Tag, Typography } from '@arco-design/web-react';
import { useTranslation } from 'react-i18next';

const COVER_IMG =
  'http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c788fc704d32cf3b1136c7d45afc2669.png~tplv-uwbnlip3yd-webp.webp';

const DATA = [
  {
    cover: COVER_IMG,
    name: '视频直播',
    duration: '00:05:19',
    id: '54e23ade',
    status: -1,
  },
];

export default function DataStatistic() {
  const { t } = useTranslation();

  const columns = [
    {
      title: t('monitor.list.title.order'),
      render: (_col: unknown, _record: unknown, index: number) => <span>{index + 1}</span>,
    },
    {
      title: t('monitor.list.title.cover'),
      dataIndex: 'cover',
      render: (_col: unknown, record: (typeof DATA)[0]) => (
        <div className="relative h-[68px]">
          <img className="h-full" src={record.cover} alt="cover" />
          {record.status === -1 && (
            <Tag color="red" className="absolute top-[6px] left-[6px]">
              {t('monitor.list.tag.auditFailed')}
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: t('monitor.list.title.name'),
      dataIndex: 'name',
    },
    {
      dataIndex: 'duration',
      title: t('monitor.list.title.duration'),
    },
    {
      dataIndex: 'id',
      title: t('monitor.list.title.id'),
    },
  ];

  return (
    <Card>
      <Tabs defaultActiveTab="liveMethod">
        <Tabs.TabPane key="liveMethod" title={t('monitor.tab.title.liveMethod')} />
        <Tabs.TabPane key="onlineUsers" title={t('monitor.tab.title.onlineUsers')} />
      </Tabs>
      <div className="py-[20px]">
        <Radio.Group defaultValue="3" type="button">
          <Radio value="1">{t('monitor.liveMethod.normal')}</Radio>
          <Radio value="2">{t('monitor.liveMethod.flowControl')}</Radio>
          <Radio value="3">{t('monitor.liveMethod.video')}</Radio>
          <Radio value="4">{t('monitor.liveMethod.web')}</Radio>
        </Radio.Group>

        <div>
          <div className="flex justify-between mt-[16px]">
            <Button type="text">{t('monitor.editCarousel')}</Button>
            <Button disabled>{t('monitor.startCarousel')}</Button>
          </div>
          <div className="mt-[16px]">
            <Table
              columns={columns}
              data={DATA}
              rowKey="id"
              rowSelection={{ type: 'checkbox' }}
              border={false}
              pagination={false}
            />
            <Typography.Text type="secondary" className="block mt-[16px] text-center">
              {t('monitor.list.tip.rotations')}
              {DATA.length}
              {t('monitor.list.tip.rest')}
            </Typography.Text>
          </div>
        </div>
      </div>
    </Card>
  );
}
