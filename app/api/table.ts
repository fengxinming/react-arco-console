import request from '~/commons/request';
import type { SearchParams } from './types';

export async function fetchSearch(
  params: SearchParams,
): Promise<{ list: any[]; total: number }> {
  return request<{ list: any[]; total: number }>('/list/search', {
    params: { page: params.page, pageSize: params.pageSize, ...params.formParams },
  });
}
