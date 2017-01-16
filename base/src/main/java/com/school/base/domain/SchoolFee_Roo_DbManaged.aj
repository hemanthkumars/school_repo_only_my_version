// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.school.base.domain;

import com.school.base.domain.ReceiptSchoolFee;
import com.school.base.domain.SchoolAcademic;
import com.school.base.domain.SchoolFee;
import com.school.base.domain.SchoolFeeType;
import com.school.base.domain.Staff;
import com.school.base.domain.Student;
import java.util.Calendar;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.springframework.format.annotation.DateTimeFormat;

privileged aspect SchoolFee_Roo_DbManaged {
    
    @OneToMany(fetch=FetchType.LAZY,mappedBy = "schoolFeeId")
    private Set<ReceiptSchoolFee> SchoolFee.receiptSchoolFees;
    
    @ManyToOne
    @JoinColumn(name = "SCHOOL_FEE_TYPE_ID", referencedColumnName = "SCHOOL_FEE_TYPE_ID", nullable = false)
    private SchoolFeeType SchoolFee.schoolFeeTypeId;
    
    @ManyToOne
    @JoinColumn(name = "STUDENT_ID", referencedColumnName = "STUDENT_ID", nullable = false)
    private Student SchoolFee.studentId;
    
    @ManyToOne
    @JoinColumn(name = "SCHOOL_ACADEMIC_YEAR_ID", referencedColumnName = "SCHOOL_ACADEMIC_YEAR_ID", nullable = false)
    private SchoolAcademic SchoolFee.schoolAcademicYearId;
    
    @ManyToOne
    @JoinColumn(name = "AUDIT_USER_ID", referencedColumnName = "STAFF_ID")
    private Staff SchoolFee.auditUserId;
    
    @Column(name = "PAID_AMOUNT")
    private Integer SchoolFee.paidAmount;
    
    @Column(name = "TOTAL_AMOUNT")
    private Integer SchoolFee.totalAmount;
    
    @Column(name = "BALANCE")
    private Integer SchoolFee.balance;
    
    
    
    public Set<ReceiptSchoolFee> SchoolFee.getReceiptSchoolFees() {
        return receiptSchoolFees;
    }
    
    public void SchoolFee.setReceiptSchoolFees(Set<ReceiptSchoolFee> receiptSchoolFees) {
        this.receiptSchoolFees = receiptSchoolFees;
    }
    
    public SchoolFeeType SchoolFee.getSchoolFeeTypeId() {
        return schoolFeeTypeId;
    }
    
    public void SchoolFee.setSchoolFeeTypeId(SchoolFeeType schoolFeeTypeId) {
        this.schoolFeeTypeId = schoolFeeTypeId;
    }
    
    public Student SchoolFee.getStudentId() {
        return studentId;
    }
    
    public void SchoolFee.setStudentId(Student studentId) {
        this.studentId = studentId;
    }
    
    public SchoolAcademic SchoolFee.getSchoolAcademicYearId() {
        return schoolAcademicYearId;
    }
    
    public void SchoolFee.setSchoolAcademicYearId(SchoolAcademic schoolAcademicYearId) {
        this.schoolAcademicYearId = schoolAcademicYearId;
    }
    
    public Staff SchoolFee.getAuditUserId() {
        return auditUserId;
    }
    
    public void SchoolFee.setAuditUserId(Staff auditUserId) {
        this.auditUserId = auditUserId;
    }
    
    public Integer SchoolFee.getPaidAmount() {
        return paidAmount;
    }
    
    public void SchoolFee.setPaidAmount(Integer paidAmount) {
        this.paidAmount = paidAmount;
    }
    
    public Integer SchoolFee.getTotalAmount() {
        return totalAmount;
    }
    
    public void SchoolFee.setTotalAmount(Integer totalAmount) {
        this.totalAmount = totalAmount;
    }
    
    public Integer SchoolFee.getBalance() {
        return balance;
    }
    
    public void SchoolFee.setBalance(Integer balance) {
        this.balance = balance;
    }
    
    
}
