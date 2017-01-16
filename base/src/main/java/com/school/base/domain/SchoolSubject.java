package com.school.base.domain;
import java.util.List;

import org.springframework.roo.addon.dbre.RooDbManaged;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.tostring.RooToString;
import org.springframework.roo.addon.json.RooJson;

@RooJavaBean
@RooJpaActiveRecord(versionField = "", table = "school_subject")
@RooDbManaged(automaticallyDelete = true)
@RooToString(excludeFields = { "classExaminations", "studentAttedances", "subjectClasses", "subjectStaffClasses", "schoolId" })
@RooJson
public class SchoolSubject {
	
	public static List<SchoolSubject>  findSchoolSubjects(Integer schoolId){
		List<SchoolSubject> list=entityManager().createQuery("SELECT sl FROM SchoolSubject sl WHERE sl.schoolId.schoolId="+schoolId+" ").getResultList();
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
