package com.school.ui.admin.controller.admin;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.text.WordUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.school.base.domain.AcademicYear;
import com.school.base.domain.BloodGroup;
import com.school.base.domain.Caste;
import com.school.base.domain.City;
import com.school.base.domain.Country;
import com.school.base.domain.Gender;
import com.school.base.domain.Language;
import com.school.base.domain.Promotion;
import com.school.base.domain.Religion;
import com.school.base.domain.SchoolAcademic;
import com.school.base.domain.SchoolClassSection;
import com.school.base.domain.SchoolFee;
import com.school.base.domain.SchoolSubject;
import com.school.base.domain.State;
import com.school.base.domain.Student;
import com.school.base.domain.StudentAttedance;
import com.school.base.domain.StudentExamination;
import com.school.base.util.GeneralConstants;
import com.school.ui.admin.util.SessionManager;

import flexjson.JSONSerializer;

@RequestMapping("/admin/student")
@Controller
public class StudentController {
	@RequestMapping(value = "/findStudentLike", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String fetchClassDefinition(HttpServletRequest request,HttpServletResponse reresponse)  {
		JSONObject output= new JSONObject();
		
		List<SchoolSubject> schoolSubjects=SchoolSubject.findSchoolSubjects(SessionManager.getUserContext(request).getSchoolId());
	    output.put("error", "false");
		output.put("result", SchoolSubject.toJsonArray(schoolSubjects));
		return output.toString();
	}
	
	@RequestMapping(value = "/findAllStudentDetails", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String findAllStudentDetails(HttpServletRequest request,HttpServletResponse reresponse)  {
		JSONObject input=new JSONObject(request.getParameter("input"));
		JSONObject output= new JSONObject();
		Integer schoolClassSectionId=input.getInt("schoolClassSectionId");
		List<Student> students=Student.findStudentBySchoolClassSectioId(schoolClassSectionId, SessionManager.getUserContext(request).getSchoolId());
		
		output.put("error", "false");
		output.put("result", Student.toJsonArray(students));
		
		return output.toString();
	}
	
	@RequestMapping(value = "/findAllStudentDetailsFeeCollect", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String findAllStudentDetailsFeeCollect(HttpServletRequest request,HttpServletResponse reresponse)  {
		JSONObject input=new JSONObject(request.getParameter("input"));
		JSONObject output= new JSONObject();
		Integer schoolClassSectionId=input.getInt("schoolClassSectionId");
		 List<SchoolAcademic> schoolAcademics=SchoolAcademic.fetchCurrentSchoolAcademic(SessionManager.getUserContext(request).getSchoolId() );
         
  		  if(schoolAcademics.isEmpty()){
  			  output.put("error", "true");
  				output.put("message", "Define active Academic Year");
  				return output.toString();
  		  }
		List<Object[]> students=Student.findStudentBySchoolClassSectioIdFeeCollect(schoolClassSectionId, 
				SessionManager.getUserContext(request).getSchoolId(), schoolAcademics.get(0).getSchoolAcademicYearId());
		
		output.put("error", "false");
		output.put("result", new JSONSerializer().serialize(students));
		
		return output.toString();
	}
	
	
	
	 @RequestMapping(value = "/fetchStaticData", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String fetchStaticData(HttpServletRequest request,HttpServletResponse reresponse)  {
		JSONObject output= new JSONObject();
		List<BloodGroup> bloodGroups= BloodGroup.findAllBloodGroups();
		List<Language> languages=Language.findAllLanguages();
		List<Caste> castes=Caste.findAllCastes();
		List<Religion> religions=Religion.findAllReligions();
		
		List<City> cities= City.findAllCitys();
		List<State> states=State.findAllStates();
		List<Country> countries=Country.findAllCountrys();
		JSONObject result=new JSONObject();
		result.put("bloodGroups", BloodGroup.toJsonArray(bloodGroups));
		result.put("languages", Language.toJsonArray(languages));
		result.put("castes", Caste.toJsonArray(castes));
		result.put("religions", Religion.toJsonArray(religions));
		result.put("cities", City.toJsonArray(cities));
		result.put("states", State.toJsonArray(states));
		result.put("countries", Country.toJsonArray(countries));
		result.put("genders", Gender.toJsonArray(Gender.findAllGenders()));
	    output.put("error", "false");
		output.put("result", result);
		WordUtils.capitalize("");
		return output.toString();
	}
	
	/*var input={"studentFirstName":$scope.studentFirstName,
			"gender":$("#gender").val(),
			"admissionDate":$scope.admissionDate,
			"dob":$scope.dob,
			"admissionNo":$scope.admissionNo,
			"bloodGroup":$("bloodGroup").val(),
			"motherTongue":$("#motherTongue").val(),
			"caste":$("#caste").val(),
			"religion":$("#religion").val(),
			"identificationMark":$scope.identificationMark,
			"fatherName":$scope.fatherName,
			"fatherOccupation":$scope.fatherOccupation,
			"motherName":$scope.motherName,
			"motherOccupation":$scope.motherOccupation,
			"fatherMobile":$scope.fatherMobile,
			"fatherEmail":$scope.fatherEmail,
			"motherMobile":$scope.motherMobile,
			"motherEmail":$scope.motherEmail,
			"address":$scope.address,
			"landmark":$scopelandmark.studentName,
			"city":$("#city").val(),
			"state":$("#state").val(),
			"pincode":$scope.pincode,
			"country":$("#country").val()};*/
	 
	 @RequestMapping(value = "/saveStudentData", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String saveStudentData(HttpServletRequest request,HttpServletResponse reresponse)  {
		 JSONObject input= new JSONObject(request.getParameter("input"));
		 JSONObject output= new JSONObject();
		 try{
		
		 String firstName=input.getString("studentFirstName");
		 firstName=WordUtils.capitalizeFully(firstName);
		 Integer genderId=input.getInt("gender");
		 SimpleDateFormat simpleDateFormat= new SimpleDateFormat("dd-MM-yyyy");
		 String dobStr=input.getString("dob");
		 Integer bloodGroupId=0;
		 if(!input.getString("bloodGroup").equals("")){
			 bloodGroupId=input.getInt("bloodGroup");
		 }
		 Integer motherTongueId=0;
		 if(!input.getString("motherTongue").equals("")){
			 motherTongueId=input.getInt("motherTongue");
		 }
		 Integer religionId=0;
		 if(!input.getString("religion").equals("")){
			 religionId=input.getInt("religion");
		 }
		 Integer casteId=0;
		 if(!input.getString("caste").equals("")){
			 casteId=input.getInt("caste");
		 }
		 Integer cityId=0;
		 if(!input.getString("city").equals("")){
			 cityId=input.getInt("city");
		 }
		 Integer stateId=0;
		 if(!input.getString("state").equals("")){
			 stateId=input.getInt("state");
		 }
		 Integer countryId=0;
		 if(!input.getString("country").equals("")){
			 countryId=input.getInt("country");
		 }
		 String identificationMark=input.getString("identificationMark");
		 identificationMark=WordUtils.capitalizeFully(identificationMark);
		 String fatherName=input.getString("fatherName");
         fatherName=WordUtils.capitalizeFully(fatherName);
		 String fatherOccupation=input.getString("fatherOccupation");
		 fatherOccupation=WordUtils.capitalize(fatherOccupation);
		 String motherName=input.getString("motherName");
		 motherName=WordUtils.capitalizeFully(motherName);
		 String motherOccupation=input.getString("motherOccupation");
		 motherOccupation=WordUtils.capitalize(motherOccupation);
		 String fatherMobile=input.getString("fatherMobile");
		 String fatherEmail=input.getString("fatherEmail");
		 fatherEmail=fatherEmail.toLowerCase();
		 String motherMobile=input.getString("motherMobile");
		 String motherEmail=input.getString("motherEmail");
		 motherEmail=motherEmail.toLowerCase();
		 String landmark=input.getString("landmark");
		 landmark=WordUtils.capitalize(landmark);
		 String address=input.getString("address");
		 address=WordUtils.capitalize(address);
		 String pincode=input.getString("pincode");
		  Integer studentId=0;
		  studentId=input.getInt("studentId");
		  Student student=null;
		  if(studentId==0){
			  student=new Student();
		  }else{
			  student=Student.findStudent(studentId);
		  }
		  student.setAddress(address);
		  student.setAuditCreatedDtTime(new Date(System.currentTimeMillis()));
		  student.setAuditModifiedDtTime(new Date(System.currentTimeMillis()));
		  student.setAuditUserId(SessionManager.getUserContext(request).getStaff());
		  student.setMotherName(motherName);
		  if(bloodGroupId!=0){
			  BloodGroup bloodGroup= new BloodGroup();
			  bloodGroup.setBloodGroupId(bloodGroupId);
			  student.setBloodGroupId(bloodGroup);
		  }
		  if(casteId!=0){
			  Caste caste= new Caste();
			  caste.setCasteId(casteId);
			  caste.setCasteId(casteId);
			  student.setCasteId(caste);
		  }
		  if(cityId!=0){
			  City city= new City();
			  city.setCityId(cityId);
			 student.setCityId(city); 
		  }
		  if(countryId!=0){
 		     Country country= new Country();
 		     country.setCountryId(countryId);
			  student.setCountryId(country);  
		  }
		  try {
			student.setDob(simpleDateFormat.parse(dobStr));
		} catch (ParseException e) {
			output.put("error", "true");
			 output.put("message","Invalid Date Of Birth");
			 return output.toString();
		}
		  student.setFatherEmail(fatherEmail);
		  student.setFatherMobile(fatherMobile);
		  student.setFatherOccupation(fatherOccupation);
		  student.setFirstName(firstName);
		  if(genderId!=0){
			  Gender gender= new Gender();
		      gender.setGenderId(genderId);
			  student.setGenderId(gender);  
		  }
		  student.setIdentificationMark(identificationMark);
		  student.setLandmark(landmark);
		  student.setMotherEmail(motherEmail);
		  student.setMotherMobile(motherMobile);
		  student.setFatherName(fatherName);
		  student.setMotherOccupation(motherOccupation);
		  if(motherTongueId!=0){
			  Language language= new Language();
			  language.setLanguageId(motherTongueId);
			  student.setMotherTongueId(language);  
		  }
		  student.setPincode(pincode);
		  if(religionId!=0){
			  Religion religion= new Religion();
			  religion.setReligionId(religionId);
			  student.setReligionId(religion);
		  }
		  SchoolAcademic schoolAcademicYearId=SchoolAcademic.fetchCurrentSchoolAcademic(SessionManager.getUserContext(request).getSchoolId()).get(0);
		  student.setSchoolAcademicYearId(schoolAcademicYearId);
		  SchoolClassSection schoolClassSection= new SchoolClassSection();
		  schoolClassSection.setSchoolClassSectionId(input.getInt("schoolClassSectionId"));
		  student.setSchoolClassSectionId(schoolClassSection);
		  student.setSchoolId(SessionManager.getUserContext(request).getStaff().getSchoolId());
		  if(stateId!=0){
			  State state= new State();
			  state.setStateId(stateId);
			  student.setStateId(state); 
		  }
		  
		  student.setStudentStatusId(GeneralConstants.STUDENT_STATUS_JUST_ADMITTED);
		  student.persist();
		  Student.generateAdmissionNo(SessionManager.getUserContext(request).getSchoolId());
		  output.put("error", "false");
		  output.put("message", "Student Successfully Saved");
		 return output.toString();
		 
		 }catch(Exception e){
			 output.put("error", "true");
			 output.put("message","Invalid Input");
			 e.printStackTrace();
			 return output.toString();
		 }
	 }
	 
	 @RequestMapping(value = "/findFullStudentDetails", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String findFullStudentDetails(HttpServletRequest request,HttpServletResponse reresponse)  {
		 JSONObject input= new JSONObject(request.getParameter("input"));
		 JSONObject output= new JSONObject();
		 Integer studentId=input.getInt("studentId");
		 List<Student> students=Student.findStudent(studentId, SessionManager.getUserContext(request).getSchoolId());
		 if(students.isEmpty()){
			 output.put("error", "true");
			 output.put("message", "Cannot fetch student ");
			 return output.toString();
		 }
		 Student student=students.get(0);
		 SimpleDateFormat simpleDateFormat= new SimpleDateFormat("dd-MM-yyyy");
		 student.setDobStr(simpleDateFormat.format(student.getDob()));
		 output.put("error", "false");
		 output.put("result", student.toJson());
		 return output.toString();
	 }
	 
	 @RequestMapping(value = "/deleteStudent", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String deleteStudent(HttpServletRequest request,HttpServletResponse reresponse)  {
		 JSONObject input= new JSONObject(request.getParameter("input"));
		 JSONObject output= new JSONObject();
		 Integer studentId=input.getInt("studentId");
		 List<Student> students=Student.findStudent(studentId, SessionManager.getUserContext(request).getSchoolId());
		 if(students.isEmpty()){
			 output.put("error", "true");
			 output.put("message", "Cannot Delete student ");
			 return output.toString();
		 }
		 List<StudentAttedance> studentAttedances=StudentAttedance.findStudentAttedanceForStudentId(studentId, SessionManager.getUserContext(request).getSchoolId());
		 if(!studentAttedances.isEmpty()){
			 output.put("error", "true");
			 output.put("message", "Student Contains Attendance Inforamtion Hence cannot delete ");
			 return output.toString();
		 }
		 
		 List<StudentExamination> examinations=StudentExamination.findStudentExaminationByStudentId(studentId, SessionManager.getUserContext(request).getSchoolId());
		 if(!examinations.isEmpty()){
			 output.put("error", "true");
			 output.put("message", "Student Contains Exam Inforamtion Hence cannot delete ");
			 return output.toString();
		 }
		 
		 List<SchoolFee> schoolFees=SchoolFee.findSchoolFee(studentId, SessionManager.getUserContext(request).getSchoolId()) ;
		 if(!schoolFees.isEmpty()){
			 output.put("error", "true");
			 output.put("message", "Student Contains Fee Inforamtion Hence cannot delete ");
			 return output.toString();
		 
		 }
		 students.get(0).remove();
		 output.put("error", "false");
		 output.put("message", "Deleted Successfully");
		 return output.toString();
	 }

	 
	 @RequestMapping(value = "/promoteStudents", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 @Transactional
	 public String promoteStudents(HttpServletRequest request,HttpServletResponse reresponse)  {
		 JSONObject input= new JSONObject(request.getParameter("input"));
		 JSONObject output= new JSONObject();
		 try {
			
			 Integer fromSchoolClassSectionId=input.getInt("fromSchoolClassSectionId");
			 Integer toSchoolClassSectionId=input.getInt("toSchoolClassSectionId");
			 Integer passOut=input.getInt("passOut");
			 JSONArray jsonArray=input.getJSONArray("studentIdArray");
			 List<Integer> studentIds=new ArrayList<Integer>();
			 boolean hasSwap=false;
			 if(input.getInt("swap")==1){
				 hasSwap=true;
				 SchoolClassSection fromSchoolClassSection=SchoolClassSection.findSchoolClassSectionActual(fromSchoolClassSectionId, SessionManager.getUserContext(request).getSchoolId()).get(0);
				 SchoolClassSection toSchoolClassSection=SchoolClassSection.findSchoolClassSectionActual(toSchoolClassSectionId, SessionManager.getUserContext(request).getSchoolId()).get(0);
				 if(fromSchoolClassSection.getSchoolClassId().getSchoolClassId()!=
						 toSchoolClassSection.getSchoolClassId().getSchoolClassId()){
					 output.put("error", "true");
					 output.put("message", "Only Same class Students can be Swapped");
					 return output.toString();
				 }
			 }
			 
			 List<Integer> studentIdsActual=Student.findStudentIdsBySchoolClassSectioId(fromSchoolClassSectionId, SessionManager.getUserContext(request).getSchoolId());
			 for (int i = 0; i < jsonArray.length(); i++) {
				JSONObject jsonObject=jsonArray.getJSONObject(i);
				studentIds.add(jsonObject.getInt("studentId"));
				if(!studentIdsActual.contains(jsonObject.getInt("studentId"))){
					output.put("error", "true");
					 output.put("message", "Invalid Student");
					 return output.toString();
				}
			}
			List<Integer> studentsNotPromoted=new ArrayList<Integer>(studentIdsActual);
				 studentsNotPromoted.removeAll(studentIds);
			 
			 
			 List<SchoolAcademic> schoolAcademics  = SchoolAcademic.fetchCurrentSchoolAcademic(SessionManager.getUserContext(request).getSchoolId());
			 
			 List<AcademicYear> academicYears=AcademicYear.findAllAcademicYears();
			 boolean takeNext=false;
			 Integer toacademicYearId=0;
			 for (AcademicYear academicYear : academicYears) {
				 if(takeNext==true){
					 toacademicYearId=academicYear.getAcademicYearId();
					 break;
				 }
				 if(academicYear.getAcademicYearId()==schoolAcademics.get(0).getAcademicYearId().getAcademicYearId()){
					 takeNext=true;
				 }
			}
		
			 if(!hasSwap){
				 List<Promotion> promotions=Promotion.findNotPromoted(fromSchoolClassSectionId, schoolAcademics.get(0).getAcademicYearId().getAcademicYearId(), toacademicYearId);
				 for (Promotion promotion : promotions) {
					promotion.remove();
				}
				 
				 for (Integer integer : studentIds) {
						Promotion promotion= new Promotion();
						promotion.setAuditCreatedDate(new Date(System.currentTimeMillis()));
						promotion.setAuditUserId(SessionManager.getUserContext(request).getStaff().getStaffId());
						promotion.setToSchoolAcademicYearId(toacademicYearId);
						promotion.setFromSchoolAcademicYearId(schoolAcademics.get(0).getAcademicYearId().getAcademicYearId());
						promotion.setFromSchoolClassSectionId(fromSchoolClassSectionId);
						promotion.setToSchoolClassSectionId(toSchoolClassSectionId);
						promotion.setStudentId(integer);
						if(passOut!=0){
							promotion.setPromotionStatus(GeneralConstants.PROMOTION_STATUS_PASSED_OUT);
						}else{
							promotion.setPromotionStatus(GeneralConstants.PROMOTION_STATUS_PROMOTED);
						}
						promotion.persist();
					}
				 
				 for (Integer integer : studentsNotPromoted) {
						Promotion promotion= new Promotion();
						promotion.setAuditCreatedDate(new Date(System.currentTimeMillis()));
						promotion.setAuditUserId(SessionManager.getUserContext(request).getStaff().getStaffId());
						promotion.setToSchoolAcademicYearId(toacademicYearId);
						promotion.setFromSchoolAcademicYearId(schoolAcademics.get(0).getAcademicYearId().getAcademicYearId());
						promotion.setFromSchoolClassSectionId(fromSchoolClassSectionId);
						promotion.setToSchoolClassSectionId(toSchoolClassSectionId);
						promotion.setStudentId(integer);
						promotion.setPromotionStatus(GeneralConstants.PROMOTION_STATUS_NOT_PROMOTED);
						promotion.persist();
					}
			 }
			
			 String studentIdstr=studentIds.toString();
			 studentIdstr=studentIdstr.replace("[", "(");
			 studentIdstr=studentIdstr.replace("]", ")");
			 if(passOut==1){
				 Student.updateStudent(studentIdstr, SessionManager.getUserContext(request).getSchoolId(), null);
			 }else{
				 Student.updateStudent(studentIdstr, SessionManager.getUserContext(request).getSchoolId(), toSchoolClassSectionId);
			 }
			
			 output.put("error", "false");
			 if(hasSwap){
				 output.put("message", "Swapped Successfully");
			 }else{
				 output.put("message", "Promoted Successfully");
			 }
			 
			 return output.toString();
		} catch (Exception e) {
			e.printStackTrace();
			 output.put("error", "true");
			 output.put("message", "Some Error Occurred Contact Hemanth 9535381386");
			 return output.toString();
		}
	 }

	 @RequestMapping(value = "/findBirthdayLIst", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String findBirthdayLIst(HttpServletRequest request,HttpServletResponse reresponse)  {
		 JSONObject input= new JSONObject(request.getParameter("input"));
		 JSONObject output= new JSONObject();
		 try{
			 Integer month=input.getInt("monthId");
			 String monthstr=String.valueOf(month);
			 if(!monthstr.startsWith("0")){
				 monthstr="0"+monthstr;
			 }
			 List<Object[]> results=Student.findBirthDayList(monthstr, SessionManager.getUserContext(request).getSchoolId());
			 
			 output.put("error", "false"); 
			 output.put("result", new JSONSerializer().serialize(results));
			 return output.toString();
		 }catch(Exception e){
			 output.put("error", "true"); 
			 output.put("message", "Some Error Occurred");
			 e.printStackTrace();
			 return output.toString();
		 }
		 
	 }
	 @RequestMapping(value = "/fetchStudentNameLike", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String fetchStudentNameLike(HttpServletRequest request,HttpServletResponse reresponse)  {
			String studentNameKey=request.getParameter("param");
			List<Student> students= new ArrayList<Student>();
			if(studentNameKey.length()>2){
				 students=Student.findStudentByNameLike(studentNameKey, SessionManager.getUserContext(request).getSchoolId());	
			}
			
			
	         JSONArray jsonArray= new JSONArray();
	         for (Student student : students) {
	 			JSONObject jsonObject= new JSONObject();
	 			jsonObject.put("label", student.getFirstName()+" ("+student.getSchoolClassSectionId().getCode()+") "+" c/o "+student.getFatherName()  );
	 		 	jsonObject.put("value", student.getStudentId());
	 		 	jsonObject.put("forInpuBox", student.getFirstName());
	 		 	jsonArray.put(jsonObject);
	 		}
	         JSONObject jsonObject= new JSONObject();
	         jsonObject.put("error", "false");
	         jsonObject.put("result", jsonArray.toString());
			
			return jsonObject.toString();
		
	 }
	 
	 
	 
	 @RequestMapping(value = "/findSchoolDefnByStudentId", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String findSchoolDefnByStudentId(HttpServletRequest request,HttpServletResponse reresponse)  {
		 JSONObject input= new JSONObject(request.getParameter("input"));
		 JSONObject output= new JSONObject();
		 Integer studentId=input.getInt("studentId");
		 Integer schoolId= SessionManager.getUserContext(request).getSchoolId();
		 List<Student> students=Student.findStudent(studentId, schoolId);
		 if(students.isEmpty()){
			 output.put("error", "true");
			 output.put("message","Data cant be fetched" );
			 return output.toString();
		 }else{
			 output.put("studentData", students.get(0).toJson());
			 List<SchoolAcademic> schoolAcademics  = SchoolAcademic.fetchCurrentSchoolAcademic(SessionManager.getUserContext(request).getSchoolId());
			 if(schoolAcademics.isEmpty()){
				 output.put("error", "true");
				 output.put("message","no active year" );
				 return output.toString();
			 }
			 List<SchoolFee> schoolFees=SchoolFee.findSchoolFee(studentId, schoolId);
			 JSONArray schoolFeeIds=new JSONArray();
			 for (SchoolFee schoolFee : schoolFees) {
				 schoolFeeIds.put(schoolFee.getSchoolFeeId());	
			 }
			 output.put("schoolFeeIds", schoolFeeIds);
			 output.put("error", "false");
			 output.put("schoolFeeData",SchoolFee.toJsonArray(schoolFees));
			 return output.toString();
		 }
		 
		
	 }

	 
	 @RequestMapping(value = "/findPromotionReport", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String findPromotionReport(HttpServletRequest request,HttpServletResponse reresponse)  {
		 JSONObject input= new JSONObject(request.getParameter("input"));
		 JSONObject output= new JSONObject();
		 try {
			Integer fromAcademicYearId=input.getInt("fromAcademicId");
			 Integer toAcademicYearId=input.getInt("toAcademicId");
			 List<SchoolClassSection> schoolClassSections=SchoolClassSection.findSchoolClassSectionFull(SessionManager.getUserContext(request).getSchoolId());
			 JSONArray array= new JSONArray();
			 for (SchoolClassSection schoolClassSection : schoolClassSections) {
				JSONObject jsonObject= new JSONObject();
				jsonObject.put("className", schoolClassSection.getSchoolClassSectionName());
				jsonObject.put("code", schoolClassSection.getCode());
				String promtedfind="'"+GeneralConstants.PROMOTION_STATUS_PASSED_OUT+"'"+","+"'"+GeneralConstants.PROMOTION_STATUS_PROMOTED+"'";
				String notPromoted="'"+GeneralConstants.PROMOTION_STATUS_NOT_PROMOTED+"'";
				List<Promotion> promted=  Promotion.findPromotionData(schoolClassSection.getSchoolClassSectionId(), fromAcademicYearId, toAcademicYearId, promtedfind);

				List<Promotion> notPromtedlist=  Promotion.findPromotionData(schoolClassSection.getSchoolClassSectionId(), fromAcademicYearId, toAcademicYearId, notPromoted);
				List<Student> students=Student.findStudentBySchoolClassSectioId(schoolClassSection.getSchoolClassSectionId(), SessionManager.getUserContext(request).getSchoolId());
				jsonObject.put("promoted", promted.size());
				jsonObject.put("notPromted", notPromtedlist.size());
				jsonObject.put("total", promted.size()+notPromtedlist.size());
				array.put(jsonObject);  
			}
			 output.put("error", "false");
			 output.put("message", "Report Successfully Generated");
			 AcademicYear fromYear=AcademicYear.findAcademicYear(fromAcademicYearId);
			 AcademicYear toYear=AcademicYear.findAcademicYear(toAcademicYearId);
			 output.put("result", array.toString());
			 output.put("academicYears", fromYear.getAcademicYear()+" - "+toYear.getAcademicYear());
			 return output.toString();
		} catch (Exception e) {
			output.put("error", "true");
			 output.put("message", "Some Error Occurred");
			 e.printStackTrace();
			 return output.toString();
		}
	 }
	 
	 
	 @RequestMapping(value = "/findStudentForClassOrSection", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String findStudentForClassOrSection(HttpServletRequest request,HttpServletResponse reresponse)  {
		 JSONObject input= new JSONObject(request.getParameter("input"));
		 JSONObject output= new JSONObject();
		 String classOrSectionId=input.getString("classOrSectionId");
		 List<Object[]> result= new ArrayList<Object[]>();
		 Map<String, Integer> map= new HashMap<String, Integer>();
		 if(classOrSectionId.startsWith("osc")){
		   Integer schoolClassId=Integer.parseInt(classOrSectionId.split("-")[1]);	 
		   map.put("schoolClass", schoolClassId);
		 }else if(classOrSectionId.startsWith("scs")){
			 Integer schoolClassSectionId=Integer.parseInt(classOrSectionId.split("-")[1]);	 
			 map.put("schoolClassSection", schoolClassSectionId);
		 }
		 map.put("schoolId", SessionManager.getUserContext(request).getSchoolId());
		
		 result=Student.findStudentBySchoolClassOrSchoolClassSection(map);
		 output.put("result", new JSONSerializer().serialize(result));
		 output.put("error", "false");
		 return output.toString();
	 }
	 
	 @RequestMapping(value = "/findStudentForClassOrSectionForAttendance", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String findStudentForClassOrSectionForAttendance(HttpServletRequest request,HttpServletResponse reresponse)  {
		 JSONObject input= new JSONObject(request.getParameter("input"));
		 JSONObject output= new JSONObject();
		 Integer schoolId=SessionManager.getUserContext(request).getSchoolId();
		 try{
		 String classOrSectionId=input.getString("classOrSectionId");
		 List<Object[]> result= new ArrayList<Object[]>();
		 List<Integer> allStudentsIds=new ArrayList<Integer>();
		 if(classOrSectionId.startsWith("osc")){
		   Integer schoolClassId=Integer.parseInt(classOrSectionId.split("-")[1]);
		   List<Integer> studentIds =  Student.findStudentIdsBySchoolClassId(schoolClassId, schoolId);
		   allStudentsIds.addAll(studentIds);
		 }else if(classOrSectionId.startsWith("scs")){
			 Integer schoolClassSectionId=Integer.parseInt(classOrSectionId.split("-")[1]);	 
			 List<Integer> studentIds =  Student.findStudentIdsBySchoolClassSectioId(schoolClassSectionId, schoolId);
			   allStudentsIds.addAll(studentIds);
		 }
		 
		 SimpleDateFormat inputDateFromat=new SimpleDateFormat("dd-MM-yyyy");
		 SimpleDateFormat queryDateFromat=new SimpleDateFormat("yyyy-MM-dd");
		 Date inputDate=inputDateFromat.parse(input.getString("attendanceDate"));
		 String dateStrForQuering=queryDateFromat.format(inputDate);
		 String allStudentIdsStr=allStudentsIds.toString();
		 allStudentIdsStr=allStudentIdsStr.replace("[", "(");
		 allStudentIdsStr=allStudentIdsStr.replace("]", ")");
		 List<SchoolAcademic> schoolAcademics  = SchoolAcademic.fetchCurrentSchoolAcademic(SessionManager.getUserContext(request).getSchoolId());
		 if(schoolAcademics.isEmpty()){
			 output.put("error", "true");
			 output.put("message","no active year" );
			 return output.toString();
		 }
		 
		 
		 Integer schoolSessionId= input.getInt("schoolSessionId");
		 List<Integer> studentIdsWhoHasAttendanceMarking=StudentAttedance.
				 findStudentAttedanceForStudentId(allStudentIdsStr, schoolId, inputDate, schoolSessionId, schoolAcademics.get(0).getSchoolAcademicYearId());
          List<Object[]> finalAttendanceResult=new ArrayList<Object[]>();
          allStudentsIds.removeAll(studentIdsWhoHasAttendanceMarking);
          allStudentIdsStr=allStudentsIds.toString();
          allStudentIdsStr=allStudentIdsStr.replace("[", "(");
 		 allStudentIdsStr=allStudentIdsStr.replace("]", ")");
          
          String studentIdsWhoHasAttendanceMarkingStr=studentIdsWhoHasAttendanceMarking.toString();
          studentIdsWhoHasAttendanceMarkingStr=studentIdsWhoHasAttendanceMarkingStr.replace("[", "(");
          studentIdsWhoHasAttendanceMarkingStr=studentIdsWhoHasAttendanceMarkingStr.replace("]", ")");
          List<Object[]> attendanceDisplayWhoHasMarking=StudentAttedance.findStudentAttendanceforStudentIdsWhoHasMarking(studentIdsWhoHasAttendanceMarkingStr, dateStrForQuering, schoolSessionId,
        		  schoolAcademics.get(0).getSchoolAcademicYearId(), schoolId);
          List<Object[]> attendanceDisplayWhoDontHaveMarking=StudentAttedance.findStudentAttendanceforStudentIdsWhoDonotHaveMarking
        		  (allStudentIdsStr, schoolAcademics.get(0).getSchoolAcademicYearId(), schoolId);
          
          finalAttendanceResult.addAll(attendanceDisplayWhoDontHaveMarking);
          finalAttendanceResult.addAll(attendanceDisplayWhoHasMarking);
		 
		 output.put("result", new JSONSerializer().serialize(finalAttendanceResult));
		 output.put("error", "false");
		 output.put("message", "Now Select Students, mark attendance and Save it");
		 return output.toString();
	 } catch (ParseException e) {
			output.put("error", "true");
			 output.put("message", "Invalid Date");
			 e.printStackTrace();
			 return output.toString();
		}
       catch (Exception e) {
				output.put("error", "true");
				 output.put("message", "Some Error Occurred");
				 e.printStackTrace();
				 return output.toString();
			}
	 }


	 
	 
	
	
}
