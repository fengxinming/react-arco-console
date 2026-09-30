import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '~/store';
import { login, register } from '~/api/auth';
import { fetchUser } from '~/api/user';
import type { LoginValues } from '~/api/types';

function useAuthMutation(mutationFn: (values: LoginValues) => Promise<{ token: string }>) {
  const setToken = useUserStore((s) => s.setToken);
  const setUser = useUserStore((s) => s.setUser);
  return useMutation({
    mutationFn,
    onSuccess: async ({ token }) => {
      setToken(token);
      const full = await fetchUser();
      setUser(full);
    },
  });
}

export function useLogin() {
  return useAuthMutation(login);
}

export function useRegister() {
  return useAuthMutation(register);
}
