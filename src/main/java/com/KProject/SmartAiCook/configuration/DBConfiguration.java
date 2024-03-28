package com.KProject.SmartAiCook.configuration;

import com.zaxxer.hikari.HikariConfig;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import javax.sql.DataSource;


// @Configuration : 스프링부트 환경설정 클래스임을 명시 + 자동으로 Bean에 등록
// 해당 에너테이션을 사용하면 @ComponentScan이 스캔할 때, 해당 클래스에 @Bean으로 지정한 모든 Bean들도 IoC 컨테이너에 등록됨
@Configuration
@PropertySource("classpath:/application.properties")
public class DBConfiguration {

    // Hikari 설정1
    public HikariConfig hikariConfig() {

        return new HikariConfig();
    }

//    // Hikari 설정2
//    public DataSource dataSource() {
//        DataSource dataSource = new HikariDataSource( hikariConfig() );
//        System.out.println(dataSource.toString());
//
//        return dataSource;
//    }

    // MyBatis 설정1 : SqlSessionFactory ( SqlSessionFactoryBean으로 생성 )
//    public SqlSessionFactory sqlSessionFactory() throws Exception {
//        SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
//
//        return factoryBean.getObject();
//
//    }

    // MyBatis 설정2 : SqlSessionTemplate ( SqlSessionFactory으로 생성 )

}
