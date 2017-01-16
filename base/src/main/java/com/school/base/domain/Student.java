package com.school.base.domain;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.roo.addon.dbre.RooDbManaged;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.tostring.RooToString;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.roo.addon.json.RooJson;

@RooJavaBean
@RooJpaActiveRecord(versionField = "", table = "student")
@RooDbManaged(automaticallyDelete = true)
@RooToString(excludeFields = { "schoolFees", "smss", "studentAttedances", "studentClassHistories", "studentExaminations", "studentGroups", "studentLogins", "auditUserId", "schoolId", "cityId", "stateId", "countryId", "schoolClassSectionId", "genderId", "bloodGroupId", "schoolGroupId", "motherTongueId", "casteId", "religionId", "schoolAcademicYearId" })
@RooJson
public class Student {
	
	
	 private transient String dobStr;
	public String getDobStr() {
		return dobStr;
	}
	public void setDobStr(String dobStr) {
		this.dobStr = dobStr;
	}
	@Column(name = "STUDENT_STATUS_ID")
    private Integer studentStatusId;

	public Integer getStudentStatusId() {
		return studentStatusId;
	}
	public void setStudentStatusId(Integer studentStatusId) {
		this.studentStatusId = studentStatusId;
	}
	@Column(name = "AUDIT_CREATED_DT_TIME")
    private Date auditCreatedDtTime;
    
    @Column(name = "AUDIT_MODIFIED_DT_TIME")
    private Date auditModifiedDtTime;
    
    @Column(name = "REG_NO")
    private Integer regNo;
    
    
	public Integer getRegNo() {
		return regNo;
	}
	public void setRegNo(Integer regNo) {
		this.regNo = regNo;
	}
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
	public static List<Student>  findStudentBySchoolClassSectioId(Integer schoolClassSectioId,Integer schoolId){
		List<Student> list=entityManager().createQuery("SELECT sl FROM Student sl WHERE sl.schoolClassSectionId.schoolClassSectionId="+schoolClassSectioId+" AND sl.schoolId.schoolId="+schoolId+" ").getResultList();
		return list;
	}
	
	public static List<Student>  findStudentByStudentIds(String studentIds,Integer schoolId){
		List<Student> list=entityManager().createQuery("SELECT sl FROM Student sl WHERE sl.studentId IN "+studentIds+" AND sl.schoolId.schoolId="+schoolId+" ").getResultList();
		return list;
	}
	
	public static List<Object[]>  findStudentBySchoolClassSectioIdFeeCollect(Integer schoolClassSectioId,Integer schoolId,Integer schoolAcademicYearId){
		StringBuilder query=new StringBuilder();
		query.append(" SELECT s.STUDENT_ID,s.FIRST_NAME,SUM(sf.TOTAL_AMOUNT),SUM(sf.PAID_AMOUNT),SUM(sf.BALANCE),");
		query.append(" scs.`CODE`,sf.SCHOOL_FEE_ID,s.FATHER_NAME");
		query.append(" FROM student s");
		query.append(" LEFT OUTER JOIN school_fee sf ON sf.STUDENT_ID=s.STUDENT_ID");
		query.append(" JOIN school_class_section scs");
		query.append(" WHERE scs.SCHOOL_CLASS_SECTION_ID=s.SCHOOL_CLASS_SECTION_ID");
		query.append(" AND sf.SCHOOL_ACADEMIC_YEAR_ID="+schoolAcademicYearId+"");
		query.append(" AND scs.SCHOOL_CLASS_SECTION_ID="+schoolClassSectioId+"");
		query.append(" AND s.SCHOOL_ID="+schoolId+"");
		query.append(" GROUP BY s.STUDENT_ID");
		query.append(" UNION");
		query.append(" SELECT s.STUDENT_ID,s.FIRST_NAME,SUM(sf.TOTAL_AMOUNT),SUM(sf.PAID_AMOUNT),SUM(sf.BALANCE),");
		query.append(" scs.`CODE`,sf.SCHOOL_FEE_ID,s.FATHER_NAME");
		query.append(" FROM student s");
		query.append(" LEFT OUTER JOIN school_fee sf ON sf.STUDENT_ID=s.STUDENT_ID");
		query.append(" JOIN school_class_section scs");
		query.append(" WHERE scs.SCHOOL_CLASS_SECTION_ID=s.SCHOOL_CLASS_SECTION_ID");
		query.append(" AND ISNULL(sf.SCHOOL_ACADEMIC_YEAR_ID)");
		query.append(" AND scs.SCHOOL_CLASS_SECTION_ID="+schoolClassSectioId+"");
		query.append(" AND s.SCHOOL_ID="+schoolId+"");
		query.append(" GROUP BY s.STUDENT_ID");
		query.append(" ORDER BY FIRST_NAME");

		
		return entityManager().createNativeQuery(query.toString()).getResultList();
	}
	
	public static List<Student>  findStudentBySchoolClassId(Integer schoolClassId,Integer schoolId){
		List<Student> list=entityManager().createQuery("SELECT sl FROM Student sl WHERE sl.schoolClassSectionId.schoolClassId.schoolClassId="+schoolClassId+" AND sl.schoolId.schoolId="+schoolId+" ").getResultList();
		return list;
	}
	
	public static List<Integer>  findStudentIdsBySchoolClassId(Integer schoolClassId,Integer schoolId){
		List<Integer> list=entityManager().createQuery("SELECT sl.studentId FROM Student sl WHERE sl.schoolClassSectionId.schoolClassId.schoolClassId="+schoolClassId+" AND sl.schoolId.schoolId="+schoolId+" ").getResultList();
		return list;
	}
	
	
	public static List<Integer>  findStudentIdsBySchoolClassSectioId(Integer schoolClassSectioId,Integer schoolId){
		List<Integer> list=entityManager().createQuery("SELECT sl.studentId FROM Student sl WHERE sl.schoolClassSectionId.schoolClassSectionId="+schoolClassSectioId+" AND sl.schoolId.schoolId="+schoolId+" ").getResultList();
		return list;
	}
	
	public static List<Student>  findStudent(Integer studentId,Integer schoolId){
		List<Student> list=entityManager().createQuery("SELECT sl FROM Student sl WHERE sl.studentId="+studentId+" AND sl.schoolId.schoolId="+schoolId+" ").getResultList();
		
		return list;
	}
	
	public static List<Student>  findStudentByNameLike(String firstName,Integer schoolId){
		List<Student> list=entityManager().createQuery("SELECT sl FROM Student sl WHERE sl.firstName LIKE '%"+firstName+"%' AND sl.schoolId.schoolId="+schoolId+" ").getResultList();
		return list;
	}
	
	@Transactional
	public static Integer updateStudent(String studentIds,Integer schoolId,Integer schoolClassSectionId){
		StringBuilder  query= new StringBuilder();
		query.append("  UPDATE student s");
		query.append("  SET SCHOOL_CLASS_SECTION_ID="+schoolClassSectionId+"");
		query.append("  WHERE s.STUDENT_ID IN "+studentIds+"");
		query.append("  AND s.SCHOOL_ID="+schoolId+"");
		Integer updated =entityManager().createNativeQuery(query.toString()).executeUpdate();
		
		return updated;
	}
	
	
	
	public static synchronized List<Student>  generateAdmissionNo(Integer schoolId){
		 List<Section> sections=Section.findAllSections();
		List<Student> emptyAdmisionNoStudents=entityManager().createQuery("SELECT sl FROM Student sl WHERE  sl.schoolId.schoolId="+schoolId+" AND sl.admissionNo = "+null+"").getResultList();
		StringBuilder query= new StringBuilder();
		query.append(" SELECT s.ADMISSION_NO,s.STUDENT_ID");
		query.append(" FROM student s");
		query.append(" WHERE s.STUDENT_ID ");
		query.append(" IN (");
		query.append(" SELECT MAX( s.STUDENT_ID) ");
		query.append(" FROM student s  ");
		query.append(" WHERE !ISNULL(s.ADMISSION_NO)");
		query.append(" AND s.SCHOOL_ID="+schoolId+" )");
		for (Student student : emptyAdmisionNoStudents) {
			List<Object[]> list=entityManager().createNativeQuery(query.toString()).getResultList();
			String admissionNo=null;
			if(list.isEmpty()){
				admissionNo="A001";
				student.setAdmissionNo(admissionNo);
				student.persist();
			}else{
			   	String lastAdmitNo=(String) list.get(0)[0];
			   	String admitLetter=lastAdmitNo.substring(0, 1);
			   	Integer admitNo=Integer.parseInt(lastAdmitNo.substring(1, 4));
			   	admitNo+=1;
			   	if(admitNo>999){
			   		//changeadmitletterLetter
			   		String newAdmitNo=String.valueOf(admitNo);
			   		if(newAdmitNo.length()!=3){
			   			if(newAdmitNo.length()==1){
			   				newAdmitNo="00"+newAdmitNo;
			   			}
                        if(newAdmitNo.length()==2){
                        	newAdmitNo="0"+newAdmitNo;
			   			}
			   			
			   		}
			   		boolean takeNextLetter=false;
			   		for (Section section : sections) {
			   			if(takeNextLetter){
			   				admitLetter=section.getSection().toUpperCase();
			   				break;
			   			}
						if(section.getSection().equalsIgnoreCase(admitLetter)){
							takeNextLetter=true;
						}
					}
			   		admissionNo=admitLetter+newAdmitNo;
			   	
			   	}else{
			   		String newAdmitNo=String.valueOf(admitNo);
			   		if(newAdmitNo.length()!=3){
			   			if(newAdmitNo.length()==1){
			   				newAdmitNo="00"+newAdmitNo;
			   			}
                        if(newAdmitNo.length()==2){
                        	newAdmitNo="0"+newAdmitNo;
			   			}
			   			
			   		}
			   		admissionNo=admitLetter+newAdmitNo;
			   	}
			   	student.setAdmissionNo(admissionNo);
			   	student.persist();
			   	
			   	
			}
			
			
		}
		
		return null;
	}

    
	public static List<Object[]> findBirthDayList(String month,Integer schoolId){
		StringBuilder  query= new StringBuilder();
		query.append(" SELECT s.STUDENT_ID");
		query.append(" ,s.FIRST_NAME,s.DOB,");
		query.append(" s.FATHER_NAME,scs.`CODE`,");
		query.append(" scs.SCHOOL_CLASS_SECTION_NAME,g.GENDER");
		query.append(" FROM student s");
		query.append(" LEFT OUTER JOIN gender g ON g.GENDER_ID=s.GENDER_ID");
		query.append(" LEFT OUTER JOIN school_class_section scs ON scs.SCHOOL_CLASS_SECTION_ID=s.SCHOOL_CLASS_SECTION_ID");
		query.append(" WHERE DOB LIKE '%-"+month+"-%'");
		query.append(" AND s.SCHOOL_ID="+schoolId+"");
		query.append(" AND !ISNULL(scs.SCHOOL_CLASS_SECTION_ID)");
		query.append(" ORDER BY MONTH(s.DOB)");
		List<Object[]> result =entityManager().createNativeQuery(query.toString()).getResultList();
		return result;
	}
	
	public static List<Object[]> findStudentBySchoolClassOrSchoolClassSection(Map<String, Integer> map){
		Integer fetchId=0;
		
		if(map.containsKey("schoolClass")){
			fetchId=map.get("schoolClass");
		}else{
			fetchId=map.get("schoolClassSection");
		}
		Integer schoolId=map.get("schoolId");
		
		StringBuilder  query= new StringBuilder();
		query.append(" SELECT s.STUDENT_ID,s.FIRST_NAME,");
		query.append(" s.FATHER_MOBILE,s.FATHER_NAME,scs.CODE");
		query.append(" FROM student s");
		query.append(" JOIN school_class_section scs");
		query.append(" JOIN school_class sc");
		query.append(" WHERE s.SCHOOL_ID="+schoolId+"");
		if(map.containsKey("schoolClass")){
			query.append(" AND sc.SCHOOL_CLASS_ID="+fetchId+"");
		}else if(map.containsKey("schoolClassSection")){
			query.append(" AND s.SCHOOL_CLASS_SECTION_ID="+fetchId+"");
		}
		query.append(" AND scs.SCHOOL_CLASS_SECTION_ID=s.SCHOOL_CLASS_SECTION_ID");
		query.append(" AND scs.SCHOOL_CLASS_ID=sc.SCHOOL_CLASS_ID");
		query.append(" GROUP BY s.STUDENT_ID ORDER BY scs.SCHOOL_CLASS_SECTION_ID");
		

		
		List<Object[]> result =entityManager().createNativeQuery(query.toString()).getResultList();
		return result;
	}
	
	public static List<Object[]> findStudentAttendanceBySchoolClassOrSchoolClassSection(Map<String, String> map){
		StringBuilder  query= new StringBuilder();
		query.append(" SELECT s.STUDENT_ID,");
		query.append(" s.FIRST_NAME , atst.`CODE` as c1 ,scs.`CODE`,");
		query.append(" s.FATHER_NAME,s.FATHER_MOBILE,sses.SESSION_NAME,");
		query.append(" atst.`STATUS`");
		query.append(" FROM student s");
		query.append(" JOIN school_class_section scs");
		query.append(" JOIN school_class sc");
		query.append(" LEFT OUTER JOIN student_attedance sa ON sa.STUDENT_ID=s.STUDENT_ID");
		query.append(" LEFT OUTER JOIN attendance_status atst ON atst.ATTENDANCE_STATUS_ID=sa.ATTENDANCE_STATUS_ID");
		query.append(" LEFT OUTER JOIN school_session sses ON sses.SCHOOL_SESSION_ID=sa.SCHOOL_SESSION_ID");
		query.append(" WHERE sa.ATTENDANCE_DATE LIKE '"+map.get("attendanceDate")+"%' ");
		query.append(" AND scs.SCHOOL_CLASS_ID=sc.SCHOOL_CLASS_ID");
		query.append(" AND sa.SCHOOL_SESSION_ID ="+map.get("schoolSessionId")+"");
		if(map.containsKey("schoolClass")){
			query.append(" AND sc.SCHOOL_CLASS_ID="+map.get("schoolClass")+"");
		}
		if(map.containsKey("schoolClassSection")){
			query.append(" AND s.SCHOOL_CLASS_SECTION_ID="+map.get("schoolClassSection")+"");	
		}
		query.append(" AND s.SCHOOL_ID="+map.get("schoolId")+"");
		query.append(" OR ISNULL(sa.SCHOOL_SESSION_ID)");
		query.append(" GROUP BY s.STUDENT_ID");
		List<Object[]> result =entityManager().createNativeQuery(query.toString()).getResultList();
		return result;
	}
	
	public static List<Object[]> findStudentAttendanceBySchoolClassOrSchoolClassSection2(Map<String, String> map){
		StringBuilder  query= new StringBuilder();
		query.append(" SELECT s.STUDENT_ID,");
		query.append(" s.FIRST_NAME , atst.`CODE` as c1 ,scs.`CODE`,");
		query.append(" s.FATHER_NAME,s.FATHER_MOBILE,sses.SESSION_NAME,");
		query.append(" atst.`STATUS`");
		query.append(" FROM student s");
		query.append(" JOIN school_class_section scs");
		query.append(" JOIN school_class sc");
		query.append(" LEFT OUTER JOIN student_attedance sa ON sa.STUDENT_ID=s.STUDENT_ID");
		query.append(" LEFT OUTER JOIN attendance_status atst ON atst.ATTENDANCE_STATUS_ID=sa.ATTENDANCE_STATUS_ID");
		query.append(" LEFT OUTER JOIN school_session sses ON sses.SCHOOL_SESSION_ID=sa.SCHOOL_SESSION_ID");
		query.append(" WHERE sa.ATTENDANCE_DATE LIKE '"+map.get("attendanceDate")+"%' ");
		query.append(" OR  ISNULL(sa.ATTENDANCE_DATE)");
		query.append(" AND scs.SCHOOL_CLASS_ID=sc.SCHOOL_CLASS_ID");
		query.append(" AND sa.SCHOOL_SESSION_ID ="+map.get("schoolSessionId")+"");
		if(map.containsKey("schoolClass")){
			query.append(" AND sc.SCHOOL_CLASS_ID="+map.get("schoolClass")+"");
		}
		if(map.containsKey("schoolClassSection")){
			query.append(" AND s.SCHOOL_CLASS_SECTION_ID="+map.get("schoolClassSection")+"");	
		}
		query.append(" AND s.SCHOOL_ID="+map.get("schoolId")+"");
		query.append(" OR ISNULL(sa.SCHOOL_SESSION_ID)");
		query.append(" GROUP BY s.STUDENT_ID");
		List<Object[]> result =entityManager().createNativeQuery(query.toString()).getResultList();
		return result;
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
