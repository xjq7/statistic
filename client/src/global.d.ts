import { Dayjs } from 'dayjs';

declare global {
  type AnyAction = PayloadAction;
  type Dispatch = AppDispatch;
  interface Pager {
    page: number;
    pageSize: number;
    total?: number;
  }

  interface Response<T = any> {
    code: number;
    data: T;
    message: string;
  }

  interface DateFilter {
    startAt?: string;
    endAt?: string;
  }
}

declare module 'moment' {
  namespace moment {
    type Moment = Dayjs;
  }
  export = moment;
}
