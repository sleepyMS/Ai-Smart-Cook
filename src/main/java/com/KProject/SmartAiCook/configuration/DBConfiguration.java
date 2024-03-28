package com.KProject.SmartAiCook.configuration;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import javax.sql.DataSource;

// @Configuration : 스프링부트 환경설정 클래스임을 명시 + 자동으로 Bean에 등록
// 해당 에너테이션을 사용하면 @ComponentScan이 스캔할 때, 해당 클래스에 @Bean으로 지정한 모든 Bean들도 IoC 컨테이너에 등록됨
@Configuration
@PropertySource("classpath:/application.properties")
public class DBConfiguration {

    @Autowired
    private ApplicationContext applicationContext;

    // Hikari 설정1 ( @Bean : return되는 객체를  IoC 컨테이너에 등록 )
    @Bean
    @ConfigurationProperties(prefix = "spring.datasource.hikari")
    public HikariConfig hikariConfig() {

        return new HikariConfig();
    }

    // Hikari 설정2 ( HikariConfig를 넘겨받아 DataSource객체를 리턴 ) -> HikariCP(Connection Pool) 연결 완성
    @Bean
    public DataSource dataSource() {
        DataSource dataSource = new HikariDataSource( hikariConfig() );
        System.out.println(dataSource.toString());  //연결 되었는지 체크

        return dataSource;
    }

    // MyBatis 설정1 : SqlSessionFactory ( SqlSessionFactoryBean으로 생성 )
    /*
        setDataSource           : 빌드된 DataSource를 세팅
        setMapperLocations      : SQL 구문이 작성된 *Mapper.xml의 경로를 정확히 등록
        setTypeAliasesPackage   : 인자로 Alias 대상 클래스가 위치한 패키지 경로
     */
    @Bean
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
        SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
        factoryBean.setDataSource(dataSource);
        factoryBean.setMapperLocations(applicationContext.getResources("classpath:mapper/**/*Mapper.xml"));
        factoryBean.setTypeAliasesPackage("com.KProject.SmartAiCook.dto");

        return factoryBean.getObject();
    }

    // MyBatis 설정2 : SqlSessionTemplate ( SqlSessionFactory으로 생성 )
    @Bean
    public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) throws Exception {

        return new SqlSessionTemplate(sqlSessionFactory);
    }
}
