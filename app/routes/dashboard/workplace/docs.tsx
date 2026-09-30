import { Link, Card, Typography } from '@arco-design/web-react';
import { useTranslation } from 'react-i18next';
import styles from './style.module.styl';

const links: Record<string, string> = {
  react: 'https://arco.design/react/docs/start',
  vue: 'https://arco.design/vue/docs/start',
  designLab: 'https://arco.design/themes',
  materialMarket: 'https://arco.design/material/',
};

export default function Docs() {
  const { t } = useTranslation();

  return (
    <Card bordered={false}>
      <div className="flex justify-between">
        <Typography.Title heading={6}>{t('workplace.docs')}</Typography.Title>
        <Link>{t('workplace.seeMore')}</Link>
      </div>
      <div className={styles.docs}>
        {Object.entries(links).map(([key, href]) => (
          <Link key={key} className={styles['doc-link']} href={href} target="_blank">
            {t(`workplace.${key}`)}
          </Link>
        ))}
      </div>
    </Card>
  );
}
