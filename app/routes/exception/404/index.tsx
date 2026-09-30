import { Result, Button } from '@arco-design/web-react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import styles from './style.module.styl';

export default function Exception404() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <Result
        className={styles.result}
        status="404"
        subTitle={t('exception.result.404.description')}
        extra={[
          <Button key="retry" className="!mr-[16px]" onClick={() => location.reload()}>
            {t('exception.result.404.retry')}
          </Button>,
          <Button key="back" type="primary" onClick={() => navigate('/dashboard/workplace')}>
            {t('exception.result.404.back')}
          </Button>,
        ]}
      />
    </div>
  );
}
