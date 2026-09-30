import request from '~/commons/request';
import type { CardListData } from '~/api/types';

export async function fetchCardList(): Promise<CardListData> {
  return request<CardListData>('/list/card');
}
