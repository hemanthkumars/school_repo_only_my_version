package com.school.base.domain;
import java.util.Date;

import javax.persistence.Column;

import org.springframework.roo.addon.dbre.RooDbManaged;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.tostring.RooToString;

@RooJavaBean
@RooJpaActiveRecord(versionField = "", table = "school_fee_receipt")
@RooDbManaged(automaticallyDelete = true)
@RooToString(excludeFields = { "receiptSchoolFees", "paymentTypeId", "schoolId", "auditUserId" })
@RooJson
public class SchoolFeeReceipt {
	
	@Column(name = "AUDIT_CREATED_DT_TIME")
    private Date auditCreatedDtTime;
	
	public Date getAuditCreatedDtTime() {
		return auditCreatedDtTime;
	}

	public void setAuditCreatedDtTime(Date auditCreatedDtTime) {
		this.auditCreatedDtTime = auditCreatedDtTime;
	}


	@Override
  	protected void finalize() throws Throwable {
  		if (entityManager!=null) {
  			entityManager.clear();
  			entityManager.close();
  			entityManager=null;
		}
  		
  	}
}
