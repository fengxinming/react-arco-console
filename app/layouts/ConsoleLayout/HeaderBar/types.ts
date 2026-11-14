export type IconButtonProps = {
  icon: React.ReactNode;
  className?: string;
  onClick?: () => void;
  tooltip?: string;
} & Omit<React.HTMLAttributes<HTMLButtonElement>, 'icon' | 'onClick' | 'className'>;

export interface SearchResult {
  key: string;
  name: string;
  // 从根到叶各级分类的 name（i18n key），用于渲染不可点击的分组标题；顶层叶子为空数组
  groups: string[];
}

export interface SearchGroup {
  // 分组链（i18n key），空数组表示未分组
  groups: string[];
  items: SearchResult[];
}
