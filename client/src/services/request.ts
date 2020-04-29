export type RestError = {
  code: 'BadArgument' | 'InvalidJSON';
  message: string;
  details?: Array<RestError>;
};

export function request<T>(resource: string, options?: RequestInit): Promise<T> {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  return fetch(`${BASE_URL}/${resource}`, {
    mode: 'cors',
    ...options,
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.status !== 'success') {
        throw response.error;
      }

      return response.data;
    });
}
