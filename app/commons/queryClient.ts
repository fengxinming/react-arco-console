import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000, // 1 秒钟内数据视为新鲜，不重复请求
      gcTime: 5 * 60 * 1000, // 不活跃后保留 5 分钟
      refetchOnWindowFocus: false, // 关掉切窗口自动刷新
      retry: false, // API 失败不自动重试，避免卡顿
    },
    mutations: {
      retry: 0, // mutation 默认不重试
    },
  },
});

export default queryClient;
