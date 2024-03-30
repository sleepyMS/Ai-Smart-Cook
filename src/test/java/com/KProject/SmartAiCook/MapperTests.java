package com.KProject.SmartAiCook;

import com.KProject.SmartAiCook.dto.SignUpDTO;
import com.KProject.SmartAiCook.dto.UserDTO;
import com.KProject.SmartAiCook.mapper.UserMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
public class MapperTests {

    @Autowired
    private UserMapper userMapper;

//    CRUD 테스트

    @Test
    public void testInsert() {

        SignUpDTO s1 = new SignUpDTO();
        s1.setName("심형규");
        s1.setId("sim");
        s1.setPhone("010-1234-1234");
        s1.setBirth("1990-01-01");
        s1.setEmail("12314");
        s1.setConfirmPassword("1");
        s1.setPassword("1");
        s1.setNick("a");

        System.out.println(s1);
        userMapper.insertUser(s1);
        System.out.println("------------ 테이블 insert ------------");
    }

    @Test
    public void testSelect() {
        String userId = "Kin";
        UserDTO user = userMapper.getUserById(userId);
        System.out.println("User found: " + user);
    }

    @Test
    public void testUpdate() {
        String userId = "new2";
        UserDTO u1 = userMapper.getUserById(userId);

        u1.setName("update name");
        u1.setPhone("010-1234-1234");
        userMapper.updateUser(u1);

        System.out.println("User updated: " + u1);
    }

    @Test
    public void testDelete() {
        String userId = "new3";
        userMapper.deleteUser(userId);
        System.out.println("User deleted with ID: " + userId);
    }

}
