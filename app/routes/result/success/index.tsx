import { Typography, Result, Button, Steps } from '@arco-design/web-react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import styles from './style.module.styl';

const Step = Steps.Step;

export default function ResultSuccess() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div>
      <div className={styles.wrapper}>
        <Result
          className={styles.result}
          status="success"
          title={t('success.result.title')}
          subTitle={t('success.result.subTitle')}
          extra={[
            <Button
              key="print"
              type="secondary"
              style={{ marginRight: 16 }}
              onClick={() => window.print()}
            >
              {t('success.result.printResult')}
            </Button>,
            <Button key="list" type="primary" onClick={() => navigate('/dashboard/workplace')}>
              {t('success.result.projectList')}
            </Button>,
          ]}
        />
        <div className={styles['steps-wrapper']}>
          <Typography.Paragraph bold>{t('success.result.progress')}</Typography.Paragraph>
          <Steps type="dot" current={2}>
            <Step title={t('success.submitApplication')} description="2020/10/10 14:00:39" />
            <Step title={t('success.leaderReview')} description={t('success.processing')} />
            <Step title={t('success.purchaseCertificate')} description={t('success.waiting')} />
            <Step title={t('success.safetyTest')} description={t('success.waiting')} />
            <Step title={t('success.launched')} description={t('success.waiting')} />
          </Steps>
        </div>
      </div>
    </div>
  );
}
