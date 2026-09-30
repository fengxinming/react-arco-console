import { useMemo, type PropsWithChildren } from 'react';
import { useUserStore } from '~/store';
import auth from '~/commons/auth';
import type { PermissionWrapperProps } from './types';

/**
 * 权限包裹组件。
 * 有权限渲染 children，否则渲染 backup；二者皆无则返回 null。
 */
export default function PermissionWrapper({
  backup,
  per,
  perAny,
  children,
}: PropsWithChildren<PermissionWrapperProps>) {
  const permissions = useUserStore((s) => s.permissions);

  const hasPermission = useMemo(
    () => auth({ per, perAny }, permissions ?? {}),
    [per, perAny, permissions],
  );

  if (hasPermission) {
    return <>{children}</>;
  }
  if (backup) {
    return <>{backup}</>;
  }
  return null;
}
