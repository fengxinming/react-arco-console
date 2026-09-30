import { Form, Input, Button, Card, Typography, Space } from '@arco-design/web-react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Message } from '@arco-design/web-react';
import { useRegister } from '~/hooks/api/useAuth';
import type { LoginValues } from '~/api/types';

const { Title } = Typography;

export default function Register() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutateAsync: register, isPending: registering } = useRegister();
  const [form] = Form.useForm();

  const onSubmit = async (values: LoginValues) => {
    try {
      // useRegister 内部已 setToken + 预取用户数据
      await register(values);
      Message.success(t('login.success'));
      navigate('/dashboard/workplace');
    } catch {
      /* 注册失败，arco 已在字段下展示错误 */
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'var(--color-bg-1)',
      }}
    >
      <Card style={{ width: 380 }}>
        <Title heading={4} style={{ textAlign: 'center' }}>
          {t('login.toRegister')}
        </Title>
        <Form form={form} layout="vertical" onSubmit={onSubmit} size="large">
          <Form.Item label={t('login.account')} field="account" rules={[{ required: true }]}>
            <Input placeholder="admin" />
          </Form.Item>
          <Form.Item label={t('login.password')} field="password" rules={[{ required: true }]}>
            <Input.Password placeholder="admin" />
          </Form.Item>
          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <Button type="text" onClick={() => navigate('/login')}>
                {t('login.submit')}
              </Button>
            </Space>
          </Form.Item>
          <Button type="primary" long htmlType="submit" loading={registering}>
            {t('login.toRegister')}
          </Button>
        </Form>
      </Card>
    </div>
  );
}
