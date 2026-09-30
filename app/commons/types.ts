/** 权限相关类型定义，被 authentication / layout / PermissionWrapper / menu 共用 */

/** 资源权限表：键为资源名（如 'menu.dashboard.monitor'），值为允许的动作列表 */
export type PermMap = Record<string, string[]>;

/** 单条权限要求：指定资源 + 所需动作 */
export interface Per {
  resource: string | RegExp;
  actions?: string[];
}

/** 权限校验参数 */
export interface PerCheck {
  /** 需要满足的权限列表 */
  per?: Per[];
  /** 为 true 时 per 满足其一即可，否则需全部满足 */
  perAny?: boolean;
}
