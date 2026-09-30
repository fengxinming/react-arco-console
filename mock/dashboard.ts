export default {
  'GET /api/chatList': () => {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    const time = `${hh}:${mm}:${ss}`;
    const pool = [
      '马上就开始了，好激动！',
      '今天的直播内容很期待',
      '主播很专业，学到了很多',
      '画面质量很清晰',
      '互动环节很有趣',
      '这个观点很有启发',
      '已经分享给朋友了',
      '期待下一场直播',
    ];
    const users = [
      '用户7352772',
      '用户7352773',
      '用户7352774',
      '用户7352775',
      '用户7352776',
    ];
    // 每次请求返回带实时时间戳与随机内容/收藏态的消息，轮询可见变化（不引入 mockjs）
    const data = users.map((username, i) => ({
      id: `${now.getTime()}-${i}`,
      username,
      content: pool[Math.floor(Math.random() * pool.length)],
      time,
      isCollect: Math.random() > 0.5,
    }));
    return { code: 200, message: 'ok', data };
  },
};
