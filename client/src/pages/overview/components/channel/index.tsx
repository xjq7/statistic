import { Pie } from '@antv/g2plot';
import { getChannel } from '@api/overview';
import { useRequest } from 'ahooks';
import { Card } from 'antd';
import { useEffect } from 'react';

interface Props {
  dateOpen: boolean;
  startAt?: string;
  endAt?: string;
}

export default function Component(props: Props) {
  const { dateOpen, startAt, endAt } = props;

  const { data, refresh } = useRequest(() => {
    return getChannel({ startAt, endAt });
  });

  useEffect(() => {
    if (!dateOpen) refresh();
  }, [dateOpen, refresh]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    let chart: Pie;
    if (data?.length) {
      chart = new Pie('container-channel-stat', {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'label',
        radius: 0.75,
        label: {
          type: 'spider',
          labelHeight: 28,
          content: '{name}\n{percentage}',
        },
        interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
      });

      chart.render();
    }
    return () => {
      chart?.destroy();
    };
  }, [data]);

  return (
    <Card title="渠道统计">
      <div id="container-channel-stat" />
    </Card>
  );
}
