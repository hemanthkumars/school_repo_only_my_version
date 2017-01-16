// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.school.base.domain;

import com.school.base.domain.ClassExamination;
import com.school.base.domain.Examination;
import com.school.base.domain.ResultType;
import com.school.base.domain.School;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

privileged aspect Examination_Roo_DbManaged {
    
    @OneToMany(fetch=FetchType.LAZY,mappedBy = "examinationId")
    private Set<ClassExamination> Examination.classExaminations;
    
    @ManyToOne
    @JoinColumn(name = "RESULT_TYPE_ID", referencedColumnName = "RESULT_TYPE_ID", nullable = false)
    private ResultType Examination.resultTypeId;
    
    @ManyToOne
    @JoinColumn(name = "SCHOOL_ID", referencedColumnName = "SCHOOL_ID", nullable = false)
    private School Examination.schoolId;
    
    @Column(name = "TITLE", length = 255)
    @NotNull
    private String Examination.title;
    
    @Column(name = "EXAM_CODE", length = 255)
    @NotNull
    private String Examination.examCode;
    
    @Column(name = "DESCRIPTION", length = 255)
    private String Examination.description;
    
    public Set<ClassExamination> Examination.getClassExaminations() {
        return classExaminations;
    }
    
    public void Examination.setClassExaminations(Set<ClassExamination> classExaminations) {
        this.classExaminations = classExaminations;
    }
    
    public ResultType Examination.getResultTypeId() {
        return resultTypeId;
    }
    
    public void Examination.setResultTypeId(ResultType resultTypeId) {
        this.resultTypeId = resultTypeId;
    }
    
    public School Examination.getSchoolId() {
        return schoolId;
    }
    
    public void Examination.setSchoolId(School schoolId) {
        this.schoolId = schoolId;
    }
    
    public String Examination.getTitle() {
        return title;
    }
    
    public void Examination.setTitle(String title) {
        this.title = title;
    }
    
    public String Examination.getExamCode() {
        return examCode;
    }
    
    public void Examination.setExamCode(String examCode) {
        this.examCode = examCode;
    }
    
    public String Examination.getDescription() {
        return description;
    }
    
    public void Examination.setDescription(String description) {
        this.description = description;
    }
    
}
