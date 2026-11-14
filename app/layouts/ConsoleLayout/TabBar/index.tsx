import { Tabs } from '@arco-design/web-react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import styles from './style.module.styl';
import { memo } from 'react';
import { useLayoutStore } from '~/store';

const TabPane = Tabs.TabPane;

function TabBar() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const tabs = useLayoutStore((s) => s.tabs);
  const activeKey = useLayoutStore((s) => s.activeKey);
  const removeTab = useLayoutStore((s) => s.removeTab);
  const setActive = useLayoutStore((s) => s.setActive);

  return (
    <div className={styles.tabbar}>
      <Tabs
        type="card-gutter"
        size="small"
        editable
        showAddButton={false}
        activeTab={activeKey}
        onChange={(key) => setActive(key) && navigate(key)}
        onDeleteTab={(key) => {
          const nextKey = removeTab(key);
          if (nextKey) {
            navigate(nextKey);
          }
        }}
      >
        {tabs.map((tab) => (
          <TabPane
            key={tab.key}
            title={t(tab.title) ?? tab.title}
            closable={tab.closable !== false}
          />
        ))}
      </Tabs>
    </div>
  );
}

export default memo(TabBar);
