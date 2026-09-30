import { Line } from '@ant-design/charts';
import { Card, Typography, Spin } from '@arco-design/web-react';
import type { LineConfig } from '@ant-design/charts';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '~/store';
import { useLoaderData, useNavigation } from 'react-router';
import type { DataAnalysisLoaderData } from './types';

const { Title } = Typography;

export default function PeriodLine() {
  const { t } = useTranslation();
  const theme = useSettingsStore((s) => s.theme);
  const { contentPublishing } = useLoaderData<DataAnalysisLoaderData>();
  const loading = useNavigation().state !== 'idle';

  const config: LineConfig = {
    data: contentPublishing,
    xField: 'time',
    yField: 'rate',
    colorField: 'name',
    shapeField: 'smooth',
    scale: { color: { range: ['#21CCFF', '#313CA9', '#249EFF'] } },
    axis: { y: { labelFormatter: (v: number) => `${Number(v)} %` } },
    legend: { color: { position: 'bottom' } },
    slider: {
      x: {
        selectionFill: '#249EFF',
        selectionFillOpacity: 0.3,
      },
    },
  };

  return (
    <Card bordered={false}>
      <Title heading={6}>{t('dataAnalysis.title.publishingTiming')}</Title>
      <Spin loading={loading} block={true} className="w-full">
        <div className="w-full h-[370px]">
          <Line {...config} theme={theme} />
        </div>
      </Spin>
    </Card>
  );
}
