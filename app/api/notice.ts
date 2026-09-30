import request from '~/commons/request';
import type { NoticeItem } from './types';

export const noticeKeys = {
  all: ['notices'] as const,
};

export async function fetchNotices(): Promise<NoticeItem[]> {
  return request<NoticeItem[]>('/message/list');
}

export async function markRead(id: string) {
  return request('/message/read/' + id, { method: 'POST' });
}

export async function markAllRead() {
  return request('/message/read', { method: 'POST' });
}
