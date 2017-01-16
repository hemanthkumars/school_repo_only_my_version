package com.school.base.domain;
import java.util.List;

import javax.persistence.Column;

import org.springframework.roo.addon.dbre.RooDbManaged;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.tostring.RooToString;
import org.springframework.roo.addon.json.RooJson;

@RooJavaBean
@RooJpaActiveRecord(versionField = "", table = "school_class_section")
@RooDbManaged(automaticallyDelete = true)
@RooToString(excludeFields = { "homeWorks", "students", "studentClassHistories", "subjectStaffClasses", "classTeacherId", "schoolClassId", "sectionId" })
@RooJson
public class SchoolClassSection {
	
	@Column(name = "CODE")
    private String code;
	
	@Column(name = "SCHOOL_CLASS_SECTION_NAME")
    private String schoolClassSectionName;
	
	public String getSchoolClassSectionName() {
		return schoolClassSectionName;
	}

	public void setSchoolClassSectionName(String schoolClassSectionName) {
		this.schoolClassSectionName = schoolClassSectionName;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public static List<SchoolClassSection>  findSchoolClassSection(Integer schoolClassId,Integer schoolId){
		List<SchoolClassSection> list=entityManager().createQuery("SELECT sl FROM SchoolClassSection sl WHERE sl.schoolClassId.schoolId.schoolId="+schoolId+" AND sl.schoolClassId.schoolClassId="+schoolClassId+" ").getResultList();
		
		return list;
	}
	
	public static List<SchoolClassSection>  findSchoolClassSectionActual(Integer schoolClassSectionId,Integer schoolId){
		List<SchoolClassSection> list=entityManager().createQuery("SELECT sl FROM SchoolClassSection sl WHERE sl.schoolClassSectionId="+schoolClassSectionId+" AND sl.schoolClassId.schoolId="+schoolId+" ").getResultList();
		
		return list;
	}
	
	public static List<SchoolClassSection>  findSchoolClassSectionFull(Integer schoolId){
		List<SchoolClassSection> list=entityManager().createQuery("SELECT sl FROM SchoolClassSection sl WHERE sl.schoolClassId.schoolId.schoolId="+schoolId+"  ").getResultList();
		
		return list;
	}
	
	public static List<SchoolClassSection>  findSchoolClassSectionLike(Integer schoolId,String schoolClassSectionName ){
		List<SchoolClassSection> list=entityManager().createQuery("SELECT sl FROM SchoolClassSection sl WHERE sl.schoolClassId.schoolId.schoolId="+schoolId+" AND sl.schoolClassSectionName LIKE '%"+schoolClassSectionName+"%' ").getResultList();
		
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
