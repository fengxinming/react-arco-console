import { Card, Steps, Typography, Grid, Space, Button, Table, Badge } from '@arco-design/web-react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigation } from 'react-router';
import { fetchBasicProfile, fetchAdjustment } from '~/api/profile';
import type { AdjustmentItem } from '~/api/types';
import ProfileItem from './ProfileItem';
import type { ProfileLoaderData } from './types';
import styles from './style.module.styl';

export async function clientLoader(): Promise<ProfileLoaderData> {
  const [data, preData, tableData] = await Promise.all([
    fetchBasicProfile(),
    fetchBasicProfile(),
    fetchAdjustment(),
  ]);
  return { data, preData, tableData };
}

const { Title } = Typography;
const { Row, Col } = Grid;

export default function ProfileBasic() {
  const { t } = useTranslation();
  const { data, preData, tableData } = useLoaderData<ProfileLoaderData>();
  const pending = useNavigation().state !== 'idle';

  return (
    <div className={styles.container}>
      <Card>
        <Row justify="space-between" align="center">
          <Col span={16}>
            <Title heading={6}>{t('basicProfile.title.form')}</Title>
          </Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            <Space>
              <Button>{t('basicProfile.cancel')}</Button>
              <Button type="primary">{t('basicProfile.goBack')}</Button>
            </Space>
          </Col>
        </Row>

        <Steps current={data.status} lineless className={styles.steps}>
          <Steps.Step title={t('basicProfile.steps.commit')} />
          <Steps.Step title={t('basicProfile.steps.approval')} />
          <Steps.Step title={t('basicProfile.steps.finish')} />
        </Steps>
      </Card>

      <ProfileItem data={data} type="current" loading={pending} />
      <ProfileItem data={preData} type="origin" loading={pending} />

      <Card>
        <Title heading={6}>{t('basicProfile.adjustment.record')}</Title>
        <Table
          loading={pending}
          data={tableData}
          columns={[
            {
              dataIndex: 'contentId',
              title: t('basicProfile.adjustment.contentId'),
            },
            {
              dataIndex: 'content',
              title: t('basicProfile.adjustment.content'),
            },
            {
              dataIndex: 'status',
              title: t('basicProfile.adjustment.status'),
              render: (record: AdjustmentItem) =>
                record.status ? (
                  <Badge status="success" text={t('basicProfile.adjustment.success')} />
                ) : (
                  <Badge status="processing" text={t('basicProfile.adjustment.waiting')} />
                ),
            },
            {
              dataIndex: 'updatedTime',
              title: t('basicProfile.adjustment.updatedTime'),
            },
            {
              title: t('basicProfile.adjustment.operation'),
              headerCellStyle: { paddingLeft: '15px' },
              render: () => (
                <Button type="text">{t('basicProfile.adjustment.operation.view')}</Button>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
}
