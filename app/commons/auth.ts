/**
 * 权限校验工具。
 * 用户权限形如 { 'menu.dashboard.monitor': ['read', 'write'] }，
 * role 为 admin 时对应资源动作为 ['*']（通配，拥有全部权限）。
 */

import type { Per, PerCheck, PermMap } from './types';

export type { PerCheck } from './types';

function judge(actions: string[], perm: string[]) {
  if (!perm || !perm.length) {
    return false;
  }
  if (perm.join('') === '*') {
    return true;
  }
  return actions.every((action) => perm.includes(action));
}

function checkPer(per: Per, userPerm: PermMap) {
  const { resource, actions = [] } = per;
  if (resource instanceof RegExp) {
    const permKeys = Object.keys(userPerm);
    const matched = permKeys.filter((key) => key.match(resource));
    if (!matched.length) {
      return false;
    }
    return matched.every((key) => judge(actions, userPerm[key]));
  }
  return judge(actions, userPerm[resource]);
}

export default function auth(params: PerCheck, userPerm: PermMap) {
  const { per, perAny } = params;
  if (Array.isArray(per) && per.length) {
    let count = 0;
    for (const p of per) {
      if (checkPer(p, userPerm)) {
        count++;
      }
    }
    return perAny ? count > 0 : count === per.length;
  }
  return true;
}
