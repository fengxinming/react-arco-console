import { useState, useMemo } from 'react';
import { Table, Card, PaginationProps, Button, Space, Typography } from '@arco-design/web-react';
import { IconDownload, IconPlus } from '@arco-design/web-react/icon';
import { useTranslation } from 'react-i18next';
import PermissionWrapper from '~/components/PermissionWrapper';
import SearchForm from './SearchForm';
import { getColumns } from './constants';
import { useSearchQuery } from '~/hooks/api/useSearchTable';
import type { SearchResult } from '~/api/types';

const { Title } = Typography;

// 空结果占位：模块级常量，保证引用稳定
const EMPTY_RESULT: SearchResult = { list: [], total: 0 };

export default function SearchTable() {
  const { t } = useTranslation();

  const tableCallback = (_record: Record<string, any>, _type: string) => {
    // 预留：查看 / 编辑等行操作的回调入口
  };

  const columns = useMemo(() => getColumns(t, tableCallback), [t]);

  const [pagination, setPagination] = useState<PaginationProps>({
    sizeCanChange: true,
    showTotal: true,
    pageSize: 10,
    current: 1,
    pageSizeChangeResetCurrent: true,
  });
  const [formParams, setFormParams] = useState<Record<string, any>>({});

  const { current = 1, pageSize = 10 } = pagination;

  // 分页 / 筛选条件变化时自动重新拉取（queryKey 带参，参数变化即重取）
  const { data = EMPTY_RESULT, isLoading: loading } = useSearchQuery(
    current,
    pageSize,
    formParams,
  );

  function onChangeTable(pagination: PaginationProps) {
    const { current = 1, pageSize = 10 } = pagination;
    setPagination((p) => ({ ...p, current, pageSize }));
  }

  function handleSearch(params: Record<string, any>) {
    setPagination((p) => ({ ...p, current: 1 }));
    setFormParams(params);
  }

  return (
    <Card bordered={false}>
      <Title heading={6}>{t('menu.list.searchTable')}</Title>
      <SearchForm onSearch={handleSearch} />
      <PermissionWrapper per={[{ resource: 'menu.list.searchTable', actions: ['write'] }]}>
        <div className="flex justify-between mb-[20px]">
          <Space>
            <Button type="primary" icon={<IconPlus />}>
              {t('searchTable.operations.add')}
            </Button>
            <Button>{t('searchTable.operations.upload')}</Button>
          </Space>
          <Space>
            <Button icon={<IconDownload />}>{t('searchTable.operation.download')}</Button>
          </Space>
        </div>
      </PermissionWrapper>
      <Table
        rowKey="id"
        loading={loading}
        onChange={onChangeTable}
        pagination={{ ...pagination, total: data.total }}
        columns={columns}
        data={data.list}
      />
    </Card>
  );
}
