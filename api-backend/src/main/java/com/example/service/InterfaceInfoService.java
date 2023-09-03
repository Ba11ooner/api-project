package com.example.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.common.model.domain.InterfaceInfo;

/**
 * 接口信息服务
 *
 */
public interface InterfaceInfoService extends IService<InterfaceInfo> {

    /**
     * 接口信息合法性检验
     * @param interfaceInfo
     * @param add
     */
    void validInterfaceInfo(InterfaceInfo interfaceInfo, boolean add);
}
