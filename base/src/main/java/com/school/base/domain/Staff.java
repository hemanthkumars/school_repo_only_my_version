package com.school.base.domain;
import org.springframework.roo.addon.dbre.RooDbManaged;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.tostring.RooToString;
import org.springframework.roo.addon.json.RooJson;

@RooJavaBean
@RooJpaActiveRecord(versionField = "", table = "staff")
@RooDbManaged(automaticallyDelete = true)
@RooToString(excludeFields = { "classExaminations", "homeWorks", "schoolClassSections", "schoolFees", "schoolFeeReceipts", "schoolHolidays", "schoolLogins", "smss", "smss1", "staffs", "staffAttendances", "staffAttendances1", "students", "studentAttedances", "studentExaminations", "subjectStaffClasses", "auiditUserId", "schoolId", "stateId", "countryId", "religionId", "bloodGroupId", "genderId", "motherTongueId", "casteId", "departmentId", "positionId", "cityId" })
@RooJson
public class Staff {
	@Override
  	protected void finalize() throws Throwable {
  		if (entityManager!=null) {
  			entityManager.clear();
  			entityManager.close();
  			entityManager=null;
		}
  		
  	}
}
