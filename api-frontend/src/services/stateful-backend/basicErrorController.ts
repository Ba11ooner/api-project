// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** errorHtml GET /api/backend/error */
export async function errorHtmlUsingGET(options?: { [key: string]: any }) {
  return request<API.ModelAndView>('/api/backend/error', {
    method: 'GET',
    ...(options || {}),
  });
}

/** errorHtml PUT /api/backend/error */
export async function errorHtmlUsingPUT(options?: { [key: string]: any }) {
  return request<API.ModelAndView>('/api/backend/error', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** errorHtml POST /api/backend/error */
export async function errorHtmlUsingPOST(options?: { [key: string]: any }) {
  return request<API.ModelAndView>('/api/backend/error', {
    method: 'POST',
    ...(options || {}),
  });
}

/** errorHtml DELETE /api/backend/error */
export async function errorHtmlUsingDELETE(options?: { [key: string]: any }) {
  return request<API.ModelAndView>('/api/backend/error', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** errorHtml PATCH /api/backend/error */
export async function errorHtmlUsingPATCH(options?: { [key: string]: any }) {
  return request<API.ModelAndView>('/api/backend/error', {
    method: 'PATCH',
    ...(options || {}),
  });
}
