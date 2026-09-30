import { useState } from 'react';
import { Avatar, Upload, Descriptions, Tag, Skeleton, Link } from '@arco-design/web-react';
import { IconCamera, IconPlus } from '@arco-design/web-react/icon';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '~/store';
import type { InfoTextProps } from './types';
import styles from './style.module.styl';

function Text({ loading, children }: InfoTextProps) {
  return (
    <Skeleton loading={loading} text={{ rows: 1 }} animation>
      {children}
    </Skeleton>
  );
}

/** 账号信息头部:可上传头像 + Descriptions(用户名/实名/账号ID/手机号/注册时间)。 */
export default function InfoHeader() {
  const { t } = useTranslation();
  const userInfo = useUserStore((s) => s.user);
  const loading = !userInfo;
  const [avatar, setAvatar] = useState('');

  const avatarSrc = avatar || userInfo?.avatar;

  return (
    <div className="flex">
      <Upload
        showUploadList={false}
        onChange={(_, file) => {
          setAvatar(file.originFile ? URL.createObjectURL(file.originFile) : '');
        }}
      >
        <Skeleton
          loading={loading}
          text={{ rows: 0 }}
          image={{ shape: 'circle', style: { width: 100, height: 100 } }}
          animation
        >
          <Avatar size={100} triggerIcon={<IconCamera />} className={styles['info-avatar']}>
            {avatarSrc ? <img src={avatarSrc} alt="avatar" /> : <IconPlus />}
          </Avatar>
        </Skeleton>
      </Upload>
      <Descriptions
        className={styles['info-content']}
        column={2}
        colon="："
        labelStyle={{ textAlign: 'right' }}
        data={[
          {
            label: t('userSetting.label.name'),
            value: <Text loading={loading}>{userInfo?.name}</Text>,
          },
          {
            label: t('userSetting.label.verified'),
            value: (
              <Text loading={loading}>
                {userInfo?.verified ? (
                  <Tag color="green" className={styles['verified-tag']}>
                    {t('userSetting.value.verified')}
                  </Tag>
                ) : (
                  <Tag color="red" className={styles['verified-tag']}>
                    {t('userSetting.value.notVerified')}
                  </Tag>
                )}
                <Link role="button" className="ml-[12px]">
                  {t('userSetting.btn.edit')}
                </Link>
              </Text>
            ),
          },
          {
            label: t('userSetting.label.accountId'),
            value: <Text loading={loading}>{userInfo?.accountId}</Text>,
          },
          {
            label: t('userSetting.label.phoneNumber'),
            value: (
              <Text loading={loading}>
                {userInfo?.phoneNumber}
                <Link role="button" className="ml-[12px]">
                  {t('userSetting.btn.edit')}
                </Link>
              </Text>
            ),
          },
          {
            label: t('userSetting.label.registrationTime'),
            value: <Text loading={loading}>{userInfo?.registrationTime}</Text>,
          },
        ]}
      />
    </div>
  );
}
