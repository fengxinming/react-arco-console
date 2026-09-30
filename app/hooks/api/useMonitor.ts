import { useQuery } from '@tanstack/react-query';
import { fetchChatList, monitorKeys } from '~/api/monitor';

/** 实时消息流：10s 轮询拉取 chatList（监控页常驻挂载，query 始终 active） */
export function useChatListQuery() {
  return useQuery({
    queryKey: monitorKeys.chatList,
    queryFn: fetchChatList,
    refetchInterval: 10000,
  });
}
