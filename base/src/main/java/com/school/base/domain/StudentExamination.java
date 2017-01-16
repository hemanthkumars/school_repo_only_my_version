package com.school.base.domain;
import java.util.List;

import org.springframework.roo.addon.dbre.RooDbManaged;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.tostring.RooToString;
import org.springframework.roo.addon.json.RooJson;

@RooJavaBean
@RooJpaActiveRecord(versionField = "", table = "student_examination")
@RooDbManaged(automaticallyDelete = true)
@RooToString(excludeFields = { "studentId", "classExaminationId", "gradeId", "auditUserId" })
@RooJson
public class StudentExamination {
	
	public static List<StudentExamination>  findStudentExaminationByStudentId(Integer studentId,Integer schoolId){
		List<StudentExamination> list=entityManager().createQuery("SELECT sa FROM StudentExamination  sa WHERE sa.studentId.schoolId.schoolId="+schoolId+" AND sa.studentId.studentId="+studentId+"  ").getResultList();
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
