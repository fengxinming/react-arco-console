import { Avatar, Typography, List, Skeleton } from '@arco-design/web-react';
import { useTeamsQuery } from '~/hooks/api/useUser';
import type { TeamItem } from '~/api/types';
import styles from './style.module.styl';

const { Text } = Typography;

/** 我的团队:头像 + 团队名 + 共X人。自取 /users/teamList。 */
export default function MyTeam() {
  const { data = [], isLoading: loading } = useTeamsQuery();
  const list = data.length ? data : Array.from({ length: 4 }, () => ({}));

  return (
    <List
      className={styles['team-list']}
      bordered={false}
      dataSource={list}
      render={(item: TeamItem, index) => (
        <List.Item key={index}>
          <Skeleton
            loading={loading}
            animation
            text={{ width: ['80%', '20%'], style: { height: '56px' }, rows: 2 }}
            image={{ shape: 'circle' }}
          >
            <List.Item.Meta
              avatar={
                <Avatar size={48}>
                  <img src={item.avatar} alt={item.name} />
                </Avatar>
              }
              title={item.name}
              description={
                <Text type="secondary" className="text-[12px]">
                  {`共${(item.members || 0).toLocaleString()}人`}
                </Text>
              }
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
}
