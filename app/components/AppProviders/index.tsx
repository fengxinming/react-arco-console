import { QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from '@arco-design/web-react';
import zhCN from '@arco-design/web-react/es/locale/zh-CN';
import enUS from '@arco-design/web-react/es/locale/en-US';
import { useSettingsStore } from '~/store';
import queryClient from '~/commons/queryClient';
import { AppProvidersProps } from './types';

const LOCALES = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

export default function AppProviders({ children }: AppProvidersProps) {
  const themeColor = useSettingsStore((s) => s.themeColor);
  const language = useSettingsStore((s) => s.lang);

  return (
    <ConfigProvider
      locale={LOCALES[language] ?? (zhCN as unknown)}
      theme={{ primaryColor: themeColor }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ConfigProvider>
  );
}
