import { Tabs } from '@arco-design/web-react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useTabsStore } from '~/store';
import styles from './style.module.styl';
import { memo } from 'react';

const TabPane = Tabs.TabPane;

function TabBar() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const tabs = useTabsStore((s) => s.tabs);
  const activeKey = useTabsStore((s) => s.activeKey);
  const removeTab = useTabsStore((s) => s.removeTab);
  const setActive = useTabsStore((s) => s.setActive);

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
