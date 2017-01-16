// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.school.base.domain;

import com.school.base.domain.ReceiptSchoolFee;
import com.school.base.domain.SchoolFee;
import com.school.base.domain.SchoolFeeReceipt;
import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

privileged aspect ReceiptSchoolFee_Roo_DbManaged {
    
    @ManyToOne
    @JoinColumn(name = "SCHOOL_FEE_ID", referencedColumnName = "SCHOOL_FEE_ID")
    private SchoolFee ReceiptSchoolFee.schoolFeeId;
    
    @ManyToOne
    @JoinColumn(name = "SCHOOL_FEE_RECEIPT_ID", referencedColumnName = "SCHOOL_FEE_RECEIPT_ID")
    private SchoolFeeReceipt ReceiptSchoolFee.schoolFeeReceiptId;
    
    @Column(name = "PAID_AMOUNT")
    @NotNull
    private Integer ReceiptSchoolFee.paidAmount;
    
    public SchoolFee ReceiptSchoolFee.getSchoolFeeId() {
        return schoolFeeId;
    }
    
    public void ReceiptSchoolFee.setSchoolFeeId(SchoolFee schoolFeeId) {
        this.schoolFeeId = schoolFeeId;
    }
    
    public SchoolFeeReceipt ReceiptSchoolFee.getSchoolFeeReceiptId() {
        return schoolFeeReceiptId;
    }
    
    public void ReceiptSchoolFee.setSchoolFeeReceiptId(SchoolFeeReceipt schoolFeeReceiptId) {
        this.schoolFeeReceiptId = schoolFeeReceiptId;
    }
    
    public Integer ReceiptSchoolFee.getPaidAmount() {
        return paidAmount;
    }
    
    public void ReceiptSchoolFee.setPaidAmount(Integer paidAmount) {
        this.paidAmount = paidAmount;
    }
    
}
