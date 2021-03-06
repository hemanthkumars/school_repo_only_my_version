// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.school.base.domain;

import com.school.base.domain.LeaveRegister;
import com.school.base.domain.LeaveStatus;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

privileged aspect LeaveStatus_Roo_DbManaged {
    
    @OneToMany(fetch=FetchType.LAZY,mappedBy = "leaveStatusId")
    private Set<LeaveRegister> LeaveStatus.leaveRegisters;
    
    @Column(name = "STATUS", length = 49)
    @NotNull
    private String LeaveStatus.status;
    
    public Set<LeaveRegister> LeaveStatus.getLeaveRegisters() {
        return leaveRegisters;
    }
    
    public void LeaveStatus.setLeaveRegisters(Set<LeaveRegister> leaveRegisters) {
        this.leaveRegisters = leaveRegisters;
    }
    
    public String LeaveStatus.getStatus() {
        return status;
    }
    
    public void LeaveStatus.setStatus(String status) {
        this.status = status;
    }
    
}
