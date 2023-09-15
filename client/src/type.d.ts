interface Pager {
  page: number;
  pageSize: number;
  total?: number;
}

interface ResponseList<T> {
  total: number;
  list: T[];
}
