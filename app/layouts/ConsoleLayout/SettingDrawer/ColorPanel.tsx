import { Trigger, Typography } from '@arco-design/web-react';
import { SketchPicker } from 'react-color';
import { generate } from '@arco-design/color';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '~/store';
import styles from './style.module.styl';

export default function ColorPanel() {
  const { t } = useTranslation();
  const themeColor = useSettingsStore((s) => s.themeColor);
  const theme = useSettingsStore((s) => s.theme);

  const list = generate(themeColor, { list: true, dark: theme === 'dark' });

  // 只改状态，CSS 变量由 AdminLayout 统一应用（themeColor / darkMode 变化时同步），
  // 这样抽屉关闭或页面刷新后主题色依然生效，而不是像参考那样"仅临时生效"。
  const applyColor = (color: string) => {
    useSettingsStore.setState({ themeColor: color });
  };

  return (
    <div>
      <Trigger
        trigger="hover"
        position="bl"
        popup={() => (
          <SketchPicker color={themeColor} onChangeComplete={(color) => applyColor(color.hex)} />
        )}
      >
        <div className={styles['color-box']}>
          <div className="w-[100px] h-[24px] mr-[10px]" style={{ backgroundColor: themeColor }} />
          <span>{themeColor}</span>
        </div>
      </Trigger>
      <ul className="flex my-[16px]">
        {list.map((item) => (
          <li key={item} className="flex-1 h-[26px]" style={{ backgroundColor: item }} />
        ))}
      </ul>
      <Typography.Paragraph className="text-[12px]">
        {t('settings.color.tooltip')}
      </Typography.Paragraph>
    </div>
  );
}
