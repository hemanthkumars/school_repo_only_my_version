// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.school.base.domain;

import com.school.base.domain.Caste;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

privileged aspect Caste_Roo_Jpa_Entity {
    
    declare @type: Caste: @Entity;
    
    declare @type: Caste: @Table(name = "caste");
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "CASTE_ID")
    private Integer Caste.casteId;
    
    public Integer Caste.getCasteId() {
        return this.casteId;
    }
    
    public void Caste.setCasteId(Integer id) {
        this.casteId = id;
    }
    
}
