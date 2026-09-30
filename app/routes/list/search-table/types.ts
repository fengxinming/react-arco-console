export interface SearchFormProps {
  onSearch: (values: Record<string, any>) => void;
}

// getColumns 的 i18n 函数类型
export type T = (key: string) => string;