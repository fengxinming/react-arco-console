import { useNavigate } from 'react-router';
import { Avatar, Dropdown, Menu, Message } from '@arco-design/web-react';
import { IconMore, IconPoweroff, IconSettings, IconUser } from '@arco-design/web-react/icon';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '~/store';
import { useSwitchRole } from '~/hooks/api/useUser';
import styles from './style.module.styl';

export default function UserMenu() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = useUserStore((s) => s.user);
  const { mutateAsync: switchRole } = useSwitchRole();
  const logout = useUserStore((s) => s.logout);

  const droplist = (
    <Menu
      onClickMenuItem={async (k) => {
        if (k === 'logout') {
          logout();
          navigate('/login');
        } else if (k === 'info') {
          navigate('/user/info');
        } else if (k === 'setting') {
          navigate('/user/setting');
        } else if (k === 'role-admin') {
          await switchRole('admin');
          Message.info(t('user.role.tip'));
        } else if (k === 'role-user') {
          await switchRole('user');
          Message.info(t('user.role.tip'));
        } else {
          navigate(k);
        }
      }}
    >
      <Menu.Item key="info">
        <IconUser className={styles['dropdown-icon']} />
        {t('menu.user.info')}
      </Menu.Item>
      <Menu.Item key="setting">
        <IconSettings className={styles['dropdown-icon']} />
        {t('menu.user.setting')}
      </Menu.Item>
      <Menu.SubMenu
        key="role"
        title={
          <span>
            <IconUser className={styles['dropdown-icon']} />
            {t('user.role')}
          </span>
        }
      >
        <Menu.Item key="role-admin">{t('user.role.admin')}</Menu.Item>
        <Menu.Item key="role-user">{t('user.role.user')}</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu
        key="more"
        title={
          <span>
            <IconMore className={styles['dropdown-icon']} />
            {t('user.more')}
          </span>
        }
      >
        <Menu.Item key="/dashboard/workplace">{t('menu.dashboard.workplace')}</Menu.Item>
        <Menu.Item key="/list/card">{t('menu.list.cardList')}</Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="logout">
        <IconPoweroff className={styles['dropdown-icon']} />
        {t('common.logout')}
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown droplist={droplist} position="br">
      <Avatar size={32} className="cursor-pointer">
        {user?.name?.[0] ?? 'A'}
      </Avatar>
    </Dropdown>
  );
}
