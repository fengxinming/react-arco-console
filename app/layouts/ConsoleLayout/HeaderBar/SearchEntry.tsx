import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Input, Modal } from '@arco-design/web-react';
import { useTranslation } from 'react-i18next';
import { useLayoutStore } from '~/store';
import type { SearchGroup, SearchResult } from './types';
import styles from './style.module.styl';
import type { MenuBranch, MenuLeaf, MenuRoute } from '~/config/types';

// 搜索索引只收有 view 的叶子：分类节点没有注册路由，不能作为可点击结果。
// groups 记录分类链，供结果列表按树形分组展示。
function flattenLeaves(list: MenuRoute[]): SearchResult[] {
  const out: SearchResult[] = [];
  const walk = (items: MenuRoute[], trail: string[]) => {
    items.forEach((it) => {
      const { children } = it as MenuBranch;
      if (children) {
        walk(children, trail.concat(it.name));
      } else if ((it as MenuLeaf).view) {
        out.push({ key: it.path, name: it.name, groups: trail });
      }
    });
  };
  walk(list, []);
  return out;
}

// 按分类链分组，Map 保持菜单原有顺序。
function groupResults(list: SearchResult[]): SearchGroup[] {
  const map = new Map<string, SearchGroup>();
  list.forEach((r) => {
    const id = r.groups.join('/');
    let group = map.get(id);
    if (!group) {
      group = { groups: r.groups, items: [] };
      map.set(id, group);
    }
    group.items.push(r);
  });
  return Array.from(map.values());
}

// 搜索框 + 搜索弹窗是一体的，统一收进本组件
export default function SearchEntry() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [searchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState('');

  // 数据源与侧栏一致，权限变化后索引自动重建，无权限页面不会出现在结果里。
  const permissionMenu = useLayoutStore((s) => s.permissionMenu);
  const allSearch = useMemo(() => flattenLeaves(permissionMenu), [permissionMenu]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const searchGroups = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    // 命中分类名时列出该分类下的全部叶子，而不是把分类本身当成一条结果。
    const matched = kw
      ? allSearch.filter(
          (r) =>
            t(r.name).toLowerCase().includes(kw) ||
            r.groups.some((name) => t(name).toLowerCase().includes(kw)),
        )
      : allSearch;
    return groupResults(matched);
  }, [keyword, allSearch, t]);

  const goSearch = (key: string) => {
    navigate(key);
    setSearchOpen(false);
    setKeyword('');
  };

  return (
    <>
      <Input.Search
        className={`${styles['search-box']}`}
        placeholder={t('navbar.search.placeholder')}
        allowClear
        onClick={() => setSearchOpen(true)}
        onFocus={() => setSearchOpen(true)}
      />
      <Modal
        title={t('navbar.search.title')}
        visible={searchOpen}
        footer={null}
        onCancel={() => setSearchOpen(false)}
        className="w-[520px]"
      >
        <Input
          allowClear
          autoFocus
          placeholder={t('navbar.search.placeholder')}
          value={keyword}
          onChange={setKeyword}
          className="mb-[12px]"
        />
        <div className="max-h-[320px] overflow-auto">
          {searchGroups.map((g) => (
            <div key={g.groups.join('/') || 'ungrouped'} className={styles['search-section']}>
              {g.groups.length > 0 && (
                <div className={styles['search-group']}>
                  {g.groups.map((name) => t(name)).join(' › ')}
                </div>
              )}
              {g.items.map((r) => (
                <div key={r.key} className={styles['search-item']} onClick={() => goSearch(r.key)}>
                  {t(r.name)}
                </div>
              ))}
            </div>
          ))}
          {searchGroups.length === 0 && (
            <div className={styles['search-empty']}>{t('common.empty')}</div>
          )}
        </div>
      </Modal>
    </>
  );
}
