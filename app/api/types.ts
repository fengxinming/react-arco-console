// 所有 API 数据契约（请求 / 响应形状）集中定义，供 app/api/* 与路由组件共享。
// 路由 UI 类型（组件 props、表单形状等）仍留在各自 routes/*/types.ts，不在此文件。

// ---- user/setting ----
export interface SaveUserInfoPayload {
  email?: string;
  nickName?: string;
  rangeArea?: string;
  location?: string[];
  address?: string;
  profile?: string;
}

export interface VerifiedInfo {
  accountType?: string;
  isVerified?: boolean;
  verifiedTime?: string;
  legalPersonName?: string;
  certificateType?: string;
  certificationNumber?: string;
  enterpriseName?: string;
  enterpriseCertificateType?: string;
  organizationCode?: string;
}

export interface AuthRecord {
  authType?: string;
  authContent?: string;
  authStatus?: number;
  createdTime?: string;
}

// ---- user/info ----
export interface Contributor {
  name?: string;
  email?: string;
  avatar?: string;
}

export interface ProjectItem {
  id?: number;
  title?: string;
  enTitle?: string;
  contributors?: Contributor[];
  contributorsLength?: number;
}

export interface TeamItem {
  avatar?: string;
  name?: string;
  members?: number;
}

export interface NewsItem {
  id?: number;
  title?: string;
  description?: string;
  avatar?: string;
}

// ---- 通用指标卡片（visualization/data-analysis + multi-dimension 共用）----
export interface MetricCardItem {
  name: string;
  title?: string;
  chartType: string;
  count?: number;
  increment?: boolean;
  diff?: number;
  chartData?: Array<{ x: number; y: number; name?: string }>;
  compareTime?: string;
  loading?: boolean;
}

// ---- visualization/data-analysis ----
export interface OverviewItem extends MetricCardItem {
  title: string;
  chartType: 'line' | 'interval' | 'pie';
}

export interface ContentPublishingItem {
  name: string;
  time: string;
  count: number;
  rate: number;
}

export interface AuthorItem {
  id: number;
  author: string;
  time: string;
  contentCount: number;
  clickCount: number;
}

export type ChartPoint = { x: number; y: number; name?: string };

// ---- visualization/multi-dimension ----
export interface MultiDimensionOverview {
  overviewData: number[];
  chartData: Array<{ time: string; count: number; name: string }>;
}

export interface ActivityItem {
  name: string;
  count: number;
}

export interface PolarData {
  list: Array<Record<string, string | number>>;
  fields: string[];
}

export type CardBlockData = MetricCardItem;

export interface ContentSourceItem {
  type: string;
  value: number;
  name: string;
  category: string;
}

// ---- list/card ----
export interface QualityInspection {
  id?: number;
  title?: string;
  time?: string;
  qualityCount?: number;
  randomCount?: number;
  duration?: number;
}

export interface BasicCard {
  id?: number;
  icon?: number;
  status?: 0 | 1 | 2;
  description?: string;
}

export type CardType = 'quality' | 'service' | 'rules';

export interface CardListData {
  quality: QualityInspection[];
  service: BasicCard[];
  rules: BasicCard[];
}

// ---- list/search-table ----
export interface RowData {
  id: string;
  name: string;
  contentType: number;
  filterType: number;
  count: number;
  createdTime: number;
  status: number;
}

export interface SearchResult {
  list: RowData[];
  total: number;
}

export interface SearchParams {
  page: number;
  pageSize: number;
  formParams: Record<string, any>;
}

// ---- dashboard/workplace ----
export interface PopularItem {
  rank: number;
  title: string;
  pv: number;
  increase: number;
}

export interface OverviewData {
  allContents?: string;
  liveContents?: string;
  increaseComments?: string;
  growthRate?: string;
  chartData?: { count?: number; date?: string }[];
}

export interface PercentageItem {
  type: string;
  count: number;
  percent: number;
}

export interface AnnouncementItem {
  type: string;
  key: string;
  content: string;
}

// ---- dashboard/monitor ----
export interface ChatMessage {
  id: number;
  username: string;
  content: string;
  time: string;
  isCollect: boolean;
}

// ---- profile/basic ----
export interface VideoParams {
  mode?: string;
  acquisition?: { resolution?: string; frameRate?: number | string };
  encoding?: {
    resolution?: string;
    rate?: { min?: number; max?: number; default?: number };
    frameRate?: number | string;
    profile?: string;
  };
}

export interface AudioParams {
  mode?: string;
  acquisition?: { channels?: number | string };
  encoding?: { channels?: number | string; rate?: number | string; profile?: string };
}

export interface BasicProfileData {
  status?: number;
  video?: VideoParams;
  audio?: AudioParams;
}

export interface AdjustmentItem {
  contentId: string;
  content: string;
  status: number;
  updatedTime: string;
}

// ---- auth ----
export interface LoginValues {
  account: string;
  password: string;
}

// ---- notice（顶栏消息中心）----
export type NoticeTab = 'message' | 'notice' | 'todo';

export interface NoticeItem {
  id: string;
  tab: NoticeTab;
  name: string;
  content: string;
  time: string;
  read: boolean;
  avatar?: string;
}
