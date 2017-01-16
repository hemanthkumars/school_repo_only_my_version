package com.school.base.domain;
import java.util.List;

import javax.persistence.Column;

import org.springframework.roo.addon.dbre.RooDbManaged;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.tostring.RooToString;
import org.springframework.roo.addon.json.RooJson;

@RooJavaBean
@RooJpaActiveRecord(versionField = "", table = "school_fee_type")
@RooDbManaged(automaticallyDelete = true)
@RooToString(excludeFields = { "schoolFees", "schoolId" })
@RooJson
public class SchoolFeeType {
	
	public static List<SchoolFeeType>  findAllSchoolFeeType(Integer schoolId){
		List<SchoolFeeType> list=entityManager().createQuery("SELECT sl FROM SchoolFeeType sl WHERE sl.schoolId.schoolId="+schoolId+" ").getResultList();
		return list;
	}
	
	public static List<SchoolFeeType>  findSchoolFeeType(Integer schoolId,Integer schoolFeeTypeId){
		List<SchoolFeeType> list=entityManager().createQuery("SELECT sl FROM SchoolFeeType sl WHERE sl.schoolId.schoolId="+schoolId+" AND sl.schoolFeeTypeId="+schoolFeeTypeId+"").getResultList();
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
