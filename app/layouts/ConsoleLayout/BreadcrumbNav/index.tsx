import { Breadcrumb } from '@arco-design/web-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLayoutStore } from '~/store';

function BreadcrumbNav() {
  const { t } = useTranslation();
  let menuTrail = useLayoutStore((s) => s.menuTrail);
  let icon = menuTrail[0]?.icon;

  return (
    <div className="py-[16px]">
      <Breadcrumb>
        {icon && <Breadcrumb.Item key={menuTrail[0]?.name}>{icon}</Breadcrumb.Item>}
        {menuTrail.map(({ name, path }) => (
          <Breadcrumb.Item key={path}>{t(name) || name}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
}

export default memo(BreadcrumbNav);
