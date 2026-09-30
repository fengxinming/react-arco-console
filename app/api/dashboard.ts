import request from '~/commons/request';
import type {
  OverviewData,
  AnnouncementItem,
  PopularItem,
  PercentageItem,
} from '~/api/types';

export const dashboardKeys = {
  announcement: ['dashboard-announcement'] as const,
  popularContents: ['dashboard-popular-contents'] as const,
  contentPercentage: ['dashboard-content-percentage'] as const,
};

export async function fetchOverview(): Promise<OverviewData> {
  return request<OverviewData>('/workplace/overview-content');
}
export async function fetchAnnouncement(): Promise<AnnouncementItem[]> {
  return request<AnnouncementItem[]>('/workplace/announcement');
}
export async function fetchPopularContents(): Promise<PopularItem[]> {
  return request<PopularItem[]>('/workplace/popular-contents');
}
export async function fetchContentPercentage(): Promise<PercentageItem[]> {
  return request<PercentageItem[]>('/workplace/content-percentage');
}
