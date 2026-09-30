import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Input, Modal } from '@arco-design/web-react';
import { useTranslation } from 'react-i18next';
import { menuRoutes } from '~/config/menu';
import type { SearchResult } from './types';
import styles from './style.module.styl';
import type { MenuBranch, MenuRoute } from '~/config/types';

function flattenMenu(list: MenuRoute[]): SearchResult[] {
  const out: SearchResult[] = [];
  const walk = (items: MenuRoute[]) => {
    items.forEach((it) => {
      out.push({ key: it.path, name: it.name });
      const { children } = it as MenuBranch;
      if (children) {
        walk(children);
      }
    });
  };
  walk(list);
  return out;
}

// 搜索框 + 搜索弹窗是一体的，统一收进本组件
export default function SearchEntry() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [searchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState('');

  const allSearch = useMemo(() => flattenMenu(menuRoutes), []);

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

  const searchResults = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    if (!kw) {
      return allSearch;
    }
    return allSearch.filter((r) => t(r.name).toLowerCase().includes(kw));
  }, [keyword, allSearch, t]);

  const goSearch = (key: string) => {
    setSearchOpen(false);
    setKeyword('');
    navigate(key);
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
          {searchResults.map((r) => (
            <div key={r.key} className={styles['search-item']} onClick={() => goSearch(r.key)}>
              {t(r.name)}
            </div>
          ))}
          {searchResults.length === 0 && (
            <div className={styles['search-empty']}>{t('common.empty')}</div>
          )}
        </div>
      </Modal>
    </>
  );
}
