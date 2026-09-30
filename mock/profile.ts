export default {
  "GET /api/basicProfile": {
    code: 200,
    message: "ok",
    data: {
      status: 2,
      video: {
        mode: "自定义",
        acquisition: {
          resolution: "720*1280",
          frameRate: 15,
        },
        encoding: {
          resolution: "720*1280",
          rate: {
            min: 300,
            max: 800,
            default: 1500,
          },
          frameRate: 15,
          profile: "high",
        },
      },
      audio: {
        mode: "自定义",
        acquisition: {
          channels: 8,
        },
        encoding: {
          channels: 8,
          rate: 128,
          profile: "ACC-LC",
        },
      },
    },
  },
  "GET /api/adjustment": {
    code: 200,
    message: "ok",
    data: [
      {
        contentId: "视频类1234",
        content: "视频参数变更，音频参数变更",
        status: 1,
        updatedTime: "2023-08-01 10:00:00",
      },
      {
        contentId: "音频类5678",
        content: "视频参数变更，音频参数变更",
        status: 0,
        updatedTime: "2023-08-02 14:30:00",
      },
    ],
  },
};
