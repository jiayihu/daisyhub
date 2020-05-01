export function request<T>(resource: string, options?: RequestInit): Promise<T> {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  console.log(BASE_URL);
  return fetch(`${BASE_URL}/${resource}`, {
    mode: 'cors',
    ...options,
  }).then(response => {
    if (!response.ok) throw new Error(response.statusText);

    const contentType = response.headers.get('content-type');

    if (!contentType || !contentType.includes('application/json')) return null;

    return response.json().then(response => {
      if (response.status !== 'success') throw response.error;

      return response.data;
    });
  });
}
