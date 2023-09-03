// @ts-ignore
/* eslint-disable */
import {request} from 'umi';

const baseUrl: string = "http://localhost:8090"

/** addUser POST /api/backend/user/add */
export async function addUserUsingPOST(body: API.UserAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponselong>(baseUrl + '/api/backend/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** throwBusinessException GET /api/backend/user/be */
export async function throwBusinessExceptionUsingGET(options?: { [key: string]: any }) {
  return request<any>(baseUrl + '/api/backend/user/be', {
    method: 'GET',
    ...(options || {}),
  });
}

/** deleteUser POST /api/backend/user/delete */
export async function deleteUserUsingPOST(body: API.IdRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseboolean>(baseUrl + '/api/backend/user/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getUserById POST /api/backend/user/get */
export async function getUserByIdUsingPOST(body: API.IdRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseUserVO>(baseUrl + '/api/backend/user/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getLoginUser GET /api/backend/user/get/login */
export async function getLoginUserUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseUserVO>(baseUrl + '/api/backend/user/get/login', {
    credentials:'include',
    method: 'GET',
    ...(options || {}),
  });
}

/** hello GET /api/backend/user/hello */
export async function helloUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponsestring>(baseUrl + '/api/backend/user/hello', {
    method: 'GET',
    ...(options || {}),
  });
}

/** listUser GET /api/backend/user/list */
export async function listUserUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUserUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListUserVO>(baseUrl + '/api/backend/user/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listUserByPage POST /api/backend/user/list/page */
export async function listUserByPageUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUserByPageUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserVO>(baseUrl + '/api/backend/user/list/page', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** userLogin POST /api/backend/user/login */
export async function userLoginUsingPOST(
  body: API.UserLoginRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUser>(baseUrl + '/api/backend/user/login', {
    method: 'POST',
    credentials:'include',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userLogout GET /api/backend/user/logout */
export async function userLogoutUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseboolean>(baseUrl + '/api/backend/user/logout', {
    method: 'GET',
    ...(options || {}),
  });
}

/** throwRuntimeException GET /api/backend/user/re */
export async function throwRuntimeExceptionUsingGET(options?: { [key: string]: any }) {
  return request<any>(baseUrl + '/api/backend/user/re', {
    method: 'GET',
    ...(options || {}),
  });
}

/** userRegister POST /api/backend/user/register */
export async function userRegisterUsingPOST(
  body: API.UserRegisterRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>(baseUrl + '/api/backend/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateUser POST /api/backend/user/update */
export async function updateUserUsingPOST(
  body: API.UserUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>(baseUrl + '/api/backend/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
