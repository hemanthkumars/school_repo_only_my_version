package com.school.ui.admin.controller.admin;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.school.base.domain.SchoolLogin;
import com.school.base.domain.Staff;
import com.school.base.util.EncryptAndDecrypt;
import com.school.ui.admin.util.SessionManager;
import com.school.ui.admin.util.UserContext;

@RequestMapping("/admin/login")
@Controller
public class LoginController {
	
	@RequestMapping(value = "/authenticateLogin", method = RequestMethod.POST,produces = "application/json")
	 @ResponseBody
	 public String login(HttpServletRequest request,HttpServletResponse reresponse)  {
		JSONObject input= new JSONObject(request.getParameter("input"));
		String userName=input.getString("userName");
		String password=input.getString("password");
		password=EncryptAndDecrypt.encrypt(password);
		SchoolLogin schoolLogin=SchoolLogin.authenticateLogin(userName, password);
		JSONObject output= new JSONObject();
		if(schoolLogin==null){
			output.put("error", "true");
			output.put("message", "Invalid Username or Password");
		}else{
			output.put("error", "false");
			output.put("message", "Login Successfull");
			UserContext userContext= new UserContext();
			Staff staff=schoolLogin.getStaffId();
			userContext.setStaff(staff);
			userContext.setSchoolId(schoolLogin.getSchoolId().getSchoolId());
			SessionManager.putUserContext(request, userContext);
			output.put("JSESSIONID", request.getSession().getId());
			
		}
		
		
		
		
		return output.toString();
	}
	
}
