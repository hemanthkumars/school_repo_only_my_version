package com.school.ui.admin.controller.admin;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.school.base.domain.AttendanceStatus;
import com.school.base.domain.SchoolAcademic;
import com.school.base.domain.SchoolSession;
import com.school.base.domain.Student;
import com.school.base.domain.StudentAttedance;
import com.school.base.util.GeneralConstants;
import com.school.ui.admin.util.SessionManager;

@RequestMapping("/admin/attendance")
@Controller
public class AttendanceController {
	
	@RequestMapping(value = "/saveAttendance", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 @Transactional
	 public String login(HttpServletRequest request,HttpServletResponse reresponse)  {
		JSONObject input= new JSONObject(request.getParameter("input"));
		JSONObject output= new JSONObject();
		try{
		Integer schoolSessionId=input.getInt("schoolSession");
		SimpleDateFormat dateFormat=new SimpleDateFormat("dd-MM-yyyy");
		Date attendanceDate=dateFormat.parse(input.getString("attendanceDate"));
		Date todayDate= new Date(System.currentTimeMillis());
		if(attendanceDate.getTime()>todayDate.getTime()){
			output.put("error", "true");
			 output.put("message", "Sorry you cannot mark attendance for Date greater than today date");
			 return output.toString();
		}
		String classOrSectionId=input.getString("classOrSectionId");
		JSONArray jsonArray=input.getJSONArray("studentIdArrayForAttendance");
		List<Integer> studentIds=new ArrayList<Integer>();
	
		for (Object object : jsonArray) {
			JSONObject jsonObject=(JSONObject) object;
		     studentIds.add(jsonObject.getInt("studentId"));	
		}
		
		List<Integer> allStudentIds=new ArrayList<Integer>();
		if(classOrSectionId.startsWith("osc-")){
			String schoolClassId=classOrSectionId.split("-")[1];
			allStudentIds=Student.findStudentIdsBySchoolClassId(Integer.parseInt(schoolClassId), SessionManager.getUserContext(request).getSchoolId());
		}else if (classOrSectionId.startsWith("scs-")) {
			String schoolClassSectionId=classOrSectionId.split("-")[1];
			allStudentIds=Student.findStudentIdsBySchoolClassSectioId(Integer.parseInt(schoolClassSectionId), SessionManager.getUserContext(request).getSchoolId() );
		
		}
		 List<SchoolAcademic> schoolAcademics=SchoolAcademic.fetchCurrentSchoolAcademic(SessionManager.getUserContext(request).getSchoolId());
		  if(schoolAcademics.isEmpty()){
			  output.put("error", "true");
				output.put("message", "Define active Academic Year");
				return output.toString();
		  }
		  SchoolSession schoolSession2=SchoolSession.findSchoolSession(schoolSessionId,SessionManager.getUserContext(request).getSchoolId()).get(0);
		  boolean isFullDaySession=false;
		  if(schoolSession2.getIsFullDaySession()==1){
			  isFullDaySession=true;
		  }
		  //deleting old attendance
		  String studentIdsStr=studentIds.toString();
		  studentIdsStr=studentIdsStr.replace("[", "(");
		  studentIdsStr=studentIdsStr.replace("]", ")");
		  
		  String allStudentIdsStr=allStudentIds.toString();
		  allStudentIdsStr=allStudentIdsStr.replace("[", "(");
		  allStudentIdsStr=allStudentIdsStr.replace("]", ")");
		  Integer schoolId=SessionManager.getUserContext(request).getSchoolId();
		  List<SchoolSession> fullSession=SchoolSession.fetchOnlyFullSchoolSessions(schoolId);
          
          List<Long> studentAttendanceIds= new ArrayList<Long>();
          if(isFullDaySession){
        	  studentAttendanceIds=StudentAttedance.
		        		  findStudentAttedancesForStudentOnlyIds(allStudentIdsStr, schoolId, attendanceDate, null, schoolAcademics.get(0).getSchoolAcademicYearId());
		  }else{
			  studentAttendanceIds=StudentAttedance.
		        		 findStudentAttedancesForStudentOnlyIds(allStudentIdsStr, schoolId, attendanceDate, schoolSessionId, schoolAcademics.get(0).getSchoolAcademicYearId());

		  }
 		  String studentAttendanceIdsStr= studentAttendanceIds.toString();
 		 studentAttendanceIdsStr=studentAttendanceIdsStr.replace("[", "(");
 		studentAttendanceIdsStr=studentAttendanceIdsStr.replace("]", ")");
		   
 		StudentAttedance.deleteStudentAttendaceByIds(studentAttendanceIdsStr, schoolId);
 		  
 		  List<SchoolSession> schoolSessions=SchoolSession.fetchSchoolSessions(schoolId);
		  
	    for (Integer studentId : studentIds) {
	    	if(isFullDaySession){
	    		for (SchoolSession schoolSession : schoolSessions) {
		    		StudentAttedance studentAttedance= new StudentAttedance();
					studentAttedance.setAttendanceDate(attendanceDate);
					AttendanceStatus attendanceStatusId= new AttendanceStatus();
					attendanceStatusId.setAttendanceStatusId(GeneralConstants.STUDENT_ATTENDANCE_STATUS_PRESENT);
					studentAttedance.setAttendanceStatusId(attendanceStatusId);
					studentAttedance.setAuditCreatedDtTime(new Date(System.currentTimeMillis()));
					studentAttedance.setAuditModifiedDtTime(new Date(System.currentTimeMillis()));
					studentAttedance.setAttendanceDate(attendanceDate);
					studentAttedance.setAuditUserId(SessionManager.getUserContext(request).getStaff());
					studentAttedance.setSchoolAcademicYearId(schoolAcademics.get(0));
					studentAttedance.setSchoolSessionId(schoolSession);
					Student student= new Student();
					student.setStudentId(studentId);
					studentAttedance.setStudentId(student);
					studentAttedance.persist();
				}
	    		allStudentIds.remove(studentId);
	    	}else{
	    		StudentAttedance studentAttedance= new StudentAttedance();
				studentAttedance.setAttendanceDate(attendanceDate);
				AttendanceStatus attendanceStatusId= new AttendanceStatus();
				attendanceStatusId.setAttendanceStatusId(GeneralConstants.STUDENT_ATTENDANCE_STATUS_PRESENT);
				studentAttedance.setAttendanceStatusId(attendanceStatusId);
				studentAttedance.setAuditCreatedDtTime(new Date(System.currentTimeMillis()));
				studentAttedance.setAuditModifiedDtTime(new Date(System.currentTimeMillis()));
				studentAttedance.setAttendanceDate(attendanceDate);
				studentAttedance.setAuditUserId(SessionManager.getUserContext(request).getStaff());
				studentAttedance.setSchoolAcademicYearId(schoolAcademics.get(0));
				SchoolSession schoolSession= new SchoolSession();
				schoolSession.setSchoolSessionId(schoolSessionId);
				studentAttedance.setSchoolSessionId(schoolSession);
				Student student= new Student();
				student.setStudentId(studentId);
				studentAttedance.setStudentId(student);
				studentAttedance.persist();
				allStudentIds.remove(studentId);
	    	}
		}
	    
	    for (Integer studentId : allStudentIds) {
	    	if(isFullDaySession){
	    		for (SchoolSession schoolSession : schoolSessions) {
	    			StudentAttedance studentAttedance= new StudentAttedance();
	    			studentAttedance.setAttendanceDate(attendanceDate);
	    			AttendanceStatus attendanceStatusId= new AttendanceStatus();
	    			attendanceStatusId.setAttendanceStatusId(GeneralConstants.STUDENT_ATTENDANCE_STATUS_ABSENT);
	    			studentAttedance.setAttendanceStatusId(attendanceStatusId);
	    			studentAttedance.setAuditCreatedDtTime(new Date(System.currentTimeMillis()));
	    			studentAttedance.setAuditModifiedDtTime(new Date(System.currentTimeMillis()));
	    			studentAttedance.setAttendanceDate(attendanceDate);
	    			studentAttedance.setAuditUserId(SessionManager.getUserContext(request).getStaff());
	    			studentAttedance.setSchoolAcademicYearId(schoolAcademics.get(0));
	    			studentAttedance.setSchoolSessionId(schoolSession);
	    			Student student= new Student();
	    			student.setStudentId(studentId);
	    			studentAttedance.setStudentId(student);
	    			studentAttedance.persist();
	    		}
	    	}else{
	    		StudentAttedance studentAttedance= new StudentAttedance();
				studentAttedance.setAttendanceDate(attendanceDate);
				AttendanceStatus attendanceStatusId= new AttendanceStatus();
				attendanceStatusId.setAttendanceStatusId(GeneralConstants.STUDENT_ATTENDANCE_STATUS_ABSENT);
				studentAttedance.setAttendanceStatusId(attendanceStatusId);
				studentAttedance.setAuditCreatedDtTime(new Date(System.currentTimeMillis()));
				studentAttedance.setAuditModifiedDtTime(new Date(System.currentTimeMillis()));
				studentAttedance.setAttendanceDate(attendanceDate);
				studentAttedance.setAuditUserId(SessionManager.getUserContext(request).getStaff());
				studentAttedance.setSchoolAcademicYearId(schoolAcademics.get(0));
				SchoolSession schoolSession= new SchoolSession();
				schoolSession.setSchoolSessionId(schoolSessionId);
				studentAttedance.setSchoolSessionId(schoolSession);
				Student student= new Student();
				student.setStudentId(studentId);
				studentAttedance.setStudentId(student);
				studentAttedance.persist();
				if(!fullSession.isEmpty()){
					StudentAttedance studentAttedance1= new StudentAttedance();
					studentAttedance1.setAttendanceDate(attendanceDate);
					AttendanceStatus attendanceStatusId1= new AttendanceStatus();
					attendanceStatusId1.setAttendanceStatusId(GeneralConstants.STUDENT_ATTENDANCE_STATUS_ABSENT);
					studentAttedance1.setAttendanceStatusId(attendanceStatusId1);
					studentAttedance1.setAuditCreatedDtTime(new Date(System.currentTimeMillis()));
					studentAttedance1.setAuditModifiedDtTime(new Date(System.currentTimeMillis()));
					studentAttedance1.setAttendanceDate(attendanceDate);
					studentAttedance1.setAuditUserId(SessionManager.getUserContext(request).getStaff());
					studentAttedance1.setSchoolAcademicYearId(schoolAcademics.get(0));
					studentAttedance1.setSchoolSessionId(fullSession.get(0));
					Student student1= new Student();
					student1.setStudentId(studentId);
					studentAttedance1.setStudentId(student1);
					studentAttedance1.persist();
				}
				
	    	}
			
		}
		
		output.put("error", "false");
		 output.put("message", "Attendance Successfuly saved");
		 return output.toString();
		} catch (Exception e) {
				output.put("error", "true");
				 output.put("message", "Some Error Occurred");
				 e.printStackTrace();
				 return output.toString();
			}
	}
	
}
