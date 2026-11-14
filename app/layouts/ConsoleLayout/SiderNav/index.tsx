import { Layout } from '@arco-design/web-react';
import { IconLeft } from '@arco-design/web-react/icon';
import cs from 'classnames';
import { useSettingsStore, useLayoutStore } from '~/store';
import AppMenu from '~/components/AppMenu';
import type { MenuRoute } from '~/config/types';
import { memo, useEffect, useState } from 'react';
import styles from './style.module.styl';

const { Sider } = Layout;

function toOpenKeys(menuTrail: MenuRoute[], lastKeys: string[]): string[] {
  const keys: string[] = [];
  for (let i = 0, len = menuTrail.length - 1; i < len; i++) {
    const { name } = menuTrail[i];
    if (!lastKeys.includes(name)) {
      keys.push(name);
    }
  }
  return lastKeys.concat(keys);
}

function SiderNav() {
  const menuWidth = useSettingsStore((s) => s.menuWidth);
  const collapsed = useLayoutStore((s) => s.collapsed);
  const toggleCollapsed = useLayoutStore((s) => s.toggleCollapsed);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const menuTrail = useLayoutStore((s) => s.menuTrail);
  const actualWidth = collapsed ? 48 : menuWidth;

  useEffect(() => {
    if (menuTrail.length > 0) {
      Promise.resolve().then(() => {
        setOpenKeys((keys) => toOpenKeys(menuTrail, keys));
      });
    }
  }, [menuTrail]);

  return (
    <Sider
      className={styles['layout-sider']}
      width={actualWidth}
      collapsed={collapsed}
      onCollapse={toggleCollapsed}
      trigger={null}
      collapsible
      breakpoint="xl"
    >
      <div className={styles['menu-wrapper']}>
        <AppMenu
          mode="vertical"
          collapse={collapsed}
          openKeys={openKeys}
          onOpenKeysChange={setOpenKeys}
        />
      </div>
      <div
        className={cs(styles['collapse-btn'], {
          [styles['is-collapsed']]: collapsed,
        })}
        onClick={toggleCollapsed}
      >
        <IconLeft />
      </div>
    </Sider>
  );
}

export default memo(SiderNav);
