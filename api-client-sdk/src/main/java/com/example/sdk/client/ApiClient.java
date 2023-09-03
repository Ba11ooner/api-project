package com.example.sdk.client;

import cn.hutool.core.util.RandomUtil;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import static com.example.sdk.utils.SignUtils.genSign;


/**
 * 调用第三方接口的客户端
 *
 * 具体功能：
 * 1.记录用户公钥私钥
 * 2.增加请求头信息（待传输内容 + 用户身份验证信息 + 时间戳）
 * 3.提供网关地址
 *
 */
public class ApiClient {

    //配置路由地址
    // 思考：采用硬编码的形式是否合理？
    // 从封装的角度看是合理的
    // 1.网关地址相对固定（可行性）
    // 2.封装起来不对外暴露网关地址，也更安全（必要性）
    // 从需求的角度看是合理的，因为该客户端工具是提供给接口提供者使用的，开发者无需关心平台网关地址
    private static final String GATEWAY_HOST = "http://localhost:8090";

    private String accessKey;

    private String secretKey;

    //配置用户的公钥私钥，相当于账号密码
    public ApiClient(String accessKey, String secretKey) {
        this.accessKey = accessKey;
        this.secretKey = secretKey;
    }

    //增加请求头参数（访问密钥，请求标识，请求体，时间戳，生成的签名）
    public Map<String, String> getHeaderMap(String body) {
        Map<String, String> hashMap = new HashMap<>();
        // 访问密钥，即公钥
        hashMap.put("accessKey", accessKey);
        // 就算是密文传输也一定不能直接发送
        // hashMap.put("secretKey", secretKey);
        // Nonce 是 Number once 的缩写，用于标记请求
        // 在密码学中 Nonce 是一个只被使用一次的任意或非重复的随机数值
        hashMap.put("nonce", RandomUtil.randomNumbers(4));
        // 请求内容
        hashMap.put("body", body);
        // 时间戳
        hashMap.put("timestamp", String.valueOf(System.currentTimeMillis() / 1000));
        // 签名
        hashMap.put("sign", genSign(body, secretKey));
        return hashMap;
    }

    public static String getEncodedGatewayHost() {
        return encode(GATEWAY_HOST);
    }

    public static String encode(String text) {
        byte[] encodedBytes = Base64.getEncoder().encode(text.getBytes());
        return new String(encodedBytes);
    }

    public static String decode(String text) {
        byte[] decodedBytes = Base64.getDecoder().decode(text);
        return new String(decodedBytes);
    }

}
