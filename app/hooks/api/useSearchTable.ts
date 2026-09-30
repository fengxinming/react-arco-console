import { useQuery } from '@tanstack/react-query';
import { fetchSearch } from '~/api/table';
import type { SearchParams } from '~/api/types';

export const tableKeys = {
  search: (params: SearchParams) =>
    ['search-table', params.page, params.pageSize, params.formParams] as const,
};

export function useSearchQuery(page: number, pageSize: number, formParams: Record<string, any>) {
  return useQuery({
    queryKey: tableKeys.search({ page, pageSize, formParams }),
    queryFn: () => fetchSearch({ page, pageSize, formParams }),
  });
}
