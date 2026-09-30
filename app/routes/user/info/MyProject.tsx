import { Grid, Card, Avatar, Typography, Skeleton } from '@arco-design/web-react';
import { useProjectsQuery } from '~/hooks/api/useUser';
import type { ProjectItem } from '~/api/types';
import type { ProjectCardProps } from './types';
import styles from './style.module.styl';

const { Row, Col } = Grid;
const { Text, Title } = Typography;

function ProjectCard(props: ProjectCardProps) {
  const { loading, contributors, title, enTitle, contributorsLength } = props;

  return (
    <Card className={styles['project-wrapper']} bordered size="small">
      <Skeleton loading={loading} text={{ rows: 1, className: 'h-[20px]' }} animation>
        <Title heading={6}>{title}</Title>
      </Skeleton>

      <Skeleton loading={loading} text={{ rows: 1 }} animation>
        <Text ellipsis className="!m-0">
          {enTitle}
        </Text>
      </Skeleton>

      <div className="mt-[22px]">
        <Skeleton loading={loading} text={{ rows: 1, style: { height: 24 } }} animation>
          <Avatar.Group size={24}>
            {(contributors ?? []).map((item) => (
              <Avatar key={item.avatar}>
                <img src={item.avatar} alt={item.name} />
              </Avatar>
            ))}
          </Avatar.Group>
          <Text type="secondary">等{(contributorsLength ?? 0).toLocaleString()}人</Text>
        </Skeleton>
      </div>
    </Card>
  );
}

export default function MyProject() {
  const { data = [], isLoading: loading } = useProjectsQuery();
  const list = data.length ? data : Array.from({ length: 6 }, () => ({}));

  return (
    <Row gutter={12}>
      {list.map((item: ProjectItem, index) => (
        <Col
          key={item.title}
          span={8}
          className={index > list.length - 4 && index < list.length ? 'mt-[16px]' : undefined}
        >
          <ProjectCard {...item} loading={loading} />
        </Col>
      ))}
    </Row>
  );
}
