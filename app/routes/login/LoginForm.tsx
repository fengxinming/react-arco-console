import { useRef, useState, useCallback } from 'react';
import { Form, Input, Link, Button, Space, Message } from '@arco-design/web-react';
import { IconLock, IconUser } from '@arco-design/web-react/icon';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useLogin } from '~/hooks/api/useAuth';
import styles from './style.module.styl';
import type { LoginValues } from '~/api/types';

/** 登录表单：账号/密码（必填校验）+ 登录/注册。移植自参考 arco-design-pro。 */
export default function LoginForm() {
  const [form] = Form.useForm<LoginValues>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutateAsync: login } = useLogin();

  // 防重复提交状态：由下方 onSubmitClick 提交锁函数控制，而非依赖 react-query 的 isPending
  const [logging, setLogging] = useState(false);
  const lockedRef = useRef(false);

  const onSubmitClick = useCallback(async () => {
    // 防重复提交：执行中再次点击直接忽略
    if (lockedRef.current) {
      return;
    }
    lockedRef.current = true;
    setLogging(true);
    try {
      let values: LoginValues;
      try {
        values = await form.validate();
      } catch {
        // 校验不通过，arco 已在字段下展示错误
        return;
      }
      // useLogin 内部已 setToken + 预取用户数据
      await login(values);
      Message.success(t('login.success'));
      navigate('/dashboard/workplace');
    } catch (err) {
      form.setFields({
        account: {
          error: new Error(err instanceof Error ? err.message : t('login.form.login.errMsg')),
        },
      });
    } finally {
      lockedRef.current = false;
      setLogging(false);
    }
  }, [form, login, navigate, t]);

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>{t('login.form.title')}</div>
      <div className={styles['login-form-sub-title']}>{t('login.form.subTitle')}</div>
      <Form
        className="mt-[32px]"
        form={form}
        layout="vertical"
        initialValues={{ account: 'admin', password: 'admin' }}
      >
        <Form.Item
          field="account"
          rules={[{ required: true, message: t('login.form.userName.errMsg') }]}
        >
          <Input
            prefix={<IconUser />}
            placeholder={t('login.form.userName.placeholder')}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Form.Item
          field="password"
          rules={[{ required: true, message: t('login.form.password.errMsg') }]}
        >
          <Input.Password
            prefix={<IconLock />}
            placeholder={t('login.form.password.placeholder')}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Space size={16} direction="vertical">
          <div className="flex justify-end">
            <Link>{t('login.form.forgetPassword')}</Link>
          </div>
          <Button type="primary" long onClick={onSubmitClick} loading={logging}>
            {t('login.form.login')}
          </Button>
          <Button
            type="text"
            long
            className={styles['login-form-register-btn']}
            onClick={() => navigate('/register')}
          >
            {t('login.form.register')}
          </Button>
        </Space>
      </Form>
    </div>
  );
}
