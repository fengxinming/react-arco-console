import { useMemo } from 'react';
import { Card, Typography, Grid, Statistic, Skeleton } from '@arco-design/web-react';
import { IconUser, IconEdit, IconHeart, IconThumbUp } from '@arco-design/web-react/icon';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigation } from 'react-router';
import { Line } from '@ant-design/charts';
import type { LineConfig } from '@ant-design/charts';
import { useSettingsStore } from '~/store';
import type { MultiDimensionLoaderData } from './types';
import styles from './style.module.styl';

const { Title } = Typography;

const lineColors = ['#722ED1', '#33D1C9', '#F77234', '#165DFF'];

/** 数据概览：四项指标卡 + 折线图，数据由 clientLoader 提供。 */
export default function DataOverview() {
  const { t } = useTranslation();
  const theme = useSettingsStore((s) => s.theme);
  const { overview } = useLoaderData<MultiDimensionLoaderData>();
  const loading = useNavigation().state !== 'idle';
  const overviewValues = overview.overviewData;
  const lineData = overview.chartData;

  const formattedData = useMemo(() => {
    return [
      {
        title: 'multiDAnalysis.dataOverview.contentProduction',
        icon: <IconEdit />,
        value: overviewValues[0],
        background: 'rgb(var(--orange-2))',
        color: 'rgb(var(--orange-6))',
      },
      {
        title: 'multiDAnalysis.dataOverview.contentClicks',
        icon: <IconThumbUp />,
        value: overviewValues[1],
        background: 'rgb(var(--cyan-2))',
        color: 'rgb(var(--cyan-6))',
      },
      {
        title: 'multiDAnalysis.dataOverview.contextExposure',
        icon: <IconHeart />,
        value: overviewValues[2],
        background: 'rgb(var(--arcoblue-1))',
        color: 'rgb(var(--arcoblue-6))',
      },
      {
        title: 'multiDAnalysis.dataOverview.activeUsers',
        icon: <IconUser />,
        value: overviewValues[3],
        background: 'rgb(var(--purple-1))',
        color: 'rgb(var(--purple-6))',
      },
    ];
  }, [overviewValues]);

  const lineSpec: LineConfig = {
    data: lineData,
    xField: 'time',
    yField: 'count',
    colorField: 'name',
    shapeField: 'smooth',
    stack: false,
    scale: {
      color: {
        range: lineColors,
      },
    },
    area: {
      style: {
        fillOpacity: 0.04,
        // fill: 'linear-gradient(-90deg, white 0%, darkgreen 100%)',
      },
    },
    style: {
      lineWidth: 2,
    },
    axis: {
      y: {
        labelFormatter: (v: number) => `${Number(v) / 100} k`,
        // gridStroke: '#cccccc',
        // gridLineWidth: 1,
        // gridStrokeOpacity: 1,
      },
      x: {
        labelAutoRotate: false,
      },
    },
    legend: false,
    // children: lineColors.map((n) => {
    //   return {
    //     type: 'area',
    //     style: {
    //       fill: 'linear-gradient(-90deg, white 0%, ' + n + ' 100%)',
    //     },
    //   };
    // }),
  };

  return (
    <Card bordered={false} className="w-full">
      <Title heading={6}>{t('multiDAnalysis.card.title.dataOverview')}</Title>
      <Grid.Row justify="space-between">
        {formattedData.map((item) => (
          <Grid.Col span={24 / formattedData.length} key={item.title}>
            <Card bordered={false} className={styles['stat-item']}>
              <Title heading={6}>{t(item.title)}</Title>
              <div className={styles.content}>
                <div
                  style={{ backgroundColor: item.background, color: item.color }}
                  className={styles['content-icon']}
                >
                  {item.icon}
                </div>
                <Skeleton
                  loading={loading}
                  animation
                  text={{ rows: 1, className: styles.skeleton }}
                  style={{ width: '120px' }}
                >
                  <Statistic value={item.value ?? 0} groupSeparator />
                </Skeleton>
              </div>
            </Card>
          </Grid.Col>
        ))}
        <Grid.Col span={24}>
          <div className="h-[360px] chart-wrapper">
            <Line {...lineSpec} theme={theme} />
          </div>
        </Grid.Col>
      </Grid.Row>
    </Card>
  );
}
