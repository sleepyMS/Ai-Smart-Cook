package com.KProject.SmartAiCook;

import com.KProject.SmartAiCook.dto.UserDTO;
import com.KProject.SmartAiCook.mapper.UserMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
public class MapperTests {

    @Autowired
    private UserMapper userMapper;

    @Test
    public void testInsert() {
        UserDTO u1 = new UserDTO();

        u1.setUserName("최민석");
        u1.setUserId("abc");
        u1.setUserPhone("010-1234-1234");

        System.out.println(u1);
//        userMapper.insertUser(u1);
//
//        System.out.println("--------------------------------");
    }

}
