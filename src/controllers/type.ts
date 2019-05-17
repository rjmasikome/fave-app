export interface GenericObject {
  [key: string]: any;
}

export interface RequestState {
  isRequesting: boolean;
  searchTerm: string | null;
  data?: GenericObject | string | number | boolean;
}

export interface Action {
  type: string;
  [key: string]: any;
}

export interface RequestOptions {
  method: string;
  url: string;
  body?: GenericObject;
}

export type RequestCallback = (error: Error | string | null, meta?: GenericObject, payload?: any) => void;
