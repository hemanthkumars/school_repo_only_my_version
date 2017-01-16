package com.school.base.domain;
import java.util.List;

import org.springframework.roo.addon.dbre.RooDbManaged;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.tostring.RooToString;
import org.springframework.roo.addon.json.RooJson;

@RooJavaBean
@RooJpaActiveRecord(versionField = "", table = "school_sms_template")
@RooDbManaged(automaticallyDelete = true)
@RooToString(excludeFields = { "schoolId" })
@RooJson
public class SchoolSmsTemplate {
	
	public static List<SchoolSmsTemplate>  findAllSmsTemplate(Integer schoolId){
		List<SchoolSmsTemplate> list=entityManager().createQuery("SELECT sa FROM SchoolSmsTemplate  sa WHERE sa.schoolId.schoolId="+schoolId+"   ").getResultList();
		return list;
	}
	
	public static List<SchoolSmsTemplate>  findSmsTemplate(Integer schoolId,Integer templateId){
		List<SchoolSmsTemplate> list=entityManager().createQuery("SELECT sa FROM SchoolSmsTemplate  sa  "
				+ " WHERE sa.schoolId.schoolId="+schoolId+" AND sa.schoolSmsTemplateId="+templateId+"   ").getResultList();
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
