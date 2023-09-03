package com.example.aop;

import com.baomidou.mybatisplus.core.toolkit.CollectionUtils;
import com.example.common.ErrorCode;
import com.example.common.model.domain.User;
import com.example.exception.BusinessException;
import com.example.service.UserService;
import com.example.annotation.AuthCheck;

import org.apache.commons.lang3.StringUtils;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 权限校验 AOP
 */
@Aspect
@Component
public class AuthInterceptor {

    @Resource
    private UserService userService;

    /**
     * 执行拦截
     *
     * @param joinPoint
     * @param authCheck
     * @return
     */
    @Around("@annotation(authCheck)")
    public Object authCheckInterceptor(ProceedingJoinPoint joinPoint, AuthCheck authCheck) throws Throwable {
        //获取注解属性
        //获取 anyRole 数组中的元素
        List<String> anyRole = Arrays
                                .stream(authCheck.hasRole())
                                .filter(StringUtils::isNotBlank)
                                .collect(Collectors.toList());
        //获取 mustRole 数组中的元素
        String mustRole = authCheck.mustRole();

        //获取请求属性对象
        // RequestContextHolder是Spring提供的一个工具类
        // currentRequestAttributes()方法返回当前线程的请求属性对象。
        RequestAttributes requestAttributes = RequestContextHolder.currentRequestAttributes();

        //获取请求
        HttpServletRequest request = ((ServletRequestAttributes) requestAttributes).getRequest();

        //获取当前登录用户
        User user = userService.getLoginUser(request);

        //配置所需权限中拥有任意权限即通过
        if (CollectionUtils.isNotEmpty(anyRole)) {
            //获取用户拥有的权限
            String userRole = user.getUserRole();
            //若所需权限不包含用户拥有的权限则抛出异常
            if (!anyRole.contains(userRole)) {
                throw new BusinessException(ErrorCode.NO_AUTH_ERROR);
            }
        }

        //配置所需权限中必须有所有权限才通过
        if (StringUtils.isNotBlank(mustRole)) {
            //获取用户拥有的权限
            String userRole = user.getUserRole();
            //若用户权限不为所需权限则抛出异常
            if (!mustRole.equals(userRole)) {
                throw new BusinessException(ErrorCode.NO_AUTH_ERROR);
            }
        }

        // 通过权限校验，放行
        return joinPoint.proceed();
    }
}

