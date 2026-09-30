import request from '~/commons/request';
import type { LoginValues } from './types';

export async function login(values: LoginValues): Promise<{ token: string }> {
  return request<{ token: string }>('/login', { method: 'POST', data: values });
}

export async function register(values: LoginValues): Promise<{ token: string }> {
  return request<{ token: string }>('/register', { method: 'POST', data: values });
}
