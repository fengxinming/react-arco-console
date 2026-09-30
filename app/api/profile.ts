import request from '~/commons/request';
import type { BasicProfileData, AdjustmentItem } from './types';

/** GET /basicProfile —— 基础详情页的当前/原始配置数据。 */
export async function fetchBasicProfile(): Promise<BasicProfileData> {
  return request<BasicProfileData>('/basicProfile');
}

/** GET /adjustment —— 调整记录列表。 */
export async function fetchAdjustment(): Promise<AdjustmentItem[]> {
  return request<AdjustmentItem[]>('/adjustment');
}
