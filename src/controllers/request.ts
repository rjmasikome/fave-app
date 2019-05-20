import { Action, RequestOptions, RequestCallback, RequestState } from './type';

export const REQUEST_INITIATED = 'request/REQUEST_INITIATED';
export const REQUEST_COMPLETED = 'request/REQUEST_COMPLETED';

const REQUEST_URL = 'https://www.adidas.co.uk/api/search/suggestions';

const initialState: RequestState = {
  isRequesting: false,
  searchTerm: null,
};

const requestJSON = (options: RequestOptions, callback: RequestCallback) => {

  const { url, body, method} = options;

  if (typeof XMLHttpRequest === 'undefined') {
    return callback('XMLHttpRequest does not exist.');
  }

  const xhr = new XMLHttpRequest();
  xhr.open(method, url);

  xhr.onreadystatechange = (_) => {
    if (xhr.readyState === 4) {

      if (xhr.status === 200 || xhr.status === 201 ||
        xhr.status === 202 || xhr.status === 204
      ) {
        callback(null, {
          headers: {},
          status: xhr.status,
        }, xhr.responseText);

      } else {
        callback('Error: ' + xhr.statusText);
      }
    }
  };

  xhr.send(JSON.stringify(body));
};

export default (state = initialState, action: Action) => {
  switch (action.type) {

    case REQUEST_INITIATED:
      return {
        ...state,
        isRequesting: true,
        searchTerm: action.searchTerm,
      };

    case REQUEST_COMPLETED:
      return {
        ...state,
        isRequesting: false,
        searchTerm: action.searchTerm,
        data: action.data,
      };

    default:
      return state;
  }
};

export const request = (searchTerm: string) => {

  return (dispatch: (action: Action) => void) => {

    dispatch({
      type: REQUEST_INITIATED,
      searchTerm,
    });

    return requestJSON({
      method: 'GET',
      url: `${REQUEST_URL}/${searchTerm}`,
    }, (error, meta, rawResult) => {

      let result = {};

      if (error) {
        console.error('Error in requesting');
      }

      try {
        result = JSON.parse(rawResult);
      } catch (error) {
        console.error('Error in parsing', rawResult);
      }

      dispatch({
        type: REQUEST_COMPLETED,
        searchTerm: 'event',
        data: result,
      });
    });
  };
};
