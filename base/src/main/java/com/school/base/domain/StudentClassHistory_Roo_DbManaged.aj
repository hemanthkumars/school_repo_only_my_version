// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.school.base.domain;

import com.school.base.domain.SchoolClassSection;
import com.school.base.domain.Student;
import com.school.base.domain.StudentClassHistory;
import java.util.Calendar;
import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.springframework.format.annotation.DateTimeFormat;

privileged aspect StudentClassHistory_Roo_DbManaged {
    
    @ManyToOne
    @JoinColumn(name = "SCHOOL_CLASS_SECTION_ID", referencedColumnName = "SCHOOL_CLASS_SECTION_ID", nullable = false)
    private SchoolClassSection StudentClassHistory.schoolClassSectionId;
    
    @ManyToOne
    @JoinColumn(name = "STUDENT_ID", referencedColumnName = "STUDENT_ID", nullable = false)
    private Student StudentClassHistory.studentId;
    
    @Column(name = "AUDIT_DT_TIME")
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(style = "MM")
    private Calendar StudentClassHistory.auditDtTime;
    
    public SchoolClassSection StudentClassHistory.getSchoolClassSectionId() {
        return schoolClassSectionId;
    }
    
    public void StudentClassHistory.setSchoolClassSectionId(SchoolClassSection schoolClassSectionId) {
        this.schoolClassSectionId = schoolClassSectionId;
    }
    
    public Student StudentClassHistory.getStudentId() {
        return studentId;
    }
    
    public void StudentClassHistory.setStudentId(Student studentId) {
        this.studentId = studentId;
    }
    
    public Calendar StudentClassHistory.getAuditDtTime() {
        return auditDtTime;
    }
    
    public void StudentClassHistory.setAuditDtTime(Calendar auditDtTime) {
        this.auditDtTime = auditDtTime;
    }
    
}
