// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** listTopInvokeInterfaceInfo GET /api/backend/analysis/top/interface/invoke */
export async function listTopInvokeInterfaceInfoUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListInterfaceInfoVO>(
    '/api/backend/analysis/top/interface/invoke',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}
