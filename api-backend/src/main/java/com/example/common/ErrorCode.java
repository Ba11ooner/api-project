package com.example.common;

/**
 * 错误码
 */
public enum ErrorCode {
    SUCCESS(200, "ok",""),
    // 客户端错误（请求相关）
    PARAMS_ERROR(40000, "请求参数错误",""),
    PARAMS_NULL(40001,"请求参数为空",""),
    REQUEST_NULL(40002,"请求为空",""),
    NOT_FOUND_ERROR(40400, "请求数据不存在",""),
    // 客户端错误（权限相关）
    NOT_LOGIN_ERROR(40100, "未登录",""),
    NO_AUTH_ERROR(40101, "无权限",""),
    FORBIDDEN_ERROR(40300, "禁止访问",""),
    // 服务端错误
    SYSTEM_ERROR(50000, "系统内部异常",""),
    OPERATION_ERROR(50001, "操作失败","");

    private final int code;
    private final String message;
    private final String description;

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public String getDescription() {
        return description;
    }

    ErrorCode(int code, String message, String description) {
        this.code = code;
        this.message = message;
        this.description = description;
    }

}
