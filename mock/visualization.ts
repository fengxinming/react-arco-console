// ===== data-analysis mock =====

const mockLine = (name: string) => {
  return Array.from({length: 12}, ()=> 0).map((_, i) => ({
    x: i,
    y: Math.floor(Math.random() * 80) + 20,
    name,
  }));
};

const mockPie = () => {
  const names = ["纯文本", "图文类", "视频类"];
  return names.map((name) => ({ name, count: Math.floor(Math.random() * 80) + 20 }));
};

const getTimeLine = (name: string) => {
  return Array.from({length: 12}, ()=> 0).map((_, i) => {
    const time = i * 2;
    return {
      name,
      time: time < 9 ? `0${time}:00` : `${time}:00`,
      count: Math.floor(Math.random() * 4000) + 1000,
      rate: Math.floor(Math.random() * 100),
    };
  });
};

const authors = ["用魔法打败魔法", "王多鱼", "Christopher", "叫我小李好了", "陈皮话梅糖", "碳烤小肥羊"];

// ===== multi-dimension mock =====

const mdLegend = ["活跃用户数", "内容生产量", "内容点击量", "内容曝光量"];
const mdCount = [0, 600, 1000, 2000, 4000];
const mdCategory = ["纯文本", "图文类", "视频类"];

const getMdLineData = (name: string, index: number) => {
  return Array.from({length: 10}, ()=> 0).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return {
      time: `${mm}-${dd}`,
      count: Math.floor(Math.random() * (mdCount[index + 1] - mdCount[index])) + mdCount[index],
      name,
    };
  });
};

const mockMdLine = (name: string) => {
  return Array.from({length: 12}, ()=> 0).map((_, i) => ({
    x: i,
    y: Math.floor(Math.random() * 9000) + 1000,
    name,
  }));
};

const getContentSource = (name: string) => {
  const typeList = ["UGC原创", "国外网站", "转载文章", "行业报告", "其他"];
  const result = typeList.map((type) => ({
    type,
    value: Math.floor(Math.random() * 9900) + 100,
    name,
  }));
  const total = result.reduce((a, b) => a + b.value, 0);
  return result.map((item) => ({ ...item, value: Number((item.value / total).toFixed(2)) }));
};

export default {
  // ---- data-analysis ----
  "GET /api/data-analysis/overview": async (req: any) => {
    const type = req.query?.type as string;
    return {
      code: 200,
      message: "ok",
      data: {
        count: Math.floor(Math.random() * 9000) + 1000,
        increment: Math.random() > 0.5,
        diff: Math.floor(Math.random() * 900) + 100,
        chartType: type,
        chartData:
          type === "pie" ? mockPie() : type === "line" ? [...mockLine("类目1"), ...mockLine("类目2")] : mockLine("类目1"),
      },
    };
  },
  "GET /api/data-analysis/content-publishing": async () => ({
    code: 200,
    message: "ok",
    data: [...getTimeLine("纯文本"), ...getTimeLine("视频类"), ...getTimeLine("图文类")],
  }),
  "GET /api/data-analysis/author-list": async () => ({
    code: 200,
    message: "ok",
    data: {
      list: Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        author: authors[i % authors.length],
        time: `${String(i * 2).padStart(2, "0")}:00`,
        contentCount: Math.floor(Math.random() * 4000) + 1000,
        clickCount: Math.floor(Math.random() * 25000) + 5000,
      })),
    },
  }),

  // ---- multi-dimension ----
  "GET /api/multi-dimension/overview": async () => {
    const overviewData = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10000));
    let list: any[] = [];
    mdLegend.forEach((name, i) => { list = list.concat(getMdLineData(name, i)); });
    return { code: 200, message: "ok", data: { overviewData, chartData: list } };
  },
  "GET /api/multi-dimension/activity": async () => ({
    code: 200,
    message: "ok",
    data: [
      { name: "分享量", count: Math.floor(Math.random() * 9000) + 1000 },
      { name: "评论量", count: Math.floor(Math.random() * 9000) + 1000 },
      { name: "点赞量", count: Math.floor(Math.random() * 9000) + 1000 },
    ],
  }),
  "GET /api/multi-dimension/polar": async () => {
    const items = ["国际", "娱乐", "体育", "财经", "科技", "其他"];
    return {
      code: 200,
      message: "ok",
      data: {
        list: items.map((item) => {
          const row: Record<string, number | string> = { item };
          mdCategory.forEach((c) => { row[c] = Math.floor(Math.random() * 100); });
          return row;
        }),
        fields: mdCategory,
      },
    };
  },
  "GET /api/multi-dimension/card": async (req: any) => {
    const type = req.query?.type as string;
    return {
      code: 200,
      message: "ok",
      data: {
        count: Math.floor(Math.random() * 9000) + 1000,
        increment: Math.random() > 0.5,
        diff: Math.floor(Math.random() * 900) + 100,
        chartType: type,
        chartData: mockMdLine("类目1"),
      },
    };
  },
  "GET /api/multi-dimension/content-source": async () => ({
    code: 200,
    message: "ok",
    data: mdCategory.flatMap((name) => getContentSource(name).map((item) => ({ ...item, category: name }))),
  }),
};
