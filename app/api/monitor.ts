import request from '~/commons/request';
import type { ChatMessage } from './types';

export const monitorKeys = {
  chatList: ['monitor-chat-list'] as const,
};

export async function fetchChatList(): Promise<ChatMessage[]> {
  return request<ChatMessage[]>('/chatList');
}
