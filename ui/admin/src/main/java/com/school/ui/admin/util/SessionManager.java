package com.school.ui.admin.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class SessionManager {
	public static void putUserContext(HttpServletRequest request,UserContext userContext){
		HttpSession httpSession=request.getSession();
		httpSession.setMaxInactiveInterval(3600);
		httpSession.setAttribute("USER_CONTEXT", userContext);
	}
	
	public static UserContext getUserContext(HttpServletRequest request){
	    if(request.getSession().getAttribute("USER_CONTEXT")==null){
	    	return null;
	    }
		return (UserContext) request.getSession().getAttribute("USER_CONTEXT");
	}

}
