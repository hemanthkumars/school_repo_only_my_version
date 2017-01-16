package com.school.ui.admin.controller.admin;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.school.base.domain.SchoolSubject;
import com.school.ui.admin.util.SessionManager;

@RequestMapping("/admin/subject")
@Controller
public class SubjectController {
	
	@RequestMapping(value = "/fetchSubjects", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String fetchClassDefinition(HttpServletRequest request,HttpServletResponse reresponse)  {
		JSONObject output= new JSONObject();
		
		List<SchoolSubject> schoolSubjects=SchoolSubject.findSchoolSubjects(SessionManager.getUserContext(request).getSchoolId());
	    output.put("error", "false");
		output.put("result", SchoolSubject.toJsonArray(schoolSubjects));
		return output.toString();
	}
	
	@RequestMapping(value = "/saveSubject", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String saveSubject(HttpServletRequest request,HttpServletResponse reresponse)  {
		JSONObject input=new JSONObject(request.getParameter("input"));
		String subjectName=input.getString("subjectName");
		String subjectCode=input.getString("subjectCode");
		Integer schoolSubjectId=0;
		if(input.has("schoolSubjectId")){
			schoolSubjectId=input.getInt("schoolSubjectId");
		}
		SchoolSubject schoolSubject=null;
		if(schoolSubjectId==0){
			schoolSubject=new SchoolSubject();
		}else{
			schoolSubject=SchoolSubject.findSchoolSubject(schoolSubjectId);
		}
		
		schoolSubject.setSchoolId(SessionManager.getUserContext(request).getStaff().getSchoolId());
		schoolSubject.setSubjectCode(subjectCode);
		schoolSubject.setSubjectName(subjectName);
		schoolSubject.persist();
		
		JSONObject output= new JSONObject();
		
	    output.put("error", "false");
		output.put("message", "Save Successfully");
		return output.toString();
	}
	
	@RequestMapping(value = "/findSchoolSubject", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String findSchoolSubject(HttpServletRequest request,HttpServletResponse reresponse)  {
		JSONObject  input=new JSONObject(request.getParameter("input"));
		Integer schoolSubjectId=input.getInt("schoolSubjectId");
		SchoolSubject schoolSubject=SchoolSubject.findSchoolSubject(schoolSubjectId);
		
		JSONObject output= new JSONObject();
	    output.put("error", "false");
		output.put("subjectName", schoolSubject.getSubjectName());
		output.put("subjectCode", schoolSubject.getSubjectCode());
		output.put("schoolSubjectId", schoolSubject.getSchoolSubjectId());
		return output.toString();
	}
	
	@RequestMapping(value = "/deleteSubject", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String deleteSubject(HttpServletRequest request,HttpServletResponse reresponse)  {
		JSONObject  input=new JSONObject(request.getParameter("input"));
		Integer schoolSubjectId=input.getInt("schoolSubjectId");
		SchoolSubject schoolSubject=SchoolSubject.findSchoolSubject(schoolSubjectId);
		schoolSubject.remove();
		
		JSONObject output= new JSONObject();
		
	    output.put("error", "false");
		output.put("message", "Deleted Successfully");
		return output.toString();
	}
	

	
	
}
