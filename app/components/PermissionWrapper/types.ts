import type { ReactNode } from 'react';
import type { PerCheck } from '~/commons/auth';

export type PermissionWrapperProps = PerCheck & {
  // 无权限时的兜底渲染，缺省则不渲染任何内容
  backup?: ReactNode;
};
