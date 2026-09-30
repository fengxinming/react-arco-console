export type IconButtonProps = {
  icon: React.ReactNode;
  className?: string;
  onClick?: () => void;
  tooltip?: string;
} & Omit<React.HTMLAttributes<HTMLButtonElement>, 'icon' | 'onClick' | 'className'>;

export interface SearchResult {
  key: string;
  name: string;
}
