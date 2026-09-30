import { useState } from 'react';
import { Card, Tabs } from '@arco-design/web-react';
import { useTranslation } from 'react-i18next';
import InfoHeader from './InfoHeader';
import InfoForm from './InfoForm';
import Security from './Security';
import Verified from './Verified';

/** 用户设置:头部账号信息 + 圆角 Tabs(基本信息/安全设置/实名认证)。 */
export default function UserSetting() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div>
      <Card bordered={false} className="px-[20px] py-[14px]">
        <InfoHeader />
      </Card>
      <Card bordered={false} className="mt-[16px]">
        <Tabs activeTab={activeTab} onChange={setActiveTab} type="rounded">
          <Tabs.TabPane key="basic" title={t('userSetting.title.basicInfo')}>
            <InfoForm />
          </Tabs.TabPane>
          <Tabs.TabPane key="security" title={t('userSetting.title.security')}>
            <Security />
          </Tabs.TabPane>
          <Tabs.TabPane key="verified" title={t('userSetting.label.verified')}>
            <Verified />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
}
