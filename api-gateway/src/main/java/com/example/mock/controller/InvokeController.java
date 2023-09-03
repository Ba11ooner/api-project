package com.example.mock.controller;

import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import cn.hutool.json.JSONUtil;
import com.example.mock.model.UserForInterface;
import com.example.sdk.client.ApiClient;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;


@RestController
@RequestMapping("/invoke")
public class InvokeController {

    @Resource
    ApiClient client;

    private String GATEWAY_HOST = ApiClient.decode(ApiClient.getEncodedGatewayHost());

    //region 接口方法调用

    //模拟调用 getNameByGet 接口
    @GetMapping("get")
    public String getNameByGet(@RequestParam String name) {
        System.out.println("getNameByGet");
        HttpResponse httpResponse = HttpRequest.get(GATEWAY_HOST + "/api/interface/name/get?name=" + name)
                .addHeaders(client.getHeaderMap(""))
                .body("")
                .execute();
        System.out.println(httpResponse.getStatus());
        String result = httpResponse.body();
        System.out.println(result);
        return result;
    }

    //模拟调用 getNameByPost 接口
    @PostMapping("/post")
    public String getNameByPost(@RequestParam String name) {
        System.out.println("getNameByPost");
        //可以单独传入http参数，这样参数会自动做URL编码，拼接在URL中
        HttpResponse httpResponse = HttpRequest.post(GATEWAY_HOST + "/api/interface/name/post?name=" + name)
                .addHeaders(client.getHeaderMap(""))
                .header("Content-Type", "application/json")
                .body("")
                .execute();
        System.out.println(httpResponse.getStatus());
        String result = httpResponse.body();
        System.out.println(result);
        return result;
    }

    //模拟调用 getUsernameByPost 接口
    @PostMapping("/user")
    public String getUsernameByPost(@RequestBody UserForInterface user) {
        System.out.println("getUsernameByPost");
        //对象请求
        String json = JSONUtil.toJsonStr(user);
        HttpResponse httpResponse = HttpRequest.post(GATEWAY_HOST + "/api/interface/name/user")
                .addHeaders(client.getHeaderMap(json))
                .body(json)
                .execute();
        System.out.println(httpResponse.getStatus());
        String result = httpResponse.body();
        System.out.println(result);
        return result;
    }

    //endregion
}
