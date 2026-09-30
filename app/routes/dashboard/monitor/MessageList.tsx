import { Space, Typography } from '@arco-design/web-react';
import { IconCommand, IconStar } from '@arco-design/web-react/icon';
import classnames from 'classnames';
import styles from './style.module.styl';
import type { ChatMessage } from '~/api/types';

function MessageItem({ data }: { data: ChatMessage }) {
  return (
    <div
      className={classnames({
        [styles['message-item']]: true,
        [styles['message-item-collected']]: data.isCollect,
      })}
    >
      <Space size={4} direction="vertical" className="w-full">
        <Typography.Text type="warning">{data.username}</Typography.Text>
        <Typography.Text>{data.content}</Typography.Text>
        <div className="flex justify-between items-center">
          <div>
            <Typography.Text type="secondary">{data.time}</Typography.Text>
          </div>
          <div className={styles['message-item-actions']}>
            <div className={styles['message-item-actions-item']}>
              <IconCommand />
            </div>
            <div
              className={classnames([
                styles['message-item-actions-item'],
                styles['message-item-actions-collect'],
              ])}
            >
              <IconStar />
            </div>
          </div>
        </div>
      </Space>
    </div>
  );
}

export default function MessageList({ data }: { data: ChatMessage[] }) {
  return (
    <div className="h-full overflow-y-auto">
      {data && data.map((item) => <MessageItem key={item.id} data={item} />)}
    </div>
  );
}
