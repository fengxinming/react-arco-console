import {
  Input,
  Select,
  Cascader,
  Button,
  Form,
  Space,
  Message,
  Skeleton,
} from '@arco-design/web-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '~/store';
import { useSaveInfo } from '~/hooks/api/useUser';
import type { BasicInfoForm } from './types';

const cascaderOptions = [
  {
    label: '北京市',
    value: 'BeiJing',
    children: [
      {
        label: '北京市',
        value: 'BeiJing',
        children: [
          { label: '海淀区', value: 'HaiDian' },
          { label: '朝阳区', value: 'ChaoYang' },
        ],
      },
    ],
  },
  {
    label: '上海市',
    value: 'ShangHai',
    children: [
      {
        label: '上海市',
        value: 'ShangHai',
        children: [
          { label: '黄浦区', value: 'HuangPu' },
          { label: '静安区', value: 'JingAn' },
        ],
      },
    ],
  },
];

/** 基础信息表单:邮箱/昵称/国家地区/所在地/地址/简介 + 保存/重置。 */
export default function InfoForm() {
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm<BasicInfoForm>();

  const user = useUserStore((s) => s.user);
  const loading = !user;
  const { mutateAsync: saveInfo, isPending: saving } = useSaveInfo();

  // 用户数据到达后回填表单（仅预填 email / 昵称，其余受控于表单自身）
  useEffect(() => {
    if (user) {
      form.setFieldsValue({ email: user.email, nickName: user.name });
    }
  }, [user, form]);

  const handleSave = async () => {
    try {
      const values = await form.validate();
      await saveInfo(values);
      Message.success(t('userSetting.saveSuccess'));
    } catch {
      /* 校验未通过,不提交 */
    }
  };

  const handleReset = () => form.resetFields();

  const loadingNode = (rows = 1) => (
    <Skeleton text={{ rows, width: Array.from({ length: rows }, () => '100%') }} animation />
  );

  const lang = i18n.language;

  return (
    <div className="w-[500px] mt-[6px]">
      <Form
        form={form}
        labelCol={{ span: lang === 'en-US' ? 7 : 6 }}
        wrapperCol={{ span: lang === 'en-US' ? 17 : 18 }}
      >
        <Form.Item
          label={t('userSetting.info.email')}
          field="email"
          rules={[
            {
              type: 'email',
              required: true,
              message: t('userSetting.info.email.placeholder'),
            },
          ]}
        >
          {loading ? (
            loadingNode()
          ) : (
            <Input placeholder={t('userSetting.info.email.placeholder')} />
          )}
        </Form.Item>
        <Form.Item
          label={t('userSetting.info.nickName')}
          field="nickName"
          rules={[{ required: true, message: t('userSetting.info.nickName.placeholder') }]}
        >
          {loading ? (
            loadingNode()
          ) : (
            <Input placeholder={t('userSetting.info.nickName.placeholder')} />
          )}
        </Form.Item>
        <Form.Item
          label={t('userSetting.info.area')}
          field="rangeArea"
          rules={[{ required: true, message: t('userSetting.info.area.placeholder') }]}
        >
          {loading ? (
            loadingNode()
          ) : (
            <Select options={['中国']} placeholder={t('userSetting.info.area.placeholder')} />
          )}
        </Form.Item>
        <Form.Item
          label={t('userSetting.info.location')}
          field="location"
          initialValue={['BeiJing', 'BeiJing', 'HaiDian']}
          rules={[{ required: true }]}
        >
          {loading ? loadingNode() : <Cascader options={cascaderOptions} />}
        </Form.Item>
        <Form.Item label={t('userSetting.info.address')} field="address">
          {loading ? (
            loadingNode()
          ) : (
            <Input placeholder={t('userSetting.info.address.placeholder')} />
          )}
        </Form.Item>
        <Form.Item label={t('userSetting.info.profile')} field="profile">
          {loading ? (
            loadingNode(3)
          ) : (
            <Input.TextArea placeholder={t('userSetting.info.profile.placeholder')} />
          )}
        </Form.Item>
        <Form.Item label=" ">
          <Space>
            <Button type="primary" loading={saving} onClick={handleSave}>
              {t('userSetting.save')}
            </Button>
            <Button onClick={handleReset}>{t('userSetting.reset')}</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
