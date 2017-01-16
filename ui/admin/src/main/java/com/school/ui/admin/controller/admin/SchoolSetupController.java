package com.school.ui.admin.controller.admin;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.school.base.domain.AcademicYear;
import com.school.base.domain.HolidayType;
import com.school.base.domain.School;
import com.school.base.domain.SchoolAcademic;
import com.school.base.domain.SchoolHoliday;
import com.school.base.domain.SchoolSession;
import com.school.base.domain.StudentAttedance;
import com.school.ui.admin.util.SessionManager;

@RequestMapping("/admin/schoolsetup")
@Controller
public class SchoolSetupController {
	
	@RequestMapping(value = "/fetchSchoolAcademicYear", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String fetchAcademicYear(HttpServletRequest request,HttpServletResponse reresponse)  {
		JSONObject output= new JSONObject();
		List<SchoolAcademic> schoolAcademics=SchoolAcademic.fetchSchoolAcademic(SessionManager.getUserContext(request).getSchoolId());
	    output.put("error", "false");
		output.put("result",SchoolAcademic.toJsonArray(schoolAcademics));
		return output.toString();
	}
	
	@RequestMapping(value = "/fetchAcademicYear", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String fetchSchoolAcademicYear(HttpServletRequest request,HttpServletResponse reresponse)  {
		JSONObject output= new JSONObject();
		List<AcademicYear> academicYear=AcademicYear.findAllAcademicYears();
	    output.put("error", "false");
		output.put("result",AcademicYear.toJsonArray(academicYear));
		return output.toString();
	}
	
	

	 @RequestMapping(value = "/saveAcademicYear", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String saveClassDefinition(HttpServletRequest request,HttpServletResponse reresponse)  {
	    JSONObject input=new JSONObject(request.getParameter("input"));
	    JSONObject output= new JSONObject();
	    try {
	    	SimpleDateFormat simpleDateFormat= new SimpleDateFormat("dd-MM-yyyy");
			SchoolAcademic schoolAcademic= new SchoolAcademic();
			AcademicYear academicYear= new AcademicYear();
			academicYear.setAcademicYearId(input.getInt("academicYearId"));
			schoolAcademic.setAcademicYearId(academicYear);
			schoolAcademic.setStartDate(simpleDateFormat.parse(input.getString("startDate")));
			schoolAcademic.setEndDate(simpleDateFormat.parse(input.getString("endDate")));
			schoolAcademic.setCurrentYearMark(0);
			School school= new School();
			school.setSchoolId(SessionManager.getUserContext(request).getSchoolId());
			schoolAcademic.setSchoolId(school);
			schoolAcademic.persist();
	    	
		} catch (Exception e) {
		   output.put("error", "true");
		   output.put("message", "Invalid Input");
		   return output.toString();
		}
	    output.put("error", "false");
		output.put("message", "Added Successfully !");
		return output.toString();
	}
	 
	 @RequestMapping(value = "/deleteAcademicYear", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String deleteClassDefinition(HttpServletRequest request,HttpServletResponse reresponse)  {
	    JSONObject input=new JSONObject(request.getParameter("input"));
	    JSONObject output= new JSONObject();
	    try {
			Integer schoolAcademicYearId=input.getInt("schoolAcademicYearId");
			List<SchoolAcademic> schoolAcademics=   SchoolAcademic.fetchSchoolAcademic(SessionManager.getUserContext(request).getSchoolId(), schoolAcademicYearId);
			if(schoolAcademics.isEmpty()){
				output.put("error", "true");
				output.put("message", "Unable to delete");
			}else{
				schoolAcademics.get(0).remove();
				output.put("error", "false");
				output.put("message", "Deleted Successfully");
			}
		} catch (Exception e) {
		   output.put("error", "true");
		   output.put("message", "Invalid Input");
		}
	    
		return output.toString();
	}
	 
	 @RequestMapping(value = "/changeAcademicYearStatus", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String changeAcademicYearStatus(HttpServletRequest request,HttpServletResponse reresponse)  {
		 JSONObject input=new JSONObject(request.getParameter("input"));
		 Integer schoolAcademicYearId=input.getInt("schoolAcademicYearId");
		 
		 List<SchoolAcademic> schoolAcademics=SchoolAcademic.fetchSchoolAcademic(SessionManager.getUserContext(request).getSchoolId(), schoolAcademicYearId);
		 JSONObject output= new JSONObject();
		 if(schoolAcademics.isEmpty()){
			 output.put("error", "true");
			 output.put("message", "Not Found");
		 }else{
			 List<SchoolAcademic> schoolAcademics2= SchoolAcademic.findAllSchoolAcademics();
			 for (SchoolAcademic schoolAcademic : schoolAcademics2) {
				schoolAcademic.setCurrentYearMark(0);
				schoolAcademic.merge();
			}
			 schoolAcademics.get(0).setCurrentYearMark(1);
			 schoolAcademics.get(0).merge();
			
			 output.put("error", "false");
			 output.put("message", "Changed Successfully");
		 }
		 return output.toString();
	 }

	 
	 @RequestMapping(value = "/fetchCurrentAcademicYear", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String fetchCurrentAcademicYear(HttpServletRequest request,HttpServletResponse reresponse)  {
	    JSONObject input=new JSONObject(request.getParameter("input"));
	    JSONObject output= new JSONObject();
	    try {
			List<SchoolAcademic> schoolAcademics=   SchoolAcademic.fetchCurrentSchoolAcademic(SessionManager.getUserContext(request).getSchoolId());
			if(schoolAcademics.isEmpty()){
				output.put("error", "true");
				output.put("message", "Please Assign Current Academic Year");
			}else{
				output.put("error", "false");
				output.put("currentYear", schoolAcademics.get(0).getAcademicYearId().getAcademicYear());
			}
		} catch (Exception e) {
		   output.put("error", "true");
		   output.put("message", "Invalid Input");
		}
	    
		return output.toString();
	}
	 
	 @RequestMapping(value = "/fetchHolidays", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String fetchHolidays(HttpServletRequest request,HttpServletResponse reresponse)  {
	    JSONObject input=new JSONObject(request.getParameter("input"));
	    JSONObject output= new JSONObject();
	    try {
			List<SchoolAcademic> schoolAcademics=   SchoolAcademic.fetchCurrentSchoolAcademic(SessionManager.getUserContext(request).getSchoolId());
			List<SchoolHoliday> schoolHolidays=null;
			if(schoolAcademics.isEmpty()){
				schoolHolidays=new ArrayList<SchoolHoliday>();
			}else{
				schoolHolidays=   SchoolHoliday.fetchSchoolHoliday(SessionManager.getUserContext(request).getSchoolId(), schoolAcademics.get(0).getSchoolAcademicYearId())	;
			}
			
			if(schoolHolidays.isEmpty()){
				output.put("error", "false");
				output.put("message", "No Holiday Defined Yet");
			}else{
				output.put("error", "false");
				output.put("result", SchoolHoliday.toJsonArray(schoolHolidays));
			}
		} catch (Exception e) {
		   output.put("error", "true");
		   output.put("message", "Invalid Input");
		}
	    
		return output.toString();
	}
	 
	 @RequestMapping(value = "/saveHoliday", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String saveHoliday(HttpServletRequest request,HttpServletResponse reresponse)  {
	    JSONObject input=new JSONObject(request.getParameter("input"));
	    SimpleDateFormat dateFormat= new SimpleDateFormat("dd-MM-yyyy");
	    JSONObject output= new JSONObject();
	    Date hooliayDate=null;
	    try {
			 hooliayDate=dateFormat.parse(input.getString("holidayDate"));
		} catch (Exception e1) {
			 output.put("error", "true");
			   output.put("message", "Invalid Date");
			   return output.toString();
		}
	    
	    Integer schoolSessionId=input.getInt("schoolSessionId");
	    String reason=input.getString("reason");
		List<SchoolAcademic> schoolAcademics=   SchoolAcademic.fetchCurrentSchoolAcademic(SessionManager.getUserContext(request).getSchoolId());
	   
	    try {
	    	SchoolAcademic schoolAcademic=schoolAcademics.get(0);
	    	
	    	if(hooliayDate.getTime()<schoolAcademic.getStartDate().getTime()||hooliayDate.getTime()>schoolAcademic.getEndDate().getTime()){
	    		output.put("error", "true");
				   output.put("message", "Given date is not in this Academic Year");
				   return output.toString();
	    	}
			SchoolHoliday schoolHoliday= new SchoolHoliday();
			schoolHoliday.setAuditCreatedDtTime(new Date(System.currentTimeMillis()));
			schoolHoliday.setAuditModifiedDtTime(new Date(System.currentTimeMillis()));
			schoolHoliday.setAuditUserId(SessionManager.getUserContext(request).getStaff());
			HolidayType holidayType= new HolidayType();
			holidayType.setHolidayTypeId(2);
			schoolHoliday.setHolidayTypeId(holidayType);
			schoolHoliday.setReason(reason);
			schoolHoliday.setSchoolAcademicYearId(schoolAcademics.get(0));
			schoolHoliday.setSchoolId(SessionManager.getUserContext(request).getStaff().getSchoolId());
			SchoolSession schoolSession= new SchoolSession();
			schoolSession.setSchoolSessionId(schoolSessionId);
			schoolHoliday.setSchoolSessionId(schoolSession);
			schoolHoliday.setHolidayDate(hooliayDate);
			schoolHoliday.persist();
			 output.put("error", "false");
			   output.put("message", "Holiday Saved Succesfully!");
					
		} catch (Exception e) {
		   output.put("error", "true");
		   output.put("message", "Invalid Input or academic year not assigned");
		}
	    
		return output.toString();
	}
	 
	 @RequestMapping(value = "/deleteHoliday", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String deleteHoliday(HttpServletRequest request,HttpServletResponse reresponse)  {
	    JSONObject input=new JSONObject(request.getParameter("input"));
	    JSONObject output= new JSONObject();
	    try {
			Integer schoolHoildayId=input.getInt("schoolHolidayId");
			List<SchoolHoliday> schoolHolidays= SchoolHoliday.findSchoolHoliday(schoolHoildayId, SessionManager.getUserContext(request).getSchoolId());
			if(schoolHolidays.isEmpty()){
				output.put("error", "true");
				output.put("message", "Unable to delete");
			}else{
				schoolHolidays.get(0).remove();
				output.put("error", "false");
				output.put("message", "Deleted Successfully");
			}
		} catch (Exception e) {
		   output.put("error", "true");
		   output.put("message", "Invalid Input");
		}
	    
		return output.toString();
	}
	 
	 @RequestMapping(value = "/findSchoolSessions", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String findSchoolSessions(HttpServletRequest request,HttpServletResponse reresponse)  {
	    JSONObject input=new JSONObject(request.getParameter("input"));
	    JSONObject output= new JSONObject();
	    try {
			List<SchoolSession> schoolSessions= SchoolSession.fetchSchoolSessions(SessionManager.getUserContext(request).getSchoolId());
			output.put("error", "false");
			output.put("result", SchoolSession.toJsonArray(schoolSessions));
		} catch (Exception e) {
		   output.put("error", "true");
		   output.put("message", "Invalid Input");
		}
	    
		return output.toString();
	}
	 

	 
	 @RequestMapping(value = "/saveSchoolSession", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String saveSchoolSession(HttpServletRequest request,HttpServletResponse reresponse)  {
	    JSONObject input=new JSONObject(request.getParameter("input"));
	    String sessionName=input.getString("sessionName");
	    sessionName=sessionName.toUpperCase();
	    String fhh=input.getString("fhh");
	    String fmin=input.getString("fmin");
	    String fampm=input.getString("fampm");
	    
	    String thh=input.getString("thh");
	    String tmin=input.getString("tmin");
	    String tampm=input.getString("tampm");
	    JSONObject output= new JSONObject();
	    String sessionTimings=fhh+"."+fmin+" "+fampm+" to "+thh+"."+tmin+" "+tampm;
	    Integer isFullDaySession=input.getInt("isFullDay");
	    
	    
	   if(isFullDaySession==1){
		   List<SchoolSession> schoolSessions= SchoolSession.fetchOnlyFullSchoolSessions(SessionManager.getUserContext(request).getSchoolId());
		   if(!schoolSessions.isEmpty()){
			   output.put("error", "true");
			    output.put("message", "You  cannot have more than one full day session");
				return output.toString();
		    }
		     
	   }
	    
	    
	    SchoolSession schoolSession= new SchoolSession();
	    schoolSession.setIsFullDaySession(isFullDaySession);
	    schoolSession.setSchoolId(SessionManager.getUserContext(request).getStaff().getSchoolId());
	    schoolSession.setSessionName(sessionName);
	    schoolSession.setSessionTimings(sessionTimings);
	    schoolSession.persist();
	  
	    output.put("error", "false");
	    output.put("message", "Saved Successfully!");
	    
		return output.toString();
	}
	 
	 @RequestMapping(value = "/deleteschoolSession", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String deleteschoolSession(HttpServletRequest request,HttpServletResponse reresponse)  {
	    JSONObject input=new JSONObject(request.getParameter("input"));
	    Integer schoolSessionId=input.getInt("schoolSessionId");
	    JSONObject output= new JSONObject();
	    try {
			List<SchoolSession> schoolSessions= SchoolSession.findSchoolSession(schoolSessionId, SessionManager.getUserContext(request).getSchoolId());
			List<StudentAttedance> studentAttedances= StudentAttedance.findStudentAttedanceForGivenSession(schoolSessionId, SessionManager.getUserContext(request).getSchoolId());
			List<SchoolHoliday> schoolHolidays=SchoolHoliday.findSchoolHolidayFromSchoolSessioId(schoolSessionId, SessionManager.getUserContext(request).getSchoolId());
			if(schoolSessions.isEmpty()){
				 output.put("error", "true");
				   output.put("message", "Invalid Input");
				   return output.toString();
			}
			
			if(!schoolHolidays.isEmpty()){
				 output.put("error", "true");
				   output.put("message", "You have declared Holidays for "+schoolSessions.get(0).getSessionName()+" Session. Hence Cannot Delete");
				   return output.toString();
			}
			if(!studentAttedances.isEmpty()){
				 output.put("error", "true");
				   output.put("message", "You have mark attendance for "+schoolSessions.get(0).getSessionName()+" Session.Hence Cannot Delete");
				   
				   return output.toString();
			}
			schoolSessions.get(0).remove();
				 output.put("error", "false");
				 output.put("message", "Deleted Successfully");
				 
				 return output.toString();
			
		} catch (Exception e) {
		   output.put("error", "true");
		   output.put("message", "Invalid Input");
		}
	    
		return output.toString();
	}
	 


	 
	 
	 
	 
	 
	
	
}
