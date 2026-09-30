import { useState } from 'react';
import cs from 'classnames';
import {
  Button,
  Switch,
  Tag,
  Card,
  Descriptions,
  Typography,
  Dropdown,
  Menu,
  Skeleton,
} from '@arco-design/web-react';
import {
  IconStarFill,
  IconThumbUpFill,
  IconSunFill,
  IconFaceSmileFill,
  IconPenFill,
  IconCheckCircleFill,
  IconCloseCircleFill,
  IconMore,
} from '@arco-design/web-react/icon';
import { useTranslation } from 'react-i18next';
import PermissionWrapper from '~/components/PermissionWrapper';
import type { CardBlockProps } from './types';
import styles from './style.module.styl';

const { Paragraph } = Typography;

const IconList = [
  { key: 'star', Comp: IconStarFill },
  { key: 'thumbUp', Comp: IconThumbUpFill },
  { key: 'sun', Comp: IconSunFill },
  { key: 'smile', Comp: IconFaceSmileFill },
  { key: 'pen', Comp: IconPenFill },
].map(({ key, Comp }) => <Comp key={key} />);

const EMPTY_CARD: CardBlockProps['card'] = {};

export default function CardBlock({
  type,
  card = EMPTY_CARD,
  loading: loadingProp,
}: CardBlockProps) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [statusOverride, setStatusOverride] = useState<0 | 1 | 2 | undefined>(undefined);

  const status = statusOverride ?? card.status;
  const loading = loadingProp || actionLoading;

  const changeStatus = async () => {
    setActionLoading(true);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        setStatusOverride(status === 1 ? 0 : 1);
        resolve();
      }, 1000);
    });
    setActionLoading(false);
  };

  const getTitleIcon = () =>
    type === 'service' && typeof card.icon === 'number' ? (
      <div className={styles.icon}>{IconList[card.icon % IconList.length]}</div>
    ) : null;

  const getButtonGroup = () => {
    if (type === 'quality') {
      return (
        <>
          <PermissionWrapper per={[{ resource: /^menu.list.*/, actions: ['read'] }]}>
            <Button type="primary" className="!ml-[12px]" loading={loading}>
              {t('cardList.options.qualityInspection')}
            </Button>
          </PermissionWrapper>
          <PermissionWrapper per={[{ resource: /^menu.list.*/, actions: ['write'] }]}>
            <Button loading={loading}>{t('cardList.options.remove')}</Button>
          </PermissionWrapper>
        </>
      );
    }

    if (type === 'service') {
      return status === 1 ? (
        <Button loading={loading} onClick={changeStatus}>
          {t('cardList.options.cancel')}
        </Button>
      ) : (
        <Button type="outline" loading={loading} onClick={changeStatus}>
          {status === 0 ? t('cardList.options.subscribe') : t('cardList.options.renewal')}
        </Button>
      );
    }

    return <Switch checked={!!status} loading={loading} onChange={changeStatus} />;
  };

  const getStatus = () => {
    if (type === 'rules' && status) {
      return (
        <Tag color="green" icon={<IconCheckCircleFill />} className="ml-[12px]" size="small">
          {t('cardList.tag.activated')}
        </Tag>
      );
    }
    switch (status) {
      case 1:
        return (
          <Tag color="green" icon={<IconCheckCircleFill />} className="ml-[12px]" size="small">
            {t('cardList.tag.opened')}
          </Tag>
        );
      case 2:
        return (
          <Tag color="red" icon={<IconCloseCircleFill />} className="ml-[12px]" size="small">
            {t('cardList.tag.expired')}
          </Tag>
        );
      default:
        return null;
    }
  };

  const getContent = () => {
    if (loading) {
      return (
        <Skeleton
          text={{ rows: type !== 'quality' ? 3 : 2 }}
          animation
          className={styles['card-block-skeleton']}
        />
      );
    }
    if (type !== 'quality') {
      return <Paragraph>{card.description}</Paragraph>;
    }
    return (
      <Descriptions
        column={2}
        data={[
          { label: t('cardList.quality.qualityCount'), value: card.qualityCount },
          { label: t('cardList.quality.duration'), value: `${card.duration}s` },
          { label: t('cardList.quality.randomCount'), value: card.randomCount },
        ]}
      />
    );
  };

  return (
    <Card
      bordered
      className={cs(styles['card-block'], styles[`${type}-card`])}
      size="small"
      title={
        loading ? (
          <Skeleton
            animation
            text={{ rows: 1, width: ['100%'] }}
            style={{ width: '120px', height: '24px' }}
            className={styles['card-block-skeleton']}
          />
        ) : (
          <>
            <div
              className={cs(styles.title, {
                [styles['title-more']]: visible,
              })}
            >
              {getTitleIcon()}
              {card.title}
              {getStatus()}
              <Dropdown
                droplist={
                  <Menu>
                    {[t('cardList.dropdown.operation1'), t('cardList.dropdown.operation2')].map(
                      (item) => (
                        <Menu.Item key={item}>{item}</Menu.Item>
                      ),
                    )}
                  </Menu>
                }
                trigger="click"
                onVisibleChange={setVisible}
                popupVisible={visible}
              >
                <div className={styles.more}>
                  <IconMore />
                </div>
              </Dropdown>
            </div>
            <div className={styles.time}>{card.time}</div>
          </>
        )
      }
    >
      <div className={styles.content}>{getContent()}</div>
      <div className="flex flex-row-reverse">{getButtonGroup()}</div>
    </Card>
  );
}
