import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useLayoutStore, useTabsStore } from '~/store';
import { MenuLeaf } from '~/config/types';
import { findMenuTrail } from '~/commons/layout';
import '@arco-design/web-react/es/_util/react-19-adapter';

export default function AppEffects() {
  const setMenuTrail = useLayoutStore((s) => s.setMenuTrail);
  const addTab = useTabsStore((s) => s.addTab);
  const location = useLocation();
  const menus = useLayoutStore((s) => s.permissionMenu);

  // 监听路由变化，统一处理数据
  useEffect(() => {
    const menuTrail = findMenuTrail(location.pathname, menus);

    if (menuTrail.length) {
      const last = menuTrail[menuTrail.length - 1] as MenuLeaf;
      addTab(last.path, last.name);
      setMenuTrail(menuTrail);
    }
  }, [addTab, setMenuTrail, location.pathname, menus]);

  return null;
}
