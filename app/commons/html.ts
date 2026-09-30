import { generate, getRgbStr } from '@arco-design/color';
import i18n from '~/i18n';
import { Language, Theme } from '~/store';

/**
 * 切换主题：给 body 加 arco-theme 属性，让主题即时生效。
 *
 * @param theme
 */
export function setTheme(theme: Theme) {
  document.body.setAttribute('arco-theme', theme);
}

/**
 * 主题色：把当前色生成的 10 个梯度色写入 CSS 变量，让主题色即时生效。
 * 注意：本项目的 @arco-themes/react-console 走的是 --primary-* 链路
 * （组件颜色经 --color-primary-light-N: rgb(var(--primary-N)) 引用），
 * 参考默认的 --arcoblue-* 在本主题下无人使用，写在那里不会生效。
 *
 * @param themeColor
 * @param theme
 */
export function setThemeColor(themeColor: string, theme: Theme) {
  generate(themeColor, { list: true, dark: theme === 'dark' }).forEach((item, index) => {
    document.body.style.setProperty(`--primary-${index + 1}`, getRgbStr(item));
  });
}

/**
 * 色弱模式：对齐参考实现，开启后给 body 加反色滤镜，关闭时还原。
 *
 * @param colorWeak
 */
export function setColorWeak(colorWeak: boolean) {
  document.body.style.filter = colorWeak ? 'invert(80%)' : 'none';
}

/**
 * 切换语言：i18n 实例的 changeLanguage 方法，给 html 元素加 lang 属性。
 *
 * @param lang
 */
export function setLang(lang: Language) {
  i18n.changeLanguage(lang);
  document.documentElement.lang = lang === 'zh-CN' ? 'zh' : 'en';
}
