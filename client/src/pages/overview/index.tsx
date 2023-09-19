import { getStat } from '@api/overview';
import { useRequest } from 'ahooks';
import Map from '../overview/components/map';
import Visit from '../overview/components/visit';
import { useMemo, useState } from 'react';
import { Col, Row } from 'antd';
import S from './index.module.less';
import DatePicker from '@components/date-picker';
import dayjs from 'dayjs';
import Device from '../overview/components/device';
import Channel from './components/channel';

const { RangePicker } = DatePicker;

const defaultDate: [dayjs.Dayjs, dayjs.Dayjs] = [dayjs().subtract(1, 'd').startOf('d'), dayjs().endOf('d')];

export default function Overview() {
  const [date, setDate] = useState(defaultDate);

  const { startAt, endAt } = useMemo(() => {
    let startAt;
    let endAt;
    if (Array.isArray(date)) {
      startAt = date[0]?.startOf('d').format('YYYY-MM-DD HH:mm:ss');
      endAt = date[1]?.endOf('d').format('YYYY-MM-DD HH:mm:ss');
    }
    return { startAt, endAt };
  }, [date]);

  const [dateOpen, setDateOpen] = useState(false);

  const {
    data: statData,
    refresh: statRefresh,
    loading: statLoading,
  } = useRequest(() => {
    return getStat({ startAt, endAt });
  });

  const handleDateChange = (values: any) => {
    setDate(values);
  };

  const { province = [], visit } = statData || {};

  return (
    <div className={S.container}>
      <Row justify="space-between" className={S.header}>
        <Col>
          <div className={S.title}></div>
        </Col>
        <Col>
          <RangePicker
            allowEmpty={[true, true]}
            value={date}
            onChange={handleDateChange}
            onOpenChange={(open) => {
              setDateOpen(open);
              if (!open) {
                statRefresh();
              }
            }}
          />
        </Col>
      </Row>
      <Visit data={visit} loading={statLoading} />
      <Map style={{ marginTop: 20 }} data={province} />
      <Device dateOpen={dateOpen} startAt={startAt} endAt={endAt} />
      <Channel dateOpen={dateOpen} startAt={startAt} endAt={endAt} />
    </div>
  );
}
