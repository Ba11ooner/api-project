package com.example.common.service;

import com.example.common.model.domain.InterfaceInfo;

/**
 * @author Ba11ooner
 * @description 针对表【interface_info(接口信息)】的数据库操作Service
 * @createDate 2023-08-30 14:40:25
 */
public interface InnerInterfaceInfoService {
    /**
     * 从数据库中查询模拟接口是否存在（请求路径、请求方法、请求参数）
     */
    InterfaceInfo getInterfaceInfo(String path, String method);
}
