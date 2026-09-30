// @arco-design/color 的发布包不含类型声明（package.json 的 main 指向 ./src/index.js，
// 且没有 types / typings 字段、也没有 .d.ts）。这里按它真实导出的两个方法补一份最小
// 模块声明，避免 tsc 报隐式 any。
declare module "@arco-design/color" {
  /** 根据主题色生成梯度色；list=true 时返回 10 个色值字符串 */
  export function generate(
    color: string,
    options: { list: true; dark?: boolean },
  ): string[];
  export function generate(
    color: string,
    options?: { list?: boolean; dark?: boolean },
  ): string[] | string[][];
  /** 将色值转成 "r, g, b" 形式，用于写入 --arcoblue-* CSS 变量 */
  export function getRgbStr(color: string): string;
}
