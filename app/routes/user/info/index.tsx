import { Typography, Grid, Link, Result, Card } from '@arco-design/web-react';
import { useTranslation } from 'react-i18next';
import UserInfoHeader from './UserInfoHeader';
import MyProject from './MyProject';
import MyTeam from './MyTeam';
import LatestNews from './LatestNews';

const { Title } = Typography;
const { Row, Col } = Grid;

export default function UserInfo() {
  const { t } = useTranslation();

  return (
    <>
      <UserInfoHeader />
      <Row gutter={16}>
        <Col span={16}>
          <Card bordered={false} className="mt-[16px]">
            <div className="flex justify-between">
              <Title heading={6}>{t('userInfo.title.project')}</Title>
              <Link>{t('userInfo.btn.more')}</Link>
            </div>
            <MyProject />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false} className="mt-[16px]">
            <div className="flex justify-between">
              <Title heading={6}>{t('userInfo.title.team')}</Title>
            </div>
            <MyTeam />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={16}>
          <Card bordered={false} className="mt-[16px]">
            <div className="flex justify-between">
              <Title heading={6}>{t('userInfo.title.news')}</Title>
              <Link>{t('userInfo.btn.all')}</Link>
            </div>
            <LatestNews />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false} className="mt-[16px]">
            <div className="flex justify-between">
              <Title heading={6}>{t('userInfo.title.notice')}</Title>
            </div>
            <Result
              status="404"
              subTitle={t('userInfo.notice.empty')}
              className="!pt-[60px] !pb-[130px]"
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}
