import type { Visit } from '@api/overview';
import { Card, Col, Row } from 'antd';
import styles from './index.module.less';

interface Props {
  data?: Visit;
  loading: boolean;
}

function Stat(props: { label: string; value: string }) {
  const { label, value } = props;
  return (
    <div className={styles.stat}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
}

export default function Component(props: Props) {
  const { data, loading } = props;

  const { uv = '-', pv = '-' } = data || {};

  return (
    <Card title="访问数据" loading={loading}>
      <Row justify="center">
        <Col span={8}>
          <Stat label="访问量(pv)" value={String(pv)} />
        </Col>
        <Col span={8}>
          <Stat label="用户量(uv)" value={String(uv)} />
        </Col>
      </Row>
    </Card>
  );
}
