// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.school.base.domain;

import com.school.base.domain.HomeWorkType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

privileged aspect HomeWorkType_Roo_Jpa_Entity {
    
    declare @type: HomeWorkType: @Entity;
    
    declare @type: HomeWorkType: @Table(name = "home_work_type");
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "HOME_WORK_TYPE_ID")
    private Integer HomeWorkType.homeWorkTypeId;
    
    public Integer HomeWorkType.getHomeWorkTypeId() {
        return this.homeWorkTypeId;
    }
    
    public void HomeWorkType.setHomeWorkTypeId(Integer id) {
        this.homeWorkTypeId = id;
    }
    
}
