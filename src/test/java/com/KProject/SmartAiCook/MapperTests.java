package com.KProject.SmartAiCook;

import com.KProject.SmartAiCook.dto.LoginDTO;
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

        UserDTO u1 = new UserDTO();
        u1.setName("chlalstjr");
        u1.setId("Che");
        u1.setPhone("010-1234-1234");
        u1.setBirth("1990-01-01");
        u1.setEmail("222");
//        s1.setConfirmPassword("1");
        u1.setPassword("52");
        u1.setNick("a");

        System.out.println(u1);
        userMapper.insertUser(u1);
        System.out.println("------------ 테이블 insert ------------");
    }

    @Test
    public void testSelect() {
        String userId = "Sim";
        UserDTO user = userMapper.getUserByEmail(userId);
        System.out.println("User found: " + user);
    }

    @Test
    public void testUpdate() {
        String userId = "222";
        UserDTO u1 = userMapper.getUserByEmail(userId);

        u1.setPassword("update pass");
        userMapper.updateUser(u1);

        System.out.println("User updated: " + u1);
    }

    @Test
    public void testDelete() {
        String userId = "Sim";
        userMapper.deleteUser(userId);
        System.out.println("User deleted with ID: " + userId);
    }

    @Test
    public void testCheckById() {
        String userId = "min";
        boolean result = userMapper.getIdCheckById(userId);

        System.out.println(result);
    }

    @Test
    public void testExistedByEmail() {
        LoginDTO loginDTO = new LoginDTO("111", "52");
        UserDTO result = userMapper.getUserByEmail("111");
        System.out.println(result);
    }

}
