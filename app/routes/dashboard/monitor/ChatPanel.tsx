import {
  Card,
  Space,
  Select,
  Input,
  Button,
  Typography,
  Spin,
  Result,
} from '@arco-design/web-react';
import { IconDownload, IconFaceSmileFill } from '@arco-design/web-react/icon';
import { useTranslation } from 'react-i18next';
import MessageList from './MessageList';
import styles from './style.module.styl';
import { useChatListQuery } from '~/hooks/api/useMonitor';

/** 实时消息流：10s 轮询拉取 chatList */
export default function ChatPanel() {
  const { t } = useTranslation();
  const { data: messageList = [], isLoading: loading } = useChatListQuery();

  return (
    <Card bordered={false} className={styles['chat-panel']}>
      <div className={styles['chat-panel-header']}>
        <Typography.Title heading={6}>{t('monitor.title.chatPanel')}</Typography.Title>
        <Space size={8}>
          <Select className="w-80px" defaultValue="all">
            <Select.Option value="all">{t('monitor.chat.options.all')}</Select.Option>
          </Select>
          <Input.Search placeholder={t('monitor.chat.placeholder.searchCategory')} />
          <Button type="text" iconOnly>
            <IconDownload />
          </Button>
        </Space>
      </div>
      <div className="flex-1 box-border overflow-y-auto my-[20px]">
        <Spin loading={loading} className="w-full">
          {messageList.length === 0 && !loading ? (
            <Result status="404" />
          ) : (
            <MessageList data={messageList} />
          )}
        </Spin>
      </div>
      <div className={styles['chat-panel-footer']}>
        <Space size={8}>
          <Input suffix={<IconFaceSmileFill />} />
          <Button type="primary">{t('monitor.chat.update')}</Button>
        </Space>
      </div>
    </Card>
  );
}
