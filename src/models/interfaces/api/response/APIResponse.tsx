export default interface APIResponse<T> {
  status: number;
  code: number;
  message: string;
  data?: T;
}
