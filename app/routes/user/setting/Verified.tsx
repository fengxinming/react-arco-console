import {
  Descriptions,
  Table,
  Typography,
  Skeleton,
  Tag,
  Space,
  Button,
  Badge,
} from '@arco-design/web-react';
import { useTranslation } from 'react-i18next';
import { useEnterpriseQuery, useAuthListQuery } from '~/hooks/api/useUser';
import type { VerifiedInfo, AuthRecord } from '~/api/types';
import styles from './style.module.styl';

const DEFAULT_ENTERPRISE: VerifiedInfo = {
  accountType: '',
  isVerified: true,
  verifiedTime: '',
  legalPersonName: '',
  certificateType: '',
  certificationNumber: '',
  enterpriseName: '',
  enterpriseCertificateType: '',
  organizationCode: '',
};

/** 实名认证:企业信息 Descriptions + 认证记录 Table。自取 verified/enterprise、verified/authList。 */
export default function Verified() {
  const { t } = useTranslation();
  const { data: enterprise = DEFAULT_ENTERPRISE, isLoading: loading } = useEnterpriseQuery();
  const { data: tableData = [], isLoading: tableLoading } = useAuthListQuery();

  const loadingNode = <Skeleton text={{ rows: 1 }} animation />;

  return (
    <div className={styles['verified']}>
      <Typography.Title heading={6}>{t('userSetting.verified.enterprise')}</Typography.Title>
      <Descriptions
        className={styles['verified-enterprise']}
        labelStyle={{ textAlign: 'right' }}
        layout="inline-horizontal"
        colon="："
        column={3}
        data={Object.entries(enterprise).map(([key, value]) => ({
          label: t(`userSetting.verified.label.${key}`),
          value: loading ? (
            loadingNode
          ) : typeof value === 'boolean' ? (
            value ? (
              <Tag color="green">{t('userSetting.value.verified')}</Tag>
            ) : (
              <Tag color="red">{t('userSetting.value.notVerified')}</Tag>
            )
          ) : (
            (value as string)
          ),
        }))}
      />
      <Typography.Title heading={6}>{t('userSetting.verified.records')}</Typography.Title>
      <Table<AuthRecord>
        rowKey="createdTime"
        columns={[
          {
            title: t('userSetting.verified.authType'),
            dataIndex: 'authType',
          },
          {
            title: t('userSetting.verified.authContent'),
            dataIndex: 'authContent',
          },
          {
            title: t('userSetting.verified.authStatus'),
            dataIndex: 'authStatus',
            render: (val) =>
              val ? (
                <Badge status="success" text={t('userSetting.verified.status.success')} />
              ) : (
                <Badge status="processing" text={t('userSetting.verified.status.waiting')} />
              ),
          },
          {
            title: t('userSetting.verified.createdTime'),
            dataIndex: 'createdTime',
          },
          {
            title: t('userSetting.verified.operation'),
            headerCellStyle: { paddingLeft: '15px' },
            render: (_, record) =>
              record.authStatus ? (
                <Button type="text">{t('userSetting.verified.operation.view')}</Button>
              ) : (
                <Space>
                  <Button type="text">{t('userSetting.verified.operation.view')}</Button>
                  <Button type="text">{t('userSetting.verified.operation.revoke')}</Button>
                </Space>
              ),
          },
        ]}
        data={tableData}
        loading={tableLoading}
        pagination={false}
      />
    </div>
  );
}
