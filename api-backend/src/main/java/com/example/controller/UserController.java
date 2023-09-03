package com.example.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.plugins.pagination.PageDTO;
import com.example.common.ResultUtils;
import com.example.common.model.domain.User;
import com.example.common.model.vo.UserVO;
import com.example.model.dto.user.*;
import com.example.service.UserService;
import com.example.common.BaseResponse;
import com.example.common.ErrorCode;
import com.example.common.IdRequest;
import com.example.exception.BusinessException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 用户接口
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Resource
    UserService userService;

    //region 测试用接口

    //FIXME 测试用，检测接口能否正常接通
    @GetMapping("/hello")
    public BaseResponse<String> hello() {

        return ResultUtils.success("hello");
    }

    //FIXME 测试用，检测业务异常能否正常抛出
    @GetMapping("/be")
    public void throwBusinessException() {
        throw new BusinessException(ErrorCode.SYSTEM_ERROR);
    }

    //FIXME 测试用，检测运行时异常能否正常抛出
    @GetMapping("/re")
    public void throwRuntimeException() {
        throw new RuntimeException();
    }

    //endregion

    //region 用户中心业务功能（登入登出、注册、用户态获取、加密）
    /**
     * 用户注册
     *
     * @param userRegisterRequest
     * @return
     */
    @PostMapping("/register")
    public BaseResponse<Long> userRegister(@RequestBody UserRegisterRequest userRegisterRequest) {
        //请求判空
        if (userRegisterRequest == null) {
            throw new BusinessException(ErrorCode.REQUEST_NULL);
        }
        //获取属性
        String userAccount = userRegisterRequest.getUserAccount();
        String userPassword = userRegisterRequest.getUserPassword();
        String checkPassword = userRegisterRequest.getCheckPassword();
        //属性判空
        if (StringUtils.isAnyBlank(userAccount, userPassword, checkPassword)) {
            throw new BusinessException(ErrorCode.PARAMS_NULL);
        }
        //服务调用
        long result = userService.userRegister(userAccount, userPassword, checkPassword);
        System.out.println(result);
        //返回结果
        return ResultUtils.success(result);
    }

    /**
     * 用户登录：密码加密
     *
     * @param userLoginRequest
     * @param request
     * @return
     */
    @PostMapping("/login")
    public BaseResponse<User> userLogin(@RequestBody UserLoginRequest userLoginRequest, HttpServletRequest request) {
        //请求判空
        if (userLoginRequest == null) {
            throw new BusinessException(ErrorCode.REQUEST_NULL);
        }
        //获取属性
        String userAccount = userLoginRequest.getUserAccount();
        String userPassword = userLoginRequest.getUserPassword();
        //属性判空
        if (StringUtils.isAnyBlank(userAccount, userPassword)) {
            throw new BusinessException(ErrorCode.PARAMS_NULL);
        }
        //调用服务
        User user = userService.userLogin(userAccount, userPassword, request);
        //返回结果
        return ResultUtils.success(user);
    }

    /**
     * 用户登出
     *
     * @param request
     * @return
     */
    @GetMapping("/logout")
    public BaseResponse<Boolean> userLogout(HttpServletRequest request) {
        //请求判空
        if (request == null) {
            throw new BusinessException(ErrorCode.REQUEST_NULL);
        }
        //服务调用
        boolean result = userService.userLogout(request);
        //返回结果
        return ResultUtils.success(result);
    }

    /**
     * 获取当前登录用户
     *
     * @param request
     * @return
     */
    @GetMapping("/get/login")
    public BaseResponse<UserVO> getLoginUser(HttpServletRequest request) {
        //请求判空
        if (request == null) {
            throw new BusinessException(ErrorCode.REQUEST_NULL);
        }
        //服务调用
        User user = userService.getLoginUser(request);
        UserVO userVO = new UserVO();
        BeanUtils.copyProperties(user, userVO);
        //返回结果
        return ResultUtils.success(userVO);
    }

    /**
     * 盐值，混淆密码
     */
    private static final String SALT = "salt";

    /**
     * 加密
     * 不是所有的方法都由 UserService 负责
     * 为直接使用 IService 方法的方法提供加密服务
     *
     * @param userPassword
     * @return
     */
    private String encryptUserPassword(String userPassword) {
        return DigestUtils.md5DigestAsHex((SALT + userPassword).getBytes());
    }

    //endregion

    //region 增删改查

    /**
     * 创建用户：密码不加密
     *
     * @param userAddRequest
     * @param request
     * @return
     */
    @PostMapping("/add")
    public BaseResponse<Long> addUser(@RequestBody UserAddRequest userAddRequest, HttpServletRequest request) {
        //请求判空
        if (userAddRequest == null) {
            throw new BusinessException(ErrorCode.REQUEST_NULL);
        }
        //获取数据
        User user = new User();
        BeanUtils.copyProperties(userAddRequest, user);
        //服务调用：原样保存
        boolean result = userService.save(user);
        if (!result) { //用户已存在
            throw new BusinessException(ErrorCode.OPERATION_ERROR);
        }
        //返回结果
        return ResultUtils.success(user.getId());
    }

    /**
     * 删除用户
     *
     * @param deleteRequest
     * @param request
     * @return
     */
    @PostMapping("/delete")
    public BaseResponse<Boolean> deleteUser(@RequestBody IdRequest deleteRequest, HttpServletRequest request) {
        //请求合法性判断
        if (deleteRequest == null || deleteRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        //服务调用
        boolean result = userService.removeById(deleteRequest.getId());
        //返回结果
        return ResultUtils.success(result);
    }

    /**
     * 更新用户
     *
     * @param userUpdateRequest
     * @param request
     * @return
     */
    @PostMapping("/update")
    public BaseResponse<Boolean> updateUser(@RequestBody UserUpdateRequest userUpdateRequest, HttpServletRequest request) {
        //合法性判断
        if (userUpdateRequest == null || userUpdateRequest.getId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        //获取数据
        User user = new User();
        BeanUtils.copyProperties(userUpdateRequest, user);
        //加密
        user.setUserPassword(encryptUserPassword(user.getUserPassword()));
        //服务调用
        boolean result = userService.updateById(user);
        //返回结果
        return ResultUtils.success(result);
    }

    /**
     * 根据 id 获取用户
     *
     * @param idRequest
     * @param request
     * @return
     */
    @PostMapping("/get")
    public BaseResponse<UserVO> getUserById(@RequestBody IdRequest idRequest, HttpServletRequest request) {
        //请求判空
        if (idRequest == null) {
            throw new BusinessException(ErrorCode.REQUEST_NULL);
        }
        //数据获取
        long id = idRequest.getId();
        //请求合法性判断
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        //服务调用
        User user = userService.getById(id);
        UserVO userVO = new UserVO();
        //返回结果
        BeanUtils.copyProperties(user, userVO);
        return ResultUtils.success(userVO);
    }

    /**
     * 获取用户列表
     *
     * @param userQueryRequest
     * @param request
     * @return
     */
    @GetMapping("/list")
    public BaseResponse<List<UserVO>> listUser(UserQueryRequest userQueryRequest, HttpServletRequest request) {
        //判空并处理
        User userQuery = new User();
        if (userQueryRequest != null) {
            BeanUtils.copyProperties(userQueryRequest, userQuery);
        }
        //服务调用
        QueryWrapper<User> queryWrapper = new QueryWrapper<>(userQuery);
        List<User> userList = userService.list(queryWrapper);
        List<UserVO> userVOList = userList.stream().map(user -> {
            UserVO userVO = new UserVO();
            BeanUtils.copyProperties(user, userVO);
            return userVO;
        }).collect(Collectors.toList());
        //返回结果
        return ResultUtils.success(userVOList);
    }

    /**
     * 分页获取用户列表
     *
     * @param userQueryRequest
     * @param request
     * @return
     */
    @PostMapping("/list/page")
    public BaseResponse<Page<UserVO>> listUserByPage(UserQueryRequest userQueryRequest, HttpServletRequest request) {
        //设置默认页面（从 1 开始）和默认获取数量
        long current = 1;
        long size = 10;
        //判空并处理
        User userQuery = new User();
        if (userQueryRequest != null) {
            BeanUtils.copyProperties(userQueryRequest, userQuery);
            current = userQueryRequest.getCurrent();
            size = userQueryRequest.getPageSize();
        }
        //服务调用
        //设置查询条件
        QueryWrapper<User> queryWrapper = new QueryWrapper<>(userQuery);
        //执行分页查询
        Page<User> userPage = userService.page(new Page<>(current, size), queryWrapper);
        //处理分页查询结果
        Page<UserVO> userVOPage = new PageDTO<>(userPage.getCurrent(), userPage.getSize(), userPage.getTotal());
        List<UserVO> userVOList = userPage.getRecords().stream().map(user -> {
            UserVO userVO = new UserVO();
            BeanUtils.copyProperties(user, userVO);
            return userVO;
        }).collect(Collectors.toList());
        userVOPage.setRecords(userVOList);
        //返回结果
        return ResultUtils.success(userVOPage);
    }

    //endregion

}
