import { Result, Button } from '@arco-design/web-react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import styles from './style.module.styl';

export default function Exception403() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <Result
        className={styles.result}
        status="403"
        subTitle={t('exception.result.403.description')}
        extra={
          <Button key="back" type="primary" onClick={() => navigate('/dashboard/workplace')}>
            {t('exception.result.403.back')}
          </Button>
        }
      />
    </div>
  );
}
