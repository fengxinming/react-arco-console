import { List, Typography, Skeleton, Avatar } from '@arco-design/web-react';
import { useNewsQuery } from '~/hooks/api/useUser';
import type { NewsItem } from '~/api/types';
import styles from './style.module.styl';

const { Paragraph } = Typography;

/** 最新动态:头像 + 标题 + 单行省略描述。自取 /user/latestNews。 */
export default function LatestNews() {
  const { data = [], isLoading: loading } = useNewsQuery();
  const list = data.length ? data : Array.from({ length: 4 }, () => ({}));

  return (
    <List
      bordered={false}
      className={styles['news-list']}
      dataSource={list}
      render={(item: NewsItem, index) => (
        <List.Item key={index}>
          <Skeleton
            loading={loading}
            animation
            text={{ width: ['60%', '90%'], rows: 2 }}
            image={{ shape: 'circle' }}
          >
            <List.Item.Meta
              className={styles['list-meta-ellipsis']}
              avatar={
                <Avatar size={48}>
                  <img src={item.avatar} alt="" />
                </Avatar>
              }
              title={item.title}
              description={
                <Paragraph ellipsis={{ rows: 1 }} type="secondary" className="text-[12px] m-0">
                  {item.description}
                </Paragraph>
              }
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
}
