export interface AxiosAPIInterface {
  getData(path: string): Promise<any>;

  postData(path: string, data: any): Promise<any>;

  putData(path: string, data: any): Promise<any>;

  patchData(path: string, data: any): Promise<any>;

  deleteData(path: string): Promise<any>
}
