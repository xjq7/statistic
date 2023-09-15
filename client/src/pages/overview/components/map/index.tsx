import React, { useEffect, useMemo } from 'react';
import { Choropleth } from '@antv/l7plot';
import { Card, Col, Row, Table, Tooltip } from 'antd';
import { ProvinceStat } from '@api/overview';
import { ColumnsType } from 'antd/es/table';
import { QuestionCircleOutlined } from '@ant-design/icons';
import S from './index.module.less';

interface Props {
  style?: React.CSSProperties;
  data?: ProvinceStat[];
}

export default function Map(props: Props) {
  const { style, data: originData } = props;

  const data = useMemo(() => originData?.sort((a, b) => b.value - a.value), [originData]);

  useEffect(() => {
    let chart: Choropleth;
    if (data?.length) {
      chart = new Choropleth('container-map', {
        map: {
          type: 'map',
          center: [120.19382669582967, 30.258134],
          zoom: 3,
          pitch: 0,
        },
        // @ts-ignore
        source: {
          data,
          joinBy: {
            sourceField: 'name',
            geoField: 'name',
          },
        },
        viewLevel: {
          level: 'country',
          adcode: 100000,
        },
        chinaBorder: false,
        autoFit: true,
        color: {
          field: 'value',
          value: ['#B8E1FF', '#7DAAFF', '#3D76DD', '#0047A5', '#001D70'],
          scale: { type: 'quantile' },
        },
        style: {
          opacity: 1,
          stroke: '#ccc',
          lineWidth: 0.3,
          lineOpacity: 1,
        },
        label: {
          visible: false,
          field: 'name',
          style: {
            fill: '#000',
            opacity: 0.8,
            fontSize: 10,
            stroke: '#fff',
            strokeWidth: 1.5,
            textAllowOverlap: false,
            padding: [5, 5],
          },
        },
        state: {
          active: { stroke: '#ccc', lineWidth: 1 },
        },
        tooltip: {
          items: ['name', 'value'],
        },
        zoom: {
          position: 'bottomright',
        },
        legend: {
          position: 'bottomleft',
        },
      });
      chart.setMapStatus({
        dragEnable: false,
        resizeEnable: false,
        showIndoorMap: true,
        keyboardEnable: false,
        doubleClickZoom: false,
        zoomEnable: true,
        rotateEnable: false,
      });
    }

    return () => {
      chart && chart.destroy();
    };
  }, [data]);
  if (!data) return null;

  const columns: ColumnsType<ProvinceStat> = [
    {
      title: '地区',
      dataIndex: 'name',
      align: 'center',
    },
    { title: '用户量', dataIndex: 'value', align: 'center' },
  ];

  return (
    <Row style={style}>
      <Col span={18}>
        <Card
          title="地域分布"
          extra={
            <Tooltip title="help">
              <QuestionCircleOutlined size={30} />
            </Tooltip>
          }
        >
          <div id="container-map" className={S['container-map']} style={{ height: 600 }} />
        </Card>
      </Col>
      <Col span={6}>
        <Card title="用户量排行榜" style={{ marginLeft: 10 }}>
          <Table rowKey="name" dataSource={data} columns={columns} />
        </Card>
      </Col>
    </Row>
  );
}
