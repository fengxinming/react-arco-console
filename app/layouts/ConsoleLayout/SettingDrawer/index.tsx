import type { ReactNode } from 'react';
import {
  Alert,
  Divider,
  Drawer,
  InputNumber,
  Message,
  Radio,
  Switch,
} from '@arco-design/web-react';
import { IconSettings } from '@arco-design/web-react/icon';
import { useTranslation } from 'react-i18next';
import type { NavMode } from '~/store/types';
import { useSettingsStore } from '~/store';
import ColorPanel from './ColorPanel';

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between py-[8px]">
      <span className="text-[14px]">{label}</span>
      <span>{children}</span>
    </div>
  );
}

export default function SettingDrawer({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const navbar = useSettingsStore((s) => s.navbar);
  const menu = useSettingsStore((s) => s.menu);
  const footer = useSettingsStore((s) => s.footer);
  const menuWidth = useSettingsStore((s) => s.menuWidth);
  const colorWeak = useSettingsStore((s) => s.colorWeak);
  const navMode = useSettingsStore((s) => s.navMode);

  // 对齐参考：导出与 settings.json 结构完全一致的配置（6 个字段、同 key 顺序），
  // 用户可直接粘回 app/settings.json，让配置真正作用于项目。
  const copyConfig = () => {
    const { colorWeak, navbar, menu, footer, themeColor, menuWidth, navMode } =
      useSettingsStore.getState();
    const config = {
      colorWeak,
      navbar,
      menu,
      footer,
      themeColor,
      menuWidth,
      navMode,
    };
    void navigator.clipboard?.writeText(JSON.stringify(config, null, 2));
    Message.success(t('settings.copySettings.message'));
  };

  return (
    <Drawer
      width={300}
      title={
        <span className="flex items-center gap-[8px]">
          <IconSettings />
          {t('settings.title')}
        </span>
      }
      visible={visible}
      onCancel={onClose}
      okText={t('settings.copySettings')}
      cancelText={t('settings.close')}
      onOk={copyConfig}
    >
      <div className="mb-[16px]">
        <label className="text-[14px] font-medium mb-[8px]">{t('settings.themeColor')}</label>
        <ColorPanel />
        <Divider />
      </div>

      <div className="mb-[16px]">
        <label className="text-[14px] font-medium mb-[8px]">{t('settings.content')}</label>
        <Row label={t('settings.navMode')}>
          <Radio.Group
            type="button"
            size="small"
            value={navMode}
            onChange={(v) => useSettingsStore.setState({ navMode: v as NavMode })}
          >
            <Radio value="inline">{t('settings.navMode.inline')}</Radio>
            <Radio value="horizontal">{t('settings.navMode.horizontal')}</Radio>
          </Radio.Group>
        </Row>
        <Row label={t('settings.navbar')}>
          <Switch
            size="small"
            checked={navbar}
            onChange={(v) => useSettingsStore.setState({ navbar: v })}
          />
        </Row>
        <Row label={t('settings.menu')}>
          <Switch
            size="small"
            checked={menu}
            onChange={(v) => useSettingsStore.setState({ menu: v })}
          />
        </Row>
        <Row label={t('settings.footer')}>
          <Switch
            size="small"
            checked={footer}
            onChange={(v) => useSettingsStore.setState({ footer: v })}
          />
        </Row>
        <Row label={t('settings.menuWidth')}>
          <InputNumber
            className="!w-[80px]"
            size="small"
            value={menuWidth}
            onChange={(v) => v != null && useSettingsStore.setState({ menuWidth: Number(v) })}
          />
        </Row>
        <Divider />
      </div>

      <div className="mb-[16px]">
        <label className="text-[14px] font-medium mb-[8px]">{t('settings.otherSettings')}</label>
        <Row label={t('settings.colorWeak')}>
          <Switch
            size="small"
            checked={colorWeak}
            onChange={(v) => useSettingsStore.setState({ colorWeak: v })}
          />
        </Row>
        <Divider />
      </div>

      <Alert type="info" content={t('settings.alertContent')} className="mt-[8px]" />
    </Drawer>
  );
}
