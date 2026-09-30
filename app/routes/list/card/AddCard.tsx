import { Card } from '@arco-design/web-react';
import cs from 'classnames';
import { IconPlus } from '@arco-design/web-react/icon';
import type { AddCardProps } from './types';
import styles from './style.module.styl';

export default function AddCard({ description }: AddCardProps) {
  return (
    <Card
      className={cs(styles['card-block'], styles['add-card'])}
      title={null}
      bordered
      size="small"
    >
      <div className={styles.content}>
        <div className="text-[22px]">
          <IconPlus />
        </div>
        <div className={styles.description}>{description}</div>
      </div>
    </Card>
  );
}
