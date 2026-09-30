import { Typography, Result, Button, Link } from '@arco-design/web-react';
import { IconLink } from '@arco-design/web-react/icon';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import styles from './style.module.styl';

export default function ResultError() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div>
      <div className={styles.wrapper}>
        <Result
          className={styles.result}
          status="error"
          title={t('error.result.title')}
          subTitle={t('error.result.subTitle')}
          extra={[
            <Button
              key="back"
              type="secondary"
              style={{ marginRight: 16 }}
              onClick={() => navigate('/dashboard/workplace')}
            >
              {t('error.result.goBack')}
            </Button>,
            <Button key="retry" type="primary" onClick={() => navigate(-1)}>
              {t('error.result.retry')}
            </Button>,
          ]}
        />
        <div className={styles['details-wrapper']}>
          <Typography.Title heading={6} style={{ marginTop: 0 }}>
            {t('error.detailTitle')}
          </Typography.Title>
          <Typography.Paragraph style={{ marginBottom: 0 }}>
            <ol>
              <li>
                {t('error.detailLine.record')}
                <Link>
                  <IconLink />
                  {t('error.detailLine.record.link')}
                </Link>
              </li>
              <li>
                {t('error.detailLine.auth')}
                <Link>{t('error.detailLine.auth.link')}</Link>
              </li>
            </ol>
          </Typography.Paragraph>
        </div>
      </div>
    </div>
  );
}
