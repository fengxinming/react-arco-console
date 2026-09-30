import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { noticeKeys, fetchNotices, markRead, markAllRead } from '~/api/notice';
import type { NoticeItem } from '~/api/types';

export function useNoticesQuery() {
  return useQuery({
    queryKey: noticeKeys.all,
    queryFn: fetchNotices,
    // 消息通知 10s 轮询(顶栏 Notification 常驻挂载,query 始终 active)
    refetchInterval: 10000,
  });
}

/** 标记已读：本地乐观更新缓存，请求失败由 react-query 重试/回滚 */
export function useMarkRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id?: string) => (id ? markRead(id) : markAllRead()),
    onMutate: (id) => {
      qc.setQueryData<NoticeItem[]>(noticeKeys.all, (list) =>
        (list ?? []).map((n) => (!id || n.id === id ? { ...n, read: true } : n)),
      );
    },
  });
}
