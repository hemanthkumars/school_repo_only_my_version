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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.school.base.domain.School;
import com.school.base.domain.SchoolAcademic;
import com.school.base.domain.SchoolSmsTemplate;
import com.school.base.domain.Sms;
import com.school.base.domain.Student;
import com.school.base.util.GeneralConstants;
import com.school.ui.admin.util.SessionManager;
import com.school.ui.admin.util.SmsIntiate;

import flexjson.JSONSerializer;

@RequestMapping("/admin/sms")
@Controller
public class SMSController implements GeneralConstants {
	
	 @RequestMapping(value = "/findSmsTemplateData", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String findSmsTemplateData(HttpServletRequest request,HttpServletResponse reresponse)  {
		JSONObject input= new JSONObject(request.getParameter("input"));
		JSONObject output= new JSONObject();
		List<SchoolSmsTemplate> schoolSmsTemplates=SchoolSmsTemplate.findAllSmsTemplate(SessionManager.getUserContext(request).getSchoolId());
		output.put("result", SchoolSmsTemplate.toJsonArray(schoolSmsTemplates));
		output.put("error", "false");
		return output.toString();
	}
	 
	 @RequestMapping(value = "/saveSmsTemplateData", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String saveSmsTemplateData(HttpServletRequest request,HttpServletResponse reresponse)  {
		JSONObject input= new JSONObject(request.getParameter("input"));
		String templateName=input.getString("smsTemplateName");
		String header=input.getString("header");
		String footer=input.getString("footer");
		
		SchoolSmsTemplate schoolSmsTemplate= new SchoolSmsTemplate();
		schoolSmsTemplate.setFooter(footer);
		schoolSmsTemplate.setHeader(header);
		schoolSmsTemplate.setSchoolId(SessionManager.getUserContext(request).getStaff().getSchoolId());
		schoolSmsTemplate.setSmsTemplateName(templateName);
		schoolSmsTemplate.persist();
		JSONObject output= new JSONObject();
		output.put("error", "false");
		output.put("message", "Saved Succesfully");
		return output.toString();
	}
	 
	 @RequestMapping(value = "/deleteSmsTemplate", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String deleteSmsTemplate(HttpServletRequest request,HttpServletResponse reresponse)  {
		JSONObject input= new JSONObject(request.getParameter("input"));
		Integer smsTemplateId=input.getInt("smsTemplateId");
		 
		List<SchoolSmsTemplate> smsTemplates=  SchoolSmsTemplate.findSmsTemplate(SessionManager.getUserContext(request).getSchoolId(), smsTemplateId);
		JSONObject output= new JSONObject();
		if(!smsTemplates.isEmpty()){
			smsTemplates.get(0).remove();
			output.put("error", "false");
			output.put("message", "Deleted");
			return output.toString();
		}else{
			output.put("error", "true");
			output.put("message", "Cannot Delete");
		return output.toString();
		}
	}
	 
	 @RequestMapping(value = "/sendStudentSms", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String sendStudentSms(HttpServletRequest request,HttpServletResponse reresponse)  {
		 JSONObject input= new JSONObject(request.getParameter("input"));
		 JSONObject output= new JSONObject();
		 try{
		 Integer smsTemplateId=input.getInt("templateId");
		 JSONArray jsonArray=input.getJSONArray("studentIdArray");
		
		 String message=input.getString("message");
		 message= message.trim();
		 if(message.equals("")){
			 output.put("error", "true");
				output.put("message", "Message Cannot be blank");
				return output.toString();
		 }
		 SchoolSmsTemplate schoolSmsTemplate=SchoolSmsTemplate.findSchoolSmsTemplate(smsTemplateId);
		 School school= School.findSchool(SessionManager.getUserContext(request).getSchoolId());
		 if(school.getApiKey()==null){
			  output.put("error", "true");
				output.put("message", "You have not subscribed for SMS");
				return output.toString();
		 }
		 if(school.getApiKey().equals("")){
			  output.put("error", "true");
				output.put("message", "You have not subscribed for SMS");
				return output.toString();
		 }
		 
		 List<Integer> studentIds=new ArrayList<Integer>();
		 for (Object object : jsonArray) {
			JSONObject jsonObject=(JSONObject) object;
			studentIds.add(jsonObject.getInt("studentId"));
	     }
		 String fullSms=schoolSmsTemplate.getHeader()+" "+message+" "+schoolSmsTemplate.getFooter();
		 Double smsCount=fullSms.length()/160.0;
		 smsCount=Math.ceil(smsCount);
		 Integer smsC2=smsCount.intValue();
		 Float smsCost=school.getPerSmsCost()*smsC2;
		 String studentIdStr=studentIds.toString();
		 studentIdStr=studentIdStr.replace("[", "(");
		 studentIdStr=studentIdStr.replace("]", ")");
		 List<Student> students=Student.findStudentByStudentIds(studentIdStr, SessionManager.getUserContext(request).getSchoolId());
		 
		  List<SchoolAcademic> schoolAcademics=SchoolAcademic.fetchCurrentSchoolAcademic(SessionManager.getUserContext(request).getSchoolId());
		  if(schoolAcademics.isEmpty()){
			  output.put("error", "true");
				output.put("message", "Define active Academic Year");
				return output.toString();
		  }
		  Integer totalSmsCount=0;
		 for (Student student1 : students) {
			Sms sms2= new Sms();
			sms2.setAuditUserId(SessionManager.getUserContext(request).getStaff());
			sms2.setRecipientMobileNo(student1.getFatherMobile());
			sms2.setSchoolAcademicYearId(schoolAcademics.get(0));
			sms2.setSchoolId(SessionManager.getUserContext(request).getStaff().getSchoolId());
			sms2.setSmsCost(smsCost);
			sms2.setSmsCount(smsC2);
			totalSmsCount+=smsC2;
			sms2.setSmsDetail(fullSms);
			sms2.setSmsSentDtTime(new Date(System.currentTimeMillis()));
			sms2.setSmsStatus(SMS_STATUS_IN_QUEQUE);
			sms2.setStaffId(SessionManager.getUserContext(request).getStaff());
			sms2.setStudentId(student1);
			sms2.persist();
		}
		
		 SmsIntiate.initiateSmsSending();
		  output.put("error", "false");
			output.put("message", "Message Sending Initiated");
			return output.toString();
	 }catch (Exception e) {
				 output.put("error", "true");
					output.put("message", "Some Error Occured");
					e.printStackTrace();
					return output.toString();
			}
	 }
	 
	 @RequestMapping(value = "/findDeliveryReport", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String findDeliveryReport(HttpServletRequest request,HttpServletResponse reresponse)  {
		 JSONObject input= new JSONObject(request.getParameter("input"));
		 JSONObject output= new JSONObject();
		 SimpleDateFormat simpleDateFormat= new SimpleDateFormat("dd-MM-yyyy");
		 try{
			 Date date=simpleDateFormat.parse(input.getString("sentDate"));
			 SimpleDateFormat format= new SimpleDateFormat("yyyy-MM-dd");
			 output.put("error", "false");
			 List<Object[]> finalResult=new ArrayList<Object[]>();
			 List<Object[]> result=Sms.findDeliveryReport(format.format(date));
			 SimpleDateFormat simpleDateFormat2= new SimpleDateFormat("dd-MMM-yyyy hh:mm a");
			 for (Object[] objects : result) {
				Object[] objects2= new Object[12];
				objects2[0]=objects[0];
				objects2[1]=objects[1];
				objects2[2]=objects[2];
				objects2[3]=objects[3];
				objects2[4]=objects[4];
				objects2[5]=objects[5];
				objects2[6]=objects[6];
				Date sentDateTime=(Date) objects[7];
				objects2[7]=simpleDateFormat2.format(sentDateTime);
				Date deiveredDate=(Date) objects[8];
				if(deiveredDate!=null){
					objects2[8]=simpleDateFormat2.format(deiveredDate);
				}else{
					objects2[8]=null;
				}
				
				objects2[9]=objects[9];
				finalResult.add(objects2);
			}
			 output.put("result", new JSONSerializer().serialize(finalResult));
				output.put("message", "Success");
				return output.toString();
		 }catch(Exception e){
			 output.put("error", "true");
				output.put("message", "Invalid Date");
				e.printStackTrace();
				return output.toString();
		 }
		
	 }
	 
	 @RequestMapping(value = "/sendSMSByMobileNo", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String sendSMSByMobileNo(HttpServletRequest request,HttpServletResponse reresponse)  {
		 JSONObject input= new JSONObject(request.getParameter("input"));
		 JSONObject output= new JSONObject();
		 List<SchoolAcademic> schoolAcademics=SchoolAcademic.fetchCurrentSchoolAcademic(SessionManager.getUserContext(request).getSchoolId());
		  if(schoolAcademics.isEmpty()){
			  output.put("error", "true");
				output.put("message", "Define active Academic Year");
				return output.toString();
		  }
		  String message=input.getString("message");
		  School school= School.findSchool(SessionManager.getUserContext(request).getSchoolId());
		  if(school.getApiKey()==null){
			  output.put("error", "true");
				output.put("message", "You have not subscribed for SMS");
				return output.toString();
		 }
		 if(school.getApiKey().equals("")){
			  output.put("error", "true");
				output.put("message", "You have not subscribed for SMS");
				return output.toString();
		 }
		  Integer templateId=input.getInt("templateId");
		  SchoolSmsTemplate schoolSmsTemplate=SchoolSmsTemplate.findSchoolSmsTemplate(templateId);
		  String mobileNos=input.getString("mobileNosForSMSing");
		  List<String> mobileList=new ArrayList<String>();
		  String[] mobileNoSplitted=mobileNos.split(",");
		  for (int i = 0; i < mobileNoSplitted.length; i++) {
			 String eachMobile=mobileNoSplitted[0];
			 eachMobile=eachMobile.trim();
			 if(eachMobile.length()!=10){
				output.put("error", "true");
				output.put("message", "Make Sure all the Nos are 10 digit");
				return output.toString();
			 }
			 try{
				 Long integer=Long.parseLong(eachMobile);
			 }catch (Exception e){
				    output.put("error", "true");
					output.put("message", "Make Sure all the Nos are valid nos");
					return output.toString();
			 }
			 mobileList.add(eachMobile);
		}
		  String fullSms=schoolSmsTemplate.getHeader()+" "+message+" "+schoolSmsTemplate.getFooter();
			 Double smsCount=fullSms.length()/160.0;
			 smsCount=Math.ceil(smsCount);
			 Integer smsC2=smsCount.intValue();
			 Float smsCost=school.getPerSmsCost()*smsC2;
		  for (String mobile : mobileList) {
			  Sms sms2= new Sms();
				sms2.setAuditUserId(SessionManager.getUserContext(request).getStaff());
				sms2.setRecipientMobileNo(mobile);
				sms2.setSchoolAcademicYearId(schoolAcademics.get(0));
				sms2.setSchoolId(SessionManager.getUserContext(request).getStaff().getSchoolId());
				sms2.setSmsCost(smsCost);
				sms2.setSmsCount(smsC2);
				sms2.setSmsDetail(fullSms);
				sms2.setSmsSentDtTime(new Date(System.currentTimeMillis()));
				sms2.setSmsStatus(SMS_STATUS_IN_QUEQUE);
				sms2.setStaffId(SessionManager.getUserContext(request).getStaff());
				sms2.persist();
			
		  }
		  SmsIntiate.initiateSmsSending();
		  output.put("error", "false");
			output.put("message", "Message Sending Initiated");
			return output.toString();
	 }
	 

	 
}
