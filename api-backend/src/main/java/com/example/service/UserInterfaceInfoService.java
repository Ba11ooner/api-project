package com.example.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.common.model.domain.UserInterfaceInfo;

/**
 * 用户接口信息服务
 *
 */
public interface UserInterfaceInfoService extends IService<UserInterfaceInfo> {

    /**
     * 调用信息合法性验证
     * @param userInterfaceInfo
     * @param add
     */
    void validUserInterfaceInfo(UserInterfaceInfo userInterfaceInfo, boolean add);

    /**
     * 调用接口统计
     * @param interfaceInfoId
     * @param userId
     * @return
     */
    boolean invokeCount(long interfaceInfoId, long userId);

    boolean canInvoke(long interfaceInfoId, long userId);

}
