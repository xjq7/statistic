import { Pie } from '@antv/g2plot';
import { useRequest } from 'ahooks';
import { Card, Select } from 'antd';
import { Dimension, getDevice } from '@api/overview';
import { useEffect, useState } from 'react';

interface Props {
  dateOpen: boolean;
  startAt?: string;
  endAt?: string;
}

function Device(props: Props) {
  const { dateOpen, startAt, endAt } = props;

  const [type, setType] = useState<Dimension>(Dimension.os);

  const { data, refresh } = useRequest(() => {
    return getDevice({ startAt, endAt, type });
  });

  useEffect(() => {
    if (!dateOpen) refresh();
  }, [dateOpen, refresh]);

  useEffect(() => {
    refresh();
  }, [refresh, type]);

  useEffect(() => {
    let chart: Pie;
    if (data?.length) {
      chart = new Pie('container-device-stat', {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'label',
        radius: 0.75,
        label: {
          type: 'spider',
          labelHeight: 28,
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
    <Card
      title="设备统计"
      extra={
        <Select
          style={{ width: 120 }}
          placeholder="维度"
          value={type}
          options={[
            {
              value: Dimension.os,
              label: 'os',
            },
            {
              value: Dimension.browser,
              label: 'browser',
            },
            {
              value: Dimension.engine,
              label: 'engine',
            },
          ]}
          onChange={(value) => {
            setType(value);
          }}
        >
          aa
        </Select>
      }
    >
      <div id="container-device-stat" />
    </Card>
  );
}

export default Device;
