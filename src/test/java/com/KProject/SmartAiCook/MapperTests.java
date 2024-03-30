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

        u1.setName("최민석");
        u1.setId("new3");
        u1.setPhone("010-3333-3333");

        System.out.println(u1);
        userMapper.insertUser(u1);
        System.out.println("------------ 테이블 insert ------------");
    }

    @Test
    public void testSelect() {
        String userId = "new3";
        UserDTO user = userMapper.getUserById(userId);
        System.out.println("User found: " + user);
    }

    @Test
    public void testUpdate() {
        String userId = "new2";
        UserDTO user = userMapper.getUserById(userId);
        user.setName("update");
        user.setPhone("010-5555-5555");
        userMapper.updateUser(user);
        System.out.println("User updated: " + user);
    }

    @Test
    public void testDelete() {
        String userId = "new3";
        userMapper.deleteUser(userId);
        System.out.println("User deleted with ID: " + userId);
    }

}
