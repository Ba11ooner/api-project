//TODO 修改引入的方法
import {
  addInterfaceInfoUsingPOST as add,
  updateInterfaceInfoUsingPOST as update,
  deleteInterfaceInfoUsingPOST as remove,
  listInterfaceInfoUsingGET as list
} from "@/services/stateful-backend/interfaceInfoController";

import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import {Button, Drawer, message} from 'antd';
import React, {useRef, useState} from 'react';

//增
const handleAdd = async (fields: API.InterfaceInfoAddRequest) => {
  console.log("handleAdd")
  console.log(fields)
  const hide = message.loading('正在添加');
  try {
    await add({
      ...fields,
    });
    hide();
    message.success('新建接口成功');
    return true;
  } catch (error) {
    hide();
    message.error('新建接口失败，请重试');
    return false;
  }
};

//删
const handleRemove = async (selectedRows: API.IdRequest[]) => {
  console.log("handleRemove")
  console.log(selectedRows)
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    for (const row of selectedRows) {
      await remove(row);
    }
    hide();
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

//改
const handleUpdate = async (fields: API.InterfaceInfoUpdateRequest) => {
  console.log("handleUpdate")
  console.log(fields)
  const hide = message.loading('更新中');
  try {
    await update(fields);
    hide();
    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    message.error('更新失败，请重试');
    return false;
  }
};

//查
const getList = async () => {
  console.log("getList")
  const msg = await list({});
  console.log(msg)
  return {
    data: msg.data,
    total: msg.data?.length,
    success: true
  };
}

const TableList: React.FC = () => {

  //add 表单弹窗状态（显示 or 不显示）控制
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);

  //update 表单弹窗状态（显示 or 不显示）控制
  const [updateModalVisible, handleModalVisibleForUpdate] = useState<boolean>(false);

  //use 表单弹窗状态（显示 or 不显示）控制
  const [useModalVisible, handleModalVisibleForUse] = useState<boolean>(false);

  //detail 抽屉状态（显示 or 不显示）控制
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();

  //行选取状态控制
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfoVO>();
  const [selectedRowsState, setSelectedRows] = useState<API.InterfaceInfoVO[]>([]);

  //例属性配置
  //TODO 配置列属性
  const columns: ProColumns<API.InterfaceInfoVO>[] = [
    {
      title: '接口',
      dataIndex: 'id',
      tip: 'The id is the unique key',
      search: false,
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },

    {
      title: '接口名称',
      dataIndex: 'name',
      //自动缩略
      ellipsis: true,
      search: false,
      render: (dom) => {
        return (
          <>{dom}</>
        );
      },
    },

    {
      title: '接口状态',
      dataIndex: 'status',
      search: false,
      render: (dom) => [
        <>
          {dom === 1 ? "在线" : "离线"}
        </>
      ],
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            //设置当前行为选中的记录
            setCurrentRow(record);
            //打开弹窗
            handleModalVisibleForUpdate(true);
          }}
        >
          修改接口信息
        </a>,
        <a
          key="use"
          onClick={() => {
            //设置当前行为选中的记录
            setCurrentRow(record);
            //打开弹窗
            handleModalVisibleForUse(true);
          }}
        >
          调用接口服务
        </a>,

      ],
    },
  ];


  // @ts-ignore
  return (
    <PageContainer>
      {/* 查询结果表格 */}
      <ProTable
        <API.InterfaceInfoVO, API.PageParams>

        //基础配置
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="id"
        search={{labelWidth: 120,}}

        //工具栏渲染器
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined/> 新建
          </Button>,
        ]}

        //数据请求
        //使用前端自带的分页机制，此处获取所有数据即可
        request={async () => {
          const res = await getList();
          return {data: res.data, success: res.success, total: res.total}
        }}

        //列属性配置
        columns={columns}

        //行选择器
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />

      {/*批量删除工具栏*/}
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>已选择{' '}
              <a style={{fontWeight: 600,}}>
                {selectedRowsState.length}
              </a>{' '} 项 &nbsp;&nbsp;
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}

      {/* add 表单 */}
      <ModalForm
        //基础配置
        title={'新建接口信息'}
        width="400px"

        //状态监听（是否显示）
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}

        //确定按钮事件绑定
        onFinish={async (value) => {
          const success = await handleAdd(value as API.InterfaceInfoAddRequest);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }

        }
      >
        <ProFormText
          placeholder='请输入 id'
          rules={[
            {
              required: true,
              message: 'id 为必填项',
            },
          ]}
          width="md"
          name="id"
        />
        <ProFormText
          placeholder='请输入接口文本'
          rules={[
            {
              required: true,
              message: '接口文本为必填项',
            },
          ]}
          width="md"
          name="sampleTest"
        />
        <ProFormText
          placeholder='请输入接口状态'
          rules={[
            {
              required: false,
            },
          ]}
          width="md"
          name="sampleStatus"
        />
      </ModalForm>

      {/* update 表单 */}
      <ModalForm
        //基础配置
        title={'更新接口信息'}
        width="400px"
        modalProps={{destroyOnClose: true}} //是否关闭时清除输入的内容

        //状态监听（是否显示）
        visible={updateModalVisible}
        onVisibleChange={handleModalVisibleForUpdate}

        //确定按钮事件绑定
        onFinish={async (value) => {
          console.log(value)
          const success = await handleUpdate(value as API.InterfaceInfoUpdateRequest);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
          //返回 true 则操作完成后关闭弹窗
          return true
        }
        }
      >
        <ProFormText
          initialValue={currentRow?.id}
          width="md"
          name="id"
          disabled
        />
        <ProFormText
          placeholder='请输入接口名称'
          rules={[
            {
              required: true,
              message: '接口名称为必填项',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormText
          placeholder='请输入接口状态'
          rules={[
            {
              required: true,
              message: '接口状态为必填项',
            },
          ]}
          width="md"
          name="status"
        />
      </ModalForm>

      {/* use 表单 */}
      <ModalForm
        //基础配置
        title={'调用接口服务'}
        width="400px"
        modalProps={{destroyOnClose: true}} //是否关闭时清除输入的内容

        //状态监听（是否显示）
        visible={useModalVisible}
        onVisibleChange={handleModalVisibleForUse}

        //确定按钮事件绑定
        onFinish={async (value) => {
          console.log(value)
          //TODO 调用接口服务
          message.success("调用接口服务")
        }
        }
      >
        <div>接口名称</div>
        <ProFormText
          initialValue={currentRow?.name}
          width="md"
          name="name"
          disabled
        />
        <div>接口地址</div>
        <ProFormText
          initialValue={currentRow?.url}
          width="md"
          name="url"
          disabled
        />
        <div>请求参数</div>
        <ProFormText
          initialValue={currentRow?.requestParams}
          width="md"
          name="requestParams"
          disabled
        />
        <div>请求类型</div>
        <ProFormText
          initialValue={currentRow?.method}
          width="md"
          name="method"
          disabled
        />
        <div>接口参数</div>
        <ProFormText
          placeholder='请输入接口参数'
          width="md"
          name="param"
        />
        <div>请求体</div>
        <ProFormText
          placeholder='请输入请求体'
          name="body"
        />
      </ModalForm>

      {/*抽屉*/}
      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        <ProDescriptions
          <API.InterfaceInfoVO>
          column={1}
          bordered={true}
          size={"default"}
          title="样例"
          dataSource={
            {
              id: currentRow?.id,
              name: currentRow?.name,
              status: currentRow?.status,
            }}
          columns={[
            {
              title: 'id',
              key: 'id',
              dataIndex: 'id',
            },
            {
              title: '接口名称',
              copyable: true,
              dataIndex: 'name',
              //自动缩略
              ellipsis: false
            },
            {
              title: '接口状态',
              dataIndex: 'status',
            },
          ]}
        />
      </Drawer>
    </PageContainer>
  );
};
export default TableList;
