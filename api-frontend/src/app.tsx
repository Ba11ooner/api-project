import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import {BookOutlined, LinkOutlined} from '@ant-design/icons';
import type {Settings as LayoutSettings} from '@ant-design/pro-components';
import {PageLoading, SettingDrawer} from '@ant-design/pro-components';
import type {RunTimeLayoutConfig} from 'umi';
import {history, Link} from 'umi';
import defaultSettings from '../config/defaultSettings';
import {getLoginUserUsingGET} from "@/services/stateful-backend/userController";

//判断是否为开发环境
const isDev = process.env.NODE_ENV === 'development';

//TODO 放行页面配置（无需登录也能跳转到的页面）
const loginPath = '/user/login';
const register = '/user/register'
const forget = '/user/forget'
const paths = [loginPath, register, forget]

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading/>,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  //页面配置
  settings?: Partial<LayoutSettings>;
  //当前用户信息
  currentUser?: API.CurrentUser;
  loading?: boolean;
  //获取用户信息
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  //获取用户信息
  const fetchUserInfo = async () => {
    console.log("app:fetchUserInfo")
    try {
      // 更改为后端获取用户信息的方法
      // 为了复用 Ant Design Pro CurrentUser 的机制，此处要进行数据类型转换
      // 将后台获取到的信息包装成 API.CurrentUser 类型
      console.log("app:getLoginUserUsingGET")
      const msg = await getLoginUserUsingGET();
      console.log(msg)
      //后端正常响应
      if (msg.code === 200) {
        const res: API.CurrentUser = {
          name: msg.data?.userAccount,
          userid: msg.data?.id?.toString(),
          access: msg.data?.userRole,
        };
        //判断通过后端获取到的用户态是否为空，若为空，则返回 undefined
        if (res.name === undefined
          || res.userid === undefined
          || res.access === undefined) {
          return undefined
        }
        //若不为空，则返回用户态信息
        return res;
      } else {
        //后端响应异常，直接返回 undefined
        return undefined;
      }
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };

  // 如果不是直接放行的页面，先尝试获取用户信息
  if (!paths.includes(history.location.pathname)) {
    //获取用户信息
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  //如果是放行的页面，无需获取用户信息
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({initialState, setInitialState}) => {
  return {
    rightContentRender: () => <RightContent/>,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer/>,
    onPageChange: () => {
      const {location} = history;
      console.log("onPageChange:")
      console.log(initialState?.currentUser);
      // 如果没有用户态信息，重定向到 login
      // 如果不是放行页面，重定向到 login
      if (!initialState?.currentUser && !paths.includes(location.pathname)) {
        console.log(initialState?.currentUser);
        history.push(loginPath);
      }
    },
    //如果是 dev 环境，显示以下内容
    links: isDev
      ? [
        <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
          <LinkOutlined/>
          <span>OpenAPI 文档</span>
        </Link>,
        <Link to="/~docs" key="docs">
          <BookOutlined/>
          <span>业务组件文档</span>
        </Link>,
      ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态

    //@ts-ignore
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
