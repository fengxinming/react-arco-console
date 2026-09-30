// workplace 子组件的 mock 数据接口
// Mock endpoints for workplace sub-components

const year = new Date().getFullYear();
const chartData = Array.from({ length: 12 }, (_, i) => ({
  date: `${year}-${i + 1}`,
  count: Math.floor(20000 + Math.random() * 55000),
}));

const TITLES = [
  "经济日报:财政政策要精准提升效能",
  '"双12"遇冷消费者厌倦了电商平台的促销"套路"',
  '致敬坚守战"疫"一线的社区工作者',
  "普高还是职高?家长们陷入选校难题",
];

const popularList = Array.from({ length: 100 }, (_, i) => ({
  rank: i + 1,
  title: TITLES[i % TITLES.length],
  pv: 500000 - 3200 * (i + 1),
  increase: Number(((Math.random() - 0.5) * 2).toFixed(4)),
}));

export default {
  "GET /api/workplace/overview-content": {
    code: 200,
    message: "ok",
    data: {
      allContents: "373.5w+",
      liveContents: "368",
      increaseComments: "8874",
      growthRate: "2.8%",
      chartData,
    },
  },
  "GET /api/workplace/popular-contents": {
    code: 200,
    message: "ok",
    data: popularList,
  },
  "GET /api/workplace/content-percentage": {
    code: 200,
    message: "ok",
    data: [
      { type: "纯文本", count: 148564, percent: 0.16 },
      { type: "图文类", count: 334271, percent: 0.36 },
      { type: "视频类", count: 445695, percent: 0.48 },
    ],
  },
  "GET /api/workplace/announcement": () => {
    const now = new Date();
    const types = ['activity', 'info', 'notice'];
    const contents = [
      '内容最新优惠活动',
      '新增内容尚未通过审核,详情请点击查看。',
      '当前产品试用期即将结束,如需续费请点击查看。',
      '新系统升级计划通知',
      '新增内容已经通过审核,详情请点击查看。',
    ];
    // 每次请求返回带实时时间戳 key 与随机类型/内容的公告，轮询可见变化（不引入 mockjs）
    const data = Array.from({ length: 5 }, (_, i) => ({
      type: types[Math.floor(Math.random() * types.length)],
      key: `${now.getTime()}-${i + 1}`,
      content: contents[Math.floor(Math.random() * contents.length)],
    }));
    return { code: 200, message: 'ok', data };
  },
};
