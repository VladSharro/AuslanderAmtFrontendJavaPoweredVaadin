package com.example.appforauslenderamt.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "mail")
public class MailConfig {

    private String mailHost;
    private Integer mailPort;
    private Boolean sslEnable;
    private Boolean authEnable;

    private String senderMailAddress;
    private String senderPassword;
    private String abhMailAddress;

}
