import { useState } from 'react';
import { Card, Tabs, Input, Typography, Grid } from '@arco-design/web-react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigation } from 'react-router';
import { fetchCardList } from '~/api/list';
import CardBlock from './CardBlock';
import AddCard from './AddCard';
import type { CardItem } from './types';
import type { CardListData, CardType } from '~/api/types';
import styles from './style.module.styl';

const { Title } = Typography;
const { Row, Col } = Grid;

const defaultList: CardItem[] = Array.from({ length: 10 }, () => ({}));

// 骨架屏占位：模块级常量，保证引用稳定
const DEFAULT_DATA: CardListData = {
  quality: defaultList,
  service: defaultList,
  rules: defaultList,
};

// 无操作查询：clientLoader 直接拉数据并 return，组件用 useLoaderData 读取
export async function clientLoader(): Promise<CardListData> {
  return fetchCardList();
}

export default function CardList() {
  const { t } = useTranslation();
  const data = useLoaderData<CardListData>() ?? DEFAULT_DATA;
  const loading = useNavigation().state !== 'idle';
  const [activeKey, setActiveKey] = useState('all');

  const getCardList = (list: CardItem[], type: CardType) => (
    <Row gutter={24} className="min-h-[180px] w-full">
      {type === 'quality' && (
        <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
          <AddCard description={t('cardList.add.quality')} />
        </Col>
      )}
      {list.map((item) => (
        <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} key={item.id}>
          <CardBlock card={item} type={type} loading={loading} />
        </Col>
      ))}
    </Row>
  );

  return (
    <Card bordered={false}>
      <Title heading={6}>{t('menu.list.cardList')}</Title>
      <Tabs
        activeTab={activeKey}
        type="rounded"
        onChange={setActiveKey}
        extra={
          <Input.Search
            className="!w-[240px]"
            placeholder={t(`cardList.tab.${activeKey}.placeholder`)}
          />
        }
      >
        <Tabs.TabPane key="all" title={t('cardList.tab.title.all')} />
        <Tabs.TabPane key="quality" title={t('cardList.tab.title.quality')} />
        <Tabs.TabPane key="service" title={t('cardList.tab.title.service')} />
        <Tabs.TabPane key="rules" title={t('cardList.tab.title.rules')} />
      </Tabs>
      <div className={styles.container}>
        {activeKey === 'all' ? (
          Object.entries(data).map(([key, list]) => (
            <div key={key}>
              <Title heading={6}>{t(`cardList.tab.title.${key}`)}</Title>
              {getCardList(list, key as CardType)}
            </div>
          ))
        ) : (
          <div className="mt-[30px]">
            {getCardList(data[activeKey as CardType], activeKey as CardType)}
          </div>
        )}
      </div>
    </Card>
  );
}
