package com.example.mapper;

import com.example.common.model.domain.UserInterfaceInfo;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import java.util.List;

/**
 * @author Ba11ooner
 * @description 针对表【user_interface_info(用户调用接口关系)】的数据库操作Mapper
 * @createDate 2023-08-30 15:21:06
 * @Entity com.example.common.model.domain.UserInterfaceInfo
 */
public interface UserInterfaceInfoMapper extends BaseMapper<UserInterfaceInfo> {
    // TODO 理解代码功能
    List<UserInterfaceInfo> listTopInvokeInterfaceInfo(int limit);
}




