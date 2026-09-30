import { Message, Select } from '@arco-design/web-react';
import { IconLanguage } from '@arco-design/web-react/icon';
import { useTranslation } from 'react-i18next';
import { Language, useSettingsStore } from '~/store';
import IconButton from './IconButton';

export default function LangSelect() {
  const { t } = useTranslation();
  const language = useSettingsStore((s) => s.lang);
  const setSettings = useSettingsStore((s) => s.setSettings);

  return (
    <Select
      triggerElement={<IconButton icon={<IconLanguage />} />}
      options={[
        { label: '中文', value: 'zh-CN' },
        { label: 'English', value: 'en-US' },
      ]}
      value={language}
      triggerProps={{
        autoAlignPopupWidth: false,
        autoAlignPopupMinWidth: true,
        position: 'br',
      }}
      trigger="hover"
      onChange={(value: Language) => {
        setSettings({ lang: value });
        Message.info(t('settings.language.tip'));
      }}
    />
  );
}
