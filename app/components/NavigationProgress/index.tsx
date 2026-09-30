import { useEffect } from 'react';
import { useNavigation } from 'react-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 只保留顶部细线，去掉右下角转圈
NProgress.configure({ showSpinner: false });

/**
 * 路由导航进度条：路由模块加载 / loader 执行（useNavigation 非 idle）期间显示，
 * 导航完成时收尾。挂在 root，登录页与后台全路由生效。
 * 颜色随主题色（--primary-6 链路），覆盖样式在 app.styl。
 */
export default function NavigationProgress() {
  const active = useNavigation().state !== 'idle';

  useEffect(() => {
    if (active) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [active]);

  return null;
}
