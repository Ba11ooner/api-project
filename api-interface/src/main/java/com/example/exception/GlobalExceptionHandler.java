package com.example.exception;

import com.example.common.BaseResponse;
import com.example.common.ErrorCode;
import com.example.common.ResultUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletResponse;

// AOP 那一套，advice 特有翻译 → 增强
@RestControllerAdvice
@Slf4j
/**
 *  全局异常处理器
 */
public class GlobalExceptionHandler {
    @ExceptionHandler(BusinessException.class)//过滤，只捕获特定异常
    public BaseResponse<?> businessExceptionHandler(BusinessException e) {
        log.error("businessException:" + e.getMessage(), e);
        return ResultUtils.error(e.getCode(), e.getMessage(), e.getDescription());
    }

    @ExceptionHandler(RuntimeException.class)//过滤，只捕获特定异常
    public BaseResponse<?> runtimeExceptionHandler(HttpServletResponse res, RuntimeException e) {
        log.error("runtimeException", e);
        return ResultUtils.error(ErrorCode.SYSTEM_ERROR, e.getMessage(), "");
    }
}
