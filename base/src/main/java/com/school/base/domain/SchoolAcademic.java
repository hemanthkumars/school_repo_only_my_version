package com.school.base.domain;
import java.util.List;

import org.springframework.roo.addon.dbre.RooDbManaged;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.tostring.RooToString;

@RooJavaBean
@RooJpaActiveRecord(versionField = "", table = "school_academic")
@RooDbManaged(automaticallyDelete = true)
@RooToString(excludeFields = { "classExaminations", "homeWorks", "schoolFees", "schoolHolidays", "smss", "students", "studentAttedances", "schoolId", "academicYearId" })
@RooJson
public class SchoolAcademic {
	public static List<SchoolAcademic>  fetchSchoolAcademic(Integer schoolId,Integer schoolAcademicYearId){
		List<SchoolAcademic> list=entityManager().createQuery("SELECT sa FROM SchoolAcademic sa WHERE sa.schoolId.schoolId="+schoolId+" AND sa.schoolAcademicYearId="+schoolAcademicYearId+" ").getResultList();
		return list;
	}
	
	public static List<SchoolAcademic>  fetchSchoolAcademic(Integer schoolId){
		List<SchoolAcademic> list=entityManager().createQuery("SELECT sa FROM SchoolAcademic sa WHERE sa.schoolId.schoolId="+schoolId+"  ").getResultList();
		return list;
	}
	
	public static List<SchoolAcademic>  fetchCurrentSchoolAcademic(Integer schoolId){
		List<SchoolAcademic> list=entityManager().createQuery("SELECT sa FROM SchoolAcademic sa WHERE sa.schoolId.schoolId="+schoolId+" AND sa.currentYearMark=1 ").getResultList();
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
