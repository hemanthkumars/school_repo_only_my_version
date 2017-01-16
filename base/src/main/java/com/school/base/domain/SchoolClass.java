package com.school.base.domain;
import java.util.List;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;

import org.springframework.roo.addon.dbre.RooDbManaged;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.tostring.RooToString;
import org.springframework.roo.addon.json.RooJson;

@RooJavaBean
@RooJpaActiveRecord(versionField = "", table = "school_class")
@RooDbManaged(automaticallyDelete = true)
@RooToString(excludeFields = { "classExaminations", "schoolClassSections", "subjectClasses", "schoolId" })
@RooJson
public class SchoolClass {
	
	

	public static List<SchoolClass>  fetchClassDefn(Integer schoolId){
		List<SchoolClass> list=entityManager().createQuery("SELECT sl FROM SchoolClass sl WHERE sl.schoolId.schoolId="+schoolId+" ").getResultList();
		return list;
	}
	
	public static List<SchoolClass>  fetchSchoolClassLike(Integer schoolId,String classname){
		List<SchoolClass> list=entityManager().createQuery("SELECT sl FROM SchoolClass sl WHERE sl.schoolId.schoolId="+schoolId+" "
				+ " AND sl.className LIKE '%"+classname+"%'").getResultList();
		return list;
	}
	
	public static List<SchoolClass>  findSchoolClass(Integer schoolClassId,Integer schoolId){
		List<SchoolClass> list=entityManager().createQuery("SELECT sl FROM SchoolClass sl WHERE sl.schoolId.schoolId="+schoolId+" AND sl.schoolClassId="+schoolClassId+" ").getResultList();
		return list;
	}
	
	public static List<SchoolClass>  findAllSchoolClasses(Integer schoolId){
		List<SchoolClass> list=entityManager().createQuery("SELECT sl FROM SchoolClass sl WHERE sl.schoolId.schoolId="+schoolId+"").getResultList();
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
