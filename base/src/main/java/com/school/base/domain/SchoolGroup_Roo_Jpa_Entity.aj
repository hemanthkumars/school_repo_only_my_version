// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.school.base.domain;

import com.school.base.domain.SchoolGroup;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

privileged aspect SchoolGroup_Roo_Jpa_Entity {
    
    declare @type: SchoolGroup: @Entity;
    
    declare @type: SchoolGroup: @Table(name = "school_group");
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "SCHOOL_GROUP_ID")
    private Integer SchoolGroup.schoolGroupId;
    
    public Integer SchoolGroup.getSchoolGroupId() {
        return this.schoolGroupId;
    }
    
    public void SchoolGroup.setSchoolGroupId(Integer id) {
        this.schoolGroupId = id;
    }
    
}