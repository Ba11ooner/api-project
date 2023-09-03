package com.example.sdk.utils;

import cn.hutool.crypto.digest.DigestAlgorithm;
import cn.hutool.crypto.digest.Digester;

/**
 * 签名工具
 *
 */
public class SignUtils {
    /**
     * 生成签名，确保数据在传输过程中没有被篡改或者被冒充
     * @param body
     * @param secretKey
     * @return
     */
    public static String genSign(String body, String secretKey) {
        // 创建 SHA256 的消息摘要器
        Digester md5 = new Digester(DigestAlgorithm.SHA256);
        // 将请求体和密钥拼接起来以生成待签名的内容
        String content = body + "." + secretKey;
        // 使用消息摘要器计算内容的哈希值，并以十六进制形式返回
        return md5.digestHex(content);
    }
}
