package com.example.common.service;

import com.example.common.model.domain.User;

/**
 * @author Ba11ooner
 * @description 针对表【user(用户)】的数据库操作Service
 * @createDate 2023-08-30 14:40:35
 */
public interface InnerUserService {
    /**
     * 根据 accessKey 查 user
     *
     * @param accessKey
     * @return
     */
    User getInvokeUser(String accessKey);
}
