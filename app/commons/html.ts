import { generate, getRgbStr } from '@arco-design/color';
import i18n from '~/i18n';
import type { Language, Theme } from '~/store/types';

/**
 * 切换主题：给 body 加 arco-theme 属性。
 * Arco 主题包按 body[arco-theme] 切换明暗 CSS 变量；@ant-design/charts 的 tooltip
 * 等 DOM 驱动样式也读这个标记（见 app.styl）。
 * / Switch theme: set body[arco-theme]. The Arco theme package switches light/dark CSS
 * variables by this attribute; DOM-driven styles such as @ant-design/charts tooltips read
 * the same marker (see app.styl).
 */
export function setTheme(theme: Theme) {
  document.body.setAttribute('arco-theme', theme);
}

export function generateColor(
  themeColor: string,
  theme: Theme,
  cb: (propName: string, val: string) => void,
): void {
  generate(themeColor, { list: true, dark: theme === 'dark' }).forEach((item, index) => {
    cb(`--primary-${index + 1}`, getRgbStr(item));
  });
}

/**
 * 主题色：把生成的主色阶写到 body 上的 --primary-N 变量。
 * ConfigProvider 的 cssVar 作用域不覆盖 body 级元素（如 #nprogress），
 * 故在此同步一份供其使用，避免硬编码色值（见 app.styl）。
 * / Theme color: write the generated --primary-N palette onto body. Elements under body
 * (e.g. #nprogress) sit outside the ConfigProvider cssVar scope, so mirror the tokens here
 * instead of hardcoding color values (see app.styl).
 */
export function setThemeColor(themeColor: string, theme: Theme): void {
  generateColor(themeColor, theme, (propName, val) => {
    document.body.style.setProperty(propName, val);
  });
}

/**
 * 色弱模式：给 body 加反色滤镜。
 */
export function setColorWeak(colorWeak: boolean) {
  document.body.style.filter = colorWeak ? 'invert(80%)' : 'none';
}

/**
 * 切换语言：i18n 实例 changeLanguage + html lang 属性。
 */
export function setLang(lang: Language) {
  i18n.changeLanguage(lang);
  document.documentElement.lang = lang === 'zh-CN' ? 'zh' : 'en';
}
