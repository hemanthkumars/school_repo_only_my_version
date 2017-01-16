package com.school.base.domain;
import java.util.List;

import org.springframework.roo.addon.dbre.RooDbManaged;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.tostring.RooToString;

import com.school.base.util.GeneralConstants;

import org.springframework.roo.addon.json.RooJson;

@RooJavaBean
@RooToString
@RooJpaActiveRecord(versionField = "", table = "promotion")
@RooDbManaged(automaticallyDelete = true)
@RooJson
public class Promotion {
	
	public static List<Promotion>  findNotPromoted(Integer fromSchoolClassSectionId,Integer fromAcademicYearId,Integer toAcademicYearId){
		List<Promotion> list=entityManager().createQuery("SELECT sl FROM Promotion sl "
				+ " WHERE sl.fromSchoolAcademicYearId="+fromAcademicYearId+" AND sl.toSchoolAcademicYearId="+toAcademicYearId+" "
						+ " AND sl.fromSchoolClassSectionId="+fromSchoolClassSectionId+" "
								+ " AND sl.promotionStatus='"+GeneralConstants.PROMOTION_STATUS_NOT_PROMOTED+"'").getResultList();
		
		return list;
	}
	
	public static List<Promotion>  findPromotionData(Integer fromSchoolClassSectionId,Integer fromAcademicYearId,Integer toAcademicYearId,String promotionStatus){
		List<Promotion> list=entityManager().createQuery("SELECT sl FROM Promotion sl "
				+ " WHERE sl.fromSchoolAcademicYearId="+fromAcademicYearId+" AND sl.toSchoolAcademicYearId="+toAcademicYearId+" "
						+ " AND sl.fromSchoolClassSectionId="+fromSchoolClassSectionId+" "
								+ " AND sl.promotionStatus IN ("+promotionStatus+")").getResultList();
		
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
