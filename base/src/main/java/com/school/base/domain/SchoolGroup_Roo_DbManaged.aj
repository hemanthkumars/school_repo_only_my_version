// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.school.base.domain;

import com.school.base.domain.School;
import com.school.base.domain.SchoolGroup;
import com.school.base.domain.Student;
import com.school.base.domain.StudentGroup;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

privileged aspect SchoolGroup_Roo_DbManaged {
    
    @OneToMany(fetch=FetchType.LAZY,mappedBy = "schoolGroupId")
    private Set<Student> SchoolGroup.students;
    
    @OneToMany(fetch=FetchType.LAZY,mappedBy = "groupId")
    private Set<StudentGroup> SchoolGroup.studentGroups;
    
    @ManyToOne
    @JoinColumn(name = "SCHOOL_ID", referencedColumnName = "SCHOOL_ID", nullable = false)
    private School SchoolGroup.schoolId;
    
    @Column(name = "GROUP_NAME", length = 100)
    @NotNull
    private String SchoolGroup.groupName;
    
    @Column(name = "GROUP_CODE", length = 100)
    private String SchoolGroup.groupCode;
    
    @Column(name = "PIURPOSE", length = 200)
    private String SchoolGroup.piurpose;
    
    @Column(name = "DESCRIPTION", length = 300)
    private String SchoolGroup.description;
    
    public Set<Student> SchoolGroup.getStudents() {
        return students;
    }
    
    public void SchoolGroup.setStudents(Set<Student> students) {
        this.students = students;
    }
    
    public Set<StudentGroup> SchoolGroup.getStudentGroups() {
        return studentGroups;
    }
    
    public void SchoolGroup.setStudentGroups(Set<StudentGroup> studentGroups) {
        this.studentGroups = studentGroups;
    }
    
    public School SchoolGroup.getSchoolId() {
        return schoolId;
    }
    
    public void SchoolGroup.setSchoolId(School schoolId) {
        this.schoolId = schoolId;
    }
    
    public String SchoolGroup.getGroupName() {
        return groupName;
    }
    
    public void SchoolGroup.setGroupName(String groupName) {
        this.groupName = groupName;
    }
    
    public String SchoolGroup.getGroupCode() {
        return groupCode;
    }
    
    public void SchoolGroup.setGroupCode(String groupCode) {
        this.groupCode = groupCode;
    }
    
    public String SchoolGroup.getPiurpose() {
        return piurpose;
    }
    
    public void SchoolGroup.setPiurpose(String piurpose) {
        this.piurpose = piurpose;
    }
    
    public String SchoolGroup.getDescription() {
        return description;
    }
    
    public void SchoolGroup.setDescription(String description) {
        this.description = description;
    }
    
}
