// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.school.base.domain;

import com.school.base.domain.HomeWork;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

privileged aspect HomeWork_Roo_Jpa_Entity {
    
    declare @type: HomeWork: @Entity;
    
    declare @type: HomeWork: @Table(name = "home_work");
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "HOME_WORK_ID")
    private Integer HomeWork.homeWorkId;
    
    public Integer HomeWork.getHomeWorkId() {
        return this.homeWorkId;
    }
    
    public void HomeWork.setHomeWorkId(Integer id) {
        this.homeWorkId = id;
    }
    
}
