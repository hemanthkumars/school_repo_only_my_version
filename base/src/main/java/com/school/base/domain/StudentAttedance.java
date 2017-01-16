package com.school.base.domain;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Query;
import javax.persistence.TemporalType;

import org.springframework.roo.addon.dbre.RooDbManaged;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.tostring.RooToString;
import org.springframework.transaction.annotation.Transactional;

@RooJavaBean
@RooJpaActiveRecord(versionField = "", table = "student_attedance")
@RooDbManaged(automaticallyDelete = true)
@RooToString(excludeFields = { "auditUserId", "studentId", "subjectId", "schoolAcademicYearId", "schoolSessionId", "attendanceStatusId" })
@RooJson
public class StudentAttedance {
	
	@Column(name = "AUDIT_CREATED_DT_TIME")
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

	public static List<StudentAttedance>  findStudentAttedanceForGivenSession(Integer schoolSessionId,Integer schoolId){
		List<StudentAttedance> list=entityManager().createQuery("SELECT sa FROM StudentAttedance sa WHERE sa.studentId.schoolId.schoolId="+schoolId+" AND sa.schoolSessionId.schoolSessionId="+schoolSessionId+"  ").getResultList();
		return list;
	}
	
	public static List<StudentAttedance>  findStudentAttedanceForStudentId(Integer studentId,Integer schoolId){
		List<StudentAttedance> list=entityManager().createQuery("SELECT sa FROM StudentAttedance sa WHERE sa.studentId.schoolId.schoolId="+schoolId+" AND sa.studentId.studentId="+studentId+"  ").getResultList();
		return list;
	}
	
	public static List<Integer>  findStudentAttedanceForStudentId(String studentIds,Integer schoolId,Date attendanceDate ,Integer schoolSessionId ,Integer schoolAcademicYearId ){
		Query query =entityManager().createQuery("SELECT sa.studentId.studentId FROM StudentAttedance sa  "
				+ " WHERE sa.studentId.schoolId.schoolId="+schoolId+" AND sa.attendanceDate = :attendanceDate "
						+ " AND sa.schoolSessionId.schoolSessionId= "+schoolSessionId+" "
								+ " AND sa.studentId.studentId IN "+studentIds+" AND sa.schoolAcademicYearId.schoolAcademicYearId="+schoolAcademicYearId+"  ");
		query.setParameter("attendanceDate", attendanceDate,TemporalType.DATE);
		return query.getResultList();
	}
	
	public static List<StudentAttedance>  findStudentAttedancesForStudentId(String studentIds,Integer schoolId,Date attendanceDate ,Integer schoolSessionId ,Integer schoolAcademicYearId ){
		if(schoolSessionId==null){
			Query query =entityManager().createQuery("SELECT sa FROM StudentAttedance sa  "
					+ " WHERE sa.studentId.schoolId.schoolId="+schoolId+" AND sa.attendanceDate = :attendanceDate "
									+ " AND sa.studentId.studentId IN "+studentIds+" AND sa.schoolAcademicYearId.schoolAcademicYearId="+schoolAcademicYearId+"  ");
			query.setParameter("attendanceDate", attendanceDate,TemporalType.DATE);
			return query.getResultList();
		}
		Query query =entityManager().createQuery("SELECT sa FROM StudentAttedance sa  "
				+ " WHERE sa.studentId.schoolId.schoolId="+schoolId+" AND sa.attendanceDate = :attendanceDate "
						+ " AND sa.schoolSessionId.schoolSessionId= "+schoolSessionId+" "
								+ " AND sa.studentId.studentId IN "+studentIds+" AND sa.schoolAcademicYearId.schoolAcademicYearId="+schoolAcademicYearId+"  ");
		query.setParameter("attendanceDate", attendanceDate,TemporalType.DATE);
		return query.getResultList();

	}
	
	public static List<Long>  findStudentAttedancesForStudentOnlyIds(String studentIds,Integer schoolId,Date attendanceDate ,Integer schoolSessionId ,Integer schoolAcademicYearId ){
		if(schoolSessionId==null){
			Query query =entityManager().createQuery("SELECT sa.studentAttendanceId FROM StudentAttedance sa  "
					+ " WHERE sa.studentId.schoolId.schoolId="+schoolId+" AND sa.attendanceDate = :attendanceDate "
									+ " AND sa.studentId.studentId IN "+studentIds+" AND sa.schoolAcademicYearId.schoolAcademicYearId="+schoolAcademicYearId+"  ");
			query.setParameter("attendanceDate", attendanceDate,TemporalType.DATE);
			return query.getResultList();
		}
		List<SchoolSession> fullSession=SchoolSession.fetchOnlyFullSchoolSessions(schoolId);
		String querySession ="("+fullSession.get(0).getSchoolSessionId()+" , "+schoolSessionId+" )";  
		Query query =entityManager().createQuery("SELECT sa.studentAttendanceId FROM StudentAttedance sa  "
				+ " WHERE sa.studentId.schoolId.schoolId="+schoolId+" AND sa.attendanceDate = :attendanceDate "
						+ " AND sa.schoolSessionId.schoolSessionId IN  "+querySession+" "
								+ " AND sa.studentId.studentId IN "+studentIds+" AND sa.schoolAcademicYearId.schoolAcademicYearId="+schoolAcademicYearId+"  ");
		query.setParameter("attendanceDate", attendanceDate,TemporalType.DATE);
		return query.getResultList();
		

	}
	
	
	public static List<Object[]> findStudentAttendanceforStudentIdsWhoHasMarking(String studentIds,String dateStr,Integer schoolSessionId,
			 Integer schoolAcademicYearId,Integer schoolId){
		StringBuilder  query= new StringBuilder();
		query.append(" SELECT s.STUDENT_ID, s.FIRST_NAME ,scs.`CODE`, ");
		query.append(" s.FATHER_NAME,s.FATHER_MOBILE, atst.`STATUS`");
		query.append(" FROM student s ");
		query.append(" JOIN school_class_section scs ");
		query.append(" JOIN school_class sc ");
		query.append(" JOIN student_attedance sa ");
		query.append(" JOIN attendance_status atst ");
		query.append(" JOIN school_session sses ");
		query.append(" WHERE  scs.SCHOOL_CLASS_ID=sc.SCHOOL_CLASS_ID ");
		query.append(" AND s.SCHOOL_ID="+schoolId+" ");
		query.append(" AND sa.STUDENT_ID=s.STUDENT_ID ");
		query.append(" AND atst.ATTENDANCE_STATUS_ID=sa.ATTENDANCE_STATUS_ID ");
		query.append(" AND sses.SCHOOL_SESSION_ID=sa.SCHOOL_SESSION_ID");
		query.append(" AND sa.ATTENDANCE_DATE LIKE '"+dateStr+"%' ");
		if(!studentIds.equals("()")){
			query.append(" AND s.STUDENT_ID IN "+studentIds+"");
		}
	
		query.append(" AND sa.SCHOOL_SESSION_ID="+schoolSessionId+"");
	    query.append(" AND sa.SCHOOL_ACADEMIC_YEAR_ID="+schoolAcademicYearId+"");
		query.append(" GROUP BY s.STUDENT_ID");

		List<Object[]> result =entityManager().createNativeQuery(query.toString()).getResultList();
		return result;
	}
	
	public static List<Object[]> findStudentAttendanceforStudentIdsWhoDonotHaveMarking(String studentIds,
			 Integer schoolAcademicYearId,Integer schoolId){
		StringBuilder  query= new StringBuilder();
		query.append(" SELECT s.STUDENT_ID,s.FIRST_NAME,scs.`CODE`,");
		query.append(" s.FATHER_NAME,s.FATHER_MOBILE,0");
		query.append(" FROM student s");
		query.append(" JOIN school_class_section scs");
		query.append(" WHERE s.STUDENT_ID IN "+studentIds+"");
		query.append(" AND scs.SCHOOL_CLASS_SECTION_ID=s.SCHOOL_CLASS_SECTION_ID");
		query.append(" AND s.SCHOOL_ID="+schoolId+" GROUP BY s.STUDENT_ID");
		//query.append(" AND s.SCHOOL_ACADEMIC_YEAR_ID="+schoolAcademicYearId+"");
		if(studentIds.equals("()")){
			return new ArrayList<Object[]>();
		}
		List<Object[]> result =entityManager().createNativeQuery(query.toString()).getResultList();
		return result;
	}
	
	@Transactional
	public static Integer  deleteStudentAttendaceByIds(String studentAttendanceIds,Integer schoolId){
		if(!studentAttendanceIds.equals("()")){
			 return entityManager().createNativeQuery("DELETE FROM student_attedance WHERE STUDENT_ATTENDANCE_ID IN "+studentAttendanceIds+"").executeUpdate();
		}
		return 0;
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
