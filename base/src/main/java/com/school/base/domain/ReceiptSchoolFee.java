package com.school.base.domain;
import java.util.List;

import org.springframework.roo.addon.dbre.RooDbManaged;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.tostring.RooToString;
import org.springframework.roo.addon.json.RooJson;

@RooJavaBean
@RooJpaActiveRecord(versionField = "", table = "receipt_school_fee")
@RooDbManaged(automaticallyDelete = true)
@RooToString(excludeFields = { "schoolFeeId", "schoolFeeReceiptId" })
@RooJson
public class ReceiptSchoolFee {
	
	public static List<ReceiptSchoolFee>  findSchoolFee(Integer schoolId,Long schoolFeeId){
		List<ReceiptSchoolFee> list=entityManager().createQuery("SELECT sl FROM ReceiptSchoolFee sl WHERE sl.schoolFeeId.studentId.schoolId.schoolId="+schoolId+" AND sl.schoolFeeId.schoolFeeId="+schoolFeeId+"").getResultList();
		return list;
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
