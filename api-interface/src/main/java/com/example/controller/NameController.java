package com.example.controller;


import com.example.common.BaseResponse;
import com.example.common.ResultUtils;
import com.example.model.UserForInterface;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * 名称 API
 */
@RestController
@RequestMapping("/name")
public class NameController {

    @GetMapping("/get")
    public BaseResponse<String> getNameByGet(@RequestParam String name, HttpServletRequest request) {
//        TODO 理解代码含义
        System.out.println(request.getHeader("api-gateway"));

        System.out.println("getNameByGet");
        String result = "GET name:" + name;
        System.out.println(result);
        return ResultUtils.success(result);
    }

    @PostMapping("/post")
    public BaseResponse<String> getNameByPost(@RequestParam String name) {
        System.out.println("getNameByPost");
        String result = "POST name:" + name;
        System.out.println(result);
        return ResultUtils.success(result);
    }

    @PostMapping("/user")
    public BaseResponse<String> getUsernameByPost(@RequestBody UserForInterface user, HttpServletRequest request) {
        System.out.println("getUsernameByPost");
        String result = "POST Username:" + user.getUsername();
        System.out.println(result);
        return ResultUtils.success(result);
    }
}
