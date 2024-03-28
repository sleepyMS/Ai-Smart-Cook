package com.KProject.SmartAiCook;

import com.KProject.SmartAiCook.dto.UserDTO;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class MapperTests {

    @Test
    public void testInsert() {
        UserDTO u1 = new UserDTO();

        u1.setUserName("최민석");
        u1.setUserId("minseok");
        u1.setUserPhone("010-5848-1017");

        System.out.println(u1);
    }

}
