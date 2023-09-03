package com.example.common;

import lombok.Data;

import java.io.Serializable;

/**
 * Id 请求，常用于删除
 *
 */
@Data
public class IdRequest implements Serializable {
    /**
     * id
     */
    private Long id;

    private static final long serialVersionUID = 1L;
}