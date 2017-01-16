package com.school.base.domain;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;

import org.springframework.roo.addon.dbre.RooDbManaged;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.tostring.RooToString;

@RooJavaBean
@RooJpaActiveRecord(versionField = "", table = "school_fee")
@RooDbManaged(automaticallyDelete = true)
@RooToString(excludeFields = { "receiptSchoolFees", "schoolFeeTypeId", "studentId", "schoolAcademicYearId", "auditUserId" })
@RooJson
public class SchoolFee {
	
	@Column(name = "AUDIT_CREATED_DT_TIME")
    private Date auditCreatedDtTime;
	
	
	public Date getAuditCreatedDtTime() {
		return auditCreatedDtTime;
	}

	public void setAuditCreatedDtTime(Date auditCreatedDtTime) {
		this.auditCreatedDtTime = auditCreatedDtTime;
	}

	public static List<SchoolFee>  findSchoolFee(Integer studentId,Integer schoolId){
		List<SchoolFee> list=entityManager().createQuery("SELECT sa FROM SchoolFee  sa WHERE sa.studentId.schoolId.schoolId="+schoolId+" AND sa.studentId.studentId="+studentId+"  ").getResultList();
		return list;
	}
	
	public static List<SchoolFee>  findSchoolFee(Long schoolFeeId,Integer schoolId){
		List<SchoolFee> list=entityManager().createQuery("SELECT sa FROM SchoolFee  sa WHERE sa.studentId.schoolId.schoolId="+schoolId+" AND sa.schoolFeeId="+schoolFeeId+"  ").getResultList();
		return list;
	}
	
	public static List<SchoolFee>  findSchoolFeeActual(Integer schoolId,Integer schoolFeeId){
		List<SchoolFee> list=entityManager().createQuery("SELECT sa FROM SchoolFee  sa WHERE sa.studentId.schoolId.schoolId="+schoolId+" AND sa.schoolFeeId="+schoolFeeId+"  ").getResultList();
		return list;
	}
	
	public static List<SchoolFee>  findSchoolFeeByType(Integer schoolId,Integer schoolFeeTypeId){
		List<SchoolFee> list=entityManager().createQuery("SELECT sl FROM SchoolFee sl WHERE sl.studentId.schoolId.schoolId="+schoolId+" AND sl.schoolFeeTypeId.schoolFeeTypeId="+schoolFeeTypeId+"").getResultList();
		return list;
	}
	
	public static List<SchoolFee>  findSchoolFeeByType(Integer schoolId,Integer schoolFeeTypeId,Integer schoolAcademicYearId,Integer studentId){
		List<SchoolFee> list=entityManager().createQuery("SELECT sl FROM SchoolFee sl WHERE sl.studentId.schoolId.schoolId="+schoolId+" "
				+ " AND sl.schoolFeeTypeId.schoolFeeTypeId="+schoolFeeTypeId+" AND sl.schoolAcademicYearId.schoolAcademicYearId="+schoolAcademicYearId+" "
						+ " AND  sl.studentId.studentId="+studentId+" ").getResultList();
		return list;
	}
	
	public static List<Object[]>  findStudentFeeDefnData(Integer schoolId,Integer schoolClassSectionId,Integer schoolAcademicYearId){
		StringBuilder query= new StringBuilder();
		query.append(" SELECT sf.SCHOOL_FEE_ID,sft.FEE_TYPE,scs.SCHOOL_CLASS_SECTION_ID,");
		query.append(" sf.TOTAL_AMOUNT,sf.PAID_AMOUNT,sf.BALANCE,");
		query.append(" s.STUDENT_ID,s.FIRST_NAME,s.FATHER_NAME,");
		query.append(" s.FATHER_MOBILE");
		query.append(" FROM school_fee sf");
		query.append(" JOIN student s");
		query.append(" JOIN school_fee_type sft");
		query.append(" JOIN school_class_section scs JOIN school_class scl");
		query.append(" WHERE sf.STUDENT_ID=S.STUDENT_ID");
		query.append(" AND sft.SCHOOL_FEE_TYPE_ID=sf.SCHOOL_FEE_TYPE_ID");
		query.append(" AND scs.SCHOOL_CLASS_SECTION_ID=s.SCHOOL_CLASS_SECTION_ID");
		query.append(" AND scs.SCHOOL_CLASS_SECTION_ID="+schoolClassSectionId+"");
		query.append(" AND sf.SCHOOL_ACADEMIC_YEAR_ID="+schoolAcademicYearId+"");
		query.append(" AND scl.SCHOOL_ID="+schoolId+" AND scl.SCHOOL_CLASS_ID=scs.SCHOOL_CLASS_ID ");
		query.append(" GROUP BY sf.SCHOOL_FEE_ID");
		
		return entityManager().createNativeQuery(query.toString()).getResultList();
	}
	
	
	public static List<Object[]>  findStudentFeeDefnDataBySchoolClassId(Integer schoolId,Integer schoolClassId,Integer schoolAcademicYearId){
		StringBuilder query= new StringBuilder();
		query.append(" SELECT sf.SCHOOL_FEE_ID,sft.FEE_TYPE,scs.SCHOOL_CLASS_SECTION_ID,");
		query.append(" sf.TOTAL_AMOUNT,sf.PAID_AMOUNT,sf.BALANCE,");
		query.append(" s.STUDENT_ID,s.FIRST_NAME,s.FATHER_NAME,");
		query.append(" s.FATHER_MOBILE,scs.CODE");
		query.append(" FROM school_fee sf");
		query.append(" JOIN student s");
		query.append(" JOIN school_fee_type sft");
		query.append(" JOIN school_class_section scs JOIN school_class scl");
		query.append(" WHERE sf.STUDENT_ID=S.STUDENT_ID");
		query.append(" AND sft.SCHOOL_FEE_TYPE_ID=sf.SCHOOL_FEE_TYPE_ID");
		query.append(" AND scs.SCHOOL_CLASS_SECTION_ID=s.SCHOOL_CLASS_SECTION_ID");
		query.append(" AND scl.SCHOOL_CLASS_ID="+schoolClassId+"");
		query.append(" AND sf.SCHOOL_ACADEMIC_YEAR_ID="+schoolAcademicYearId+"");
		query.append(" AND scl.SCHOOL_ID="+schoolId+" AND scl.SCHOOL_CLASS_ID=scs.SCHOOL_CLASS_ID ");
		query.append(" GROUP BY sf.SCHOOL_FEE_ID");
		
		return entityManager().createNativeQuery(query.toString()).getResultList();
	}
	
	public static synchronized void generateReceiptNo(Integer schoolId){
		List<SchoolFeeReceipt> schoolFeeReceipts=entityManager().createQuery("SELECT sfr FROM SchoolFeeReceipt sfr  "
				+ " WHERE sfr.schoolReceiptNo =0 AND sfr.schoolId.schoolId="+schoolId+"").getResultList();
		List<Integer> maxReceiptNo=entityManager().createNativeQuery(" SELECT MAX(SCHOOL_RECEIPT_NO) FROM `school_fee_receipt` WHERE SCHOOL_ID="+schoolId+"	").getResultList();
		Integer maxNo=0;
		if(maxReceiptNo.get(0)==null){
			maxNo=0;
		}else{
			maxNo= maxReceiptNo.get(0);
		}
		
		for (SchoolFeeReceipt schoolFeeReceipt : schoolFeeReceipts) {
			maxNo+=1;
			schoolFeeReceipt.setSchoolReceiptNo(maxNo);
			schoolFeeReceipt.merge();
			
		}
	}
	
	
	public static List<Object[]>  findOnlyReceiptForStudentId(Integer studentId,Integer schoolAcademicYearId){
		StringBuilder query= new StringBuilder();
		query.append(" SELECT sfr.RECEIPT_TOTAL_AMOUNT,");
		query.append(" sfr.AUDIT_CREATED_DT_TIME,");
		query.append(" s.FIRST_NAME,sfr.SCHOOL_RECEIPT_NO,");
		query.append(" sfr.OTHER_DETAILS,pt.PAYMENT_TYPE,sfr.SCHOOL_FEE_RECEIPT_ID");
		query.append(" FROM school_fee_receipt sfr");
		query.append(" JOIN receipt_school_fee rcf");
		query.append(" JOIN school_fee sf");
		query.append(" JOIN payment_type pt");
		query.append(" JOIN staff s");
		query.append(" WHERE sfr.SCHOOL_FEE_RECEIPT_ID=rcf.SCHOOL_FEE_RECEIPT_ID");
		query.append(" AND rcf.SCHOOL_FEE_ID=sf.SCHOOL_FEE_ID");
		query.append(" AND pt.PAYMENT_TYPE_ID=sfr.PAYMENT_TYPE_ID");
		query.append(" AND sf.STUDENT_ID="+studentId+"");
		query.append(" AND s.STAFF_ID=sfr.AUDIT_USER_ID");
		query.append(" AND sf.SCHOOL_ACADEMIC_YEAR_ID="+schoolAcademicYearId+"");
		query.append(" GROUP BY sfr.SCHOOL_FEE_RECEIPT_ID");

		
		return entityManager().createNativeQuery(query.toString()).getResultList();
	}
	
	public static List<Object[]>  findAllFullReceiptDetails(Integer studentId,Integer schoolAcademicYearId){
		StringBuilder query= new StringBuilder();
		query.append(" SELECT sft.FEE_TYPE,rcf.PAID_AMOUNT,sfr.SCHOOL_FEE_RECEIPT_ID,");
		query.append(" sfr.RECEIPT_TOTAL_AMOUNT,");
		query.append(" sfr.AUDIT_CREATED_DT_TIME,");
		query.append(" s.FIRST_NAME,sfr.SCHOOL_RECEIPT_NO,");
		query.append(" sfr.OTHER_DETAILS,pt.PAYMENT_TYPE");
		query.append(" FROM school_fee_receipt sfr");
		query.append(" JOIN receipt_school_fee rcf");
		query.append(" JOIN school_fee sf");
		query.append(" JOIN payment_type pt");
		query.append(" JOIN staff s");
		query.append(" JOIN school_fee_type sft");
		query.append(" WHERE sfr.SCHOOL_FEE_RECEIPT_ID=rcf.SCHOOL_FEE_RECEIPT_ID");
		query.append(" AND rcf.SCHOOL_FEE_ID=sf.SCHOOL_FEE_ID");
		query.append(" AND pt.PAYMENT_TYPE_ID=sfr.PAYMENT_TYPE_ID");
		query.append(" AND sf.STUDENT_ID="+studentId+"");
		query.append(" AND sft.SCHOOL_FEE_TYPE_ID=sf.SCHOOL_FEE_TYPE_ID");
		query.append(" AND s.STAFF_ID=sfr.AUDIT_USER_ID");
		query.append(" AND sf.SCHOOL_ACADEMIC_YEAR_ID="+schoolAcademicYearId+"");
		query.append(" GROUP BY rcf.RECEIPT_SCHOOL_FEE_ID");
		return entityManager().createNativeQuery(query.toString()).getResultList();
	}
	
	public static List<Object[]>  findDueList(Integer schoolId,Integer schoolAcademicYearId){
		StringBuilder query= new StringBuilder();
		query.append(" SELECT SUM(sf.TOTAL_AMOUNT),SUM(sf.PAID_AMOUNT),");
		query.append(" SUM(sf.BALANCE),s.STUDENT_ID,s.FIRST_NAME,s.FATHER_NAME,s.FATHER_MOBILE,scs.`CODE`");
		query.append(" FROM school_fee sf");
		query.append(" JOIN school_academic sa ");
		query.append(" JOIN student s ");
		query.append(" JOIN school_class_section scs");
		query.append(" WHERE sf.STUDENT_ID=s.STUDENT_ID");
		query.append(" AND sa.SCHOOL_ACADEMIC_YEAR_ID=sf.SCHOOL_ACADEMIC_YEAR_ID");
		query.append(" AND scs.SCHOOL_CLASS_SECTION_ID=s.SCHOOL_CLASS_SECTION_ID");
		query.append(" AND s.SCHOOL_ID="+schoolId+"");
		query.append(" AND sa.SCHOOL_ACADEMIC_YEAR_ID="+schoolAcademicYearId+"");
		query.append(" GROUP BY s.STUDENT_ID");
		query.append(" HAVING SUM(sf.BALANCE)!=0");
		query.append(" ORDER BY SUM(sf.BALANCE) DESC");

		return entityManager().createNativeQuery(query.toString()).getResultList();
	}
	
	public static List<Object[]>  findFeeCollection(Integer schoolId,Integer schoolAcademicYearId,String fromDate,String toDate){
		StringBuilder query= new StringBuilder();
		query.append(" SELECT sfr.RECEIPT_TOTAL_AMOUNT,sfr.SCHOOL_RECEIPT_NO,s.FIRST_NAME,");
		query.append(" scs.`CODE`,sfr.AUDIT_CREATED_DT_TIME,sfr.SCHOOL_FEE_RECEIPT_ID,pt.PAYMENT_TYPE,sfr.OTHER_DETAILS");
		query.append(" FROM receipt_school_fee rsf");
		query.append(" JOIN school_fee sf");
		query.append(" JOIN school_fee_receipt sfr");
		query.append(" JOIN student s");
		query.append(" JOIN school_class_section scs");
		query.append(" JOIN payment_type pt");
		query.append(" WHERE rsf.SCHOOL_FEE_ID=sf.SCHOOL_FEE_ID");
		query.append(" AND rsf.SCHOOL_FEE_RECEIPT_ID=sfr.SCHOOL_FEE_RECEIPT_ID");
		query.append(" AND sf.SCHOOL_ACADEMIC_YEAR_ID="+schoolAcademicYearId+"");
		query.append(" AND sfr.SCHOOL_ID="+schoolId+"");
		query.append(" AND  s.SCHOOL_CLASS_SECTION_ID=scs.SCHOOL_CLASS_SECTION_ID");
		query.append(" AND s.STUDENT_ID=sf.STUDENT_ID");
		query.append(" AND pt.PAYMENT_TYPE_ID=sfr.PAYMENT_TYPE_ID");
		if(toDate!=null){
			query.append(" AND sfr.AUDIT_CREATED_DT_TIME BETWEEN '"+fromDate+"' AND '"+toDate+"'");	
		}else{
			query.append(" AND sfr.AUDIT_CREATED_DT_TIME LIKE '"+fromDate+"%' ");
		}
		
		query.append(" GROUP BY sfr.SCHOOL_FEE_RECEIPT_ID");


		return entityManager().createNativeQuery(query.toString()).getResultList();
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
