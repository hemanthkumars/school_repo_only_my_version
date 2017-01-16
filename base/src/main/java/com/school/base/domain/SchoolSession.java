package com.school.base.domain;
import java.util.List;

import javax.persistence.Column;

import org.springframework.roo.addon.dbre.RooDbManaged;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.tostring.RooToString;
import org.springframework.roo.addon.json.RooJson;

@RooJavaBean
@RooJpaActiveRecord(versionField = "", table = "school_session")
@RooDbManaged(automaticallyDelete = true)
@RooToString(excludeFields = { "leaveRegisters", "staffAttendances", "studentAttedances", "schoolId" })
@RooJson
public class SchoolSession {
	
	@Column(name = "IS_FULL_DAY_SESSION")
    private Integer isFullDaySession=0;
	
	public Integer getIsFullDaySession() {
		return isFullDaySession;
	}

	public void setIsFullDaySession(Integer isFullDaySession) {
		this.isFullDaySession = isFullDaySession;
	}
	
	
	public static List<SchoolSession>  fetchSchoolSessions(Integer schoolId){
		List<SchoolSession> list=entityManager().createQuery("SELECT sa FROM SchoolSession sa WHERE sa.schoolId.schoolId="+schoolId+" ").getResultList();
		return list;
	}
	
	public static List<SchoolSession>  fetchOnlyFullSchoolSessions(Integer schoolId){
		List<SchoolSession> list=entityManager().createQuery("SELECT sa FROM SchoolSession sa WHERE sa.schoolId.schoolId="+schoolId+" AND sa.isFullDaySession=1").getResultList();
		return list;
	}
	
	public static List<SchoolSession>  findSchoolSession(Integer schoolSessionId,Integer schoolId){
		List<SchoolSession> list=entityManager().createQuery("SELECT sa FROM SchoolSession sa WHERE sa.schoolId.schoolId="+schoolId+" AND sa.schoolSessionId="+schoolSessionId+"  ").getResultList();
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
