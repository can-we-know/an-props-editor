import { makeAutoObservable } from 'mobx';

export default class PropsStore {
  public data: Record<any, any>;

  constructor(initState?: Record<string, any>) {
    this.data = initState || {};
    makeAutoObservable(this);
  }

  setData(obj: Record<string, any>) {
    this.data = obj;
  }
}
