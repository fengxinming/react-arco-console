import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserState } from './types';

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      token: '',
      user: null,
      role: 'user',
      permissions: {},
      setToken(token: string) {
        set({ token });
      },
      setUser(full) {
        set({ user: full.user, role: full.role, permissions: full.permissions });
      },
      setRole(role, permissions) {
        set({ role, permissions });
      },
      logout() {
        set({ token: '', user: null, role: 'user', permissions: {} });
      },
    }),
    {
      name: 'user-store',
      // 只持久化 token；用户资料/角色/权限不落地，刷新靠 token 重新拉取
      partialize: (s) => ({ token: s.token }),
    },
  ),
);
