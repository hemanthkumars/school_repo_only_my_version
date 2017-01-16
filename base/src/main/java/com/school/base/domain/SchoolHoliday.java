package com.school.base.domain;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.roo.addon.dbre.RooDbManaged;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.tostring.RooToString;
import org.springframework.roo.addon.json.RooJson;

@RooJavaBean
@RooJpaActiveRecord(versionField = "", table = "school_holiday")
@RooDbManaged(automaticallyDelete = true)
@RooToString(excludeFields = { "auditUserId", "schoolId", "schoolAcademicYearId", "holidayTypeId" })
@RooJson
public class SchoolHoliday {
	
	@ManyToOne
    @JoinColumn(name = "SCHOOL_SESSION_ID", referencedColumnName = "SCHOOL_SESSION_ID")
    private SchoolSession schoolSessionId;
	
	@Column(name = "REASON")
    private String reason;
	
	@Column(name = "AUDIT_CREATED_DT_TIME")
    @NotNull
    private Date auditCreatedDtTime;
    
    @Column(name = "AUDIT_MODIFIED_DT_TIME")
    private Date auditModifiedDtTime;
    
	public Date getAuditCreatedDtTime() {
		return auditCreatedDtTime;
	}
	public void setAuditCreatedDtTime(Date auditCreatedDtTime) {
		this.auditCreatedDtTime = auditCreatedDtTime;
	}
	public Date getAuditModifiedDtTime() {
		return auditModifiedDtTime;
	}
	public void setAuditModifiedDtTime(Date auditModifiedDtTime) {
		this.auditModifiedDtTime = auditModifiedDtTime;
	}
	public SchoolSession getSchoolSessionId() {
		return schoolSessionId;
	}
	public void setSchoolSessionId(SchoolSession schoolSessionId) {
		this.schoolSessionId = schoolSessionId;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	
	
	public static List<SchoolHoliday>  fetchSchoolHoliday(Integer schoolId,Integer schoolAcademicYearId){
		List<SchoolHoliday> list=entityManager().createQuery("SELECT sa FROM SchoolHoliday sa WHERE sa.schoolId.schoolId="+schoolId+" AND sa.schoolAcademicYearId.schoolAcademicYearId="+schoolAcademicYearId+" ").getResultList();
		return list;
	}
	
	public static List<SchoolHoliday>  findSchoolHoliday(Integer schoolHolidayId,Integer schoolId){
		List<SchoolHoliday> list=entityManager().createQuery("SELECT sa FROM SchoolHoliday sa WHERE sa.schoolId.schoolId="+schoolId+" AND sa.schoolHolidayId="+schoolHolidayId+" ").getResultList();
		return list;
	}
	
	public static List<SchoolHoliday>  findSchoolHolidayFromSchoolSessioId(Integer schoolSessionId,Integer schoolId){
		List<SchoolHoliday> list=entityManager().createQuery("SELECT sa FROM SchoolHoliday sa WHERE sa.schoolId.schoolId="+schoolId+" AND sa.schoolSessionId.schoolSessionId="+schoolSessionId+" ").getResultList();
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
