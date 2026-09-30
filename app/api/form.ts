import request from '~/commons/request';

/** POST /groupForm —— 分组表单提交。 */
export async function submitGroupForm(values: Record<string, unknown>): Promise<void> {
  await request<void>('/groupForm', { method: 'POST', data: values });
}
