package com.school.base.domain;
import java.util.List;

import org.springframework.roo.addon.dbre.RooDbManaged;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.tostring.RooToString;

@RooJavaBean
@RooJpaActiveRecord(versionField = "", table = "school_login")
@RooDbManaged(automaticallyDelete = true)
@RooToString(excludeFields = { "schoolId", "roleId", "staffId" })
@RooJson
public class SchoolLogin {
	
	public static SchoolLogin  authenticateLogin(String userName,String password){
		List<SchoolLogin> logins=entityManager().createQuery("SELECT sl FROM SchoolLogin sl WHERE sl.userName='"+userName+"' "
				+ "  AND sl.password='"+password+"' ").getResultList();
		if(logins.isEmpty()){
			return null;
		}else{
			return logins.get(0);
		}
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
