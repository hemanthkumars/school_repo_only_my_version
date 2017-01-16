package com.school.ui.admin.util;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

public class SecurityFilter implements Filter{

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest request2=(HttpServletRequest) request;
		HttpServletResponse response2=(HttpServletResponse) response;
		response2.addHeader("Access-Control-Allow-Origin", "*");
		response2.addHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, HEAD");
		response2.addHeader("Access-Control-Allow-Headers", "X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept");
		response2.addHeader("Access-Control-Max-Age", "1728000");

		JSONObject jsonObject= new JSONObject();
		UserContext userContext=SessionManager.getUserContext(request2);
		String servletPath=request2.getServletPath();
		if(servletPath.startsWith("/admin/login/authenticateLogin")
				|| servletPath.equals("/index.html")
				||servletPath.equals("/indexMain.html")
				||servletPath.startsWith("/libs")
				||servletPath.startsWith("/js")
				||servletPath.startsWith("/styles")
				||servletPath.startsWith("/templates")
				||servletPath.startsWith("/img")
				||servletPath.startsWith("/fonts")
				||servletPath.startsWith("/css")
				||servletPath.startsWith("/images")
				||servletPath.equals("")){
			chain.doFilter(request, response);
		}else if(userContext==null){
			jsonObject.put("error", "true");
			jsonObject.put("errorCode", "1");
			jsonObject.put("message", "Your Session has Expired Please Login again!");
			response2.setContentType("json");
			response2.getWriter().print(jsonObject.toString());
		}else{
			chain.doFilter(request, response);
		}
		
		
		
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

}
