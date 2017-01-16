package com.school.base.domain;
import javax.persistence.Column;

import org.springframework.roo.addon.dbre.RooDbManaged;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.tostring.RooToString;

@RooJavaBean
@RooJpaActiveRecord(versionField = "", table = "school")
@RooDbManaged(automaticallyDelete = true)
@RooToString(excludeFields = { "departments", "examinations", "homeWorkTypes", "schoolAcademics", "schoolCalendars", "schoolClasses", "schoolDeparments", "schoolFeeReceipts", "schoolFeeTypes", "schoolGrades", "schoolGroups", "schoolHolidays", "schoolLogins", "schoolSessions", "schoolSmsTemplates", "schoolSubjects", "smss", "staffs", "students" })
@RooJson
public class School {
	
	@Column(name = "TOTAL_NO_SMS_REMAINING")
    private Integer totalNoOfSmsRemaining;
	
	@Column(name = "SMS_USERNAME")
    private String smsUserName;
	
	@Column(name = "API_KEY")
    private String apiKey;
	
	@Column(name = "SMS_SENDER_ID")
    private String smsSenderId;
	
	public Integer getTotalNoOfSmsRemaining() {
		return totalNoOfSmsRemaining;
	}

	public void setTotalNoOfSmsRemaining(Integer totalNoOfSmsRemaining) {
		this.totalNoOfSmsRemaining = totalNoOfSmsRemaining;
	}



	public String getSmsUserName() {
		return smsUserName;
	}



	public void setSmsUserName(String smsUserName) {
		this.smsUserName = smsUserName;
	}



	public String getApiKey() {
		return apiKey;
	}



	public void setApiKey(String apiKey) {
		this.apiKey = apiKey;
	}



	public String getSmsSenderId() {
		return smsSenderId;
	}



	public void setSmsSenderId(String smsSenderId) {
		this.smsSenderId = smsSenderId;
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
