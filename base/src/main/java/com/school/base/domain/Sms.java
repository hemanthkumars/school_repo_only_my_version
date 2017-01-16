package com.school.base.domain;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;

import org.springframework.roo.addon.dbre.RooDbManaged;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.tostring.RooToString;

import com.school.base.util.GeneralConstants;

@RooJavaBean
@RooJpaActiveRecord(versionField = "", table = "sms")
@RooDbManaged(automaticallyDelete = true)
@RooToString(excludeFields = { "schoolId", "schoolAcademicYearId", "studentId", "staffId", "auditUserId" })
@RooJson
public class Sms {
	
	@Column(name = "SMS_SENT_DT_TIME")
    private Date smsSentDtTime;
    
	@Column(name = "SMS_DELIVERED_DT_TIME")
    private Date smsDeliveredDtTime;

	
	public Date getSmsSentDtTime() {
		return smsSentDtTime;
	}

	public void setSmsSentDtTime(Date smsSentDtTime) {
		this.smsSentDtTime = smsSentDtTime;
	}


	public Date getSmsDeliveredDtTime() {
		return smsDeliveredDtTime;
	}

	public void setSmsDeliveredDtTime(Date smsDeliveredDtTime) {
		this.smsDeliveredDtTime = smsDeliveredDtTime;
	}

	public static List<Sms>  findAllSMSByStatus(String smsStatus){
		List<Sms> list=entityManager().createQuery("SELECT sl FROM Sms sl WHERE sl.smsStatus='"+smsStatus+"' ").getResultList();
		return list;
	}
	
	
	public synchronized  static void sendAllPendingSMS(){
		List<Sms> smsList=findAllSMSByStatus(GeneralConstants.SMS_STATUS_IN_QUEQUE);
		School school=null;
		Integer totalSmsSending=0;
		for (Sms sms : smsList) {
			 school=sms.getSchoolId();
			 totalSmsSending+=sms.getSmsCount();
			Map<String, String> map =new HashMap<String, String>();
			map.put("userName", school.getSmsUserName());
			map.put("apiKey", school.getApiKey());
			map.put("message", sms.getSmsDetail());
			map.put("recipientMobileNo", sms.getRecipientMobileNo());
			map.put("senderId", school.getSmsSenderId());
			sms.setSmsStatus(GeneralConstants.SMS_STATUS_SENDING);
			sms.merge();
			String messageIdFormProvider=sendSms(map);
			if(messageIdFormProvider!="0"){
			   sms.setSmsStatus(GeneralConstants.SMS_STATUS_MESSAGE_SENT);
			   sms.setSmsSentDtTime(new Date(System.currentTimeMillis()));
			   sms.setMessageId(messageIdFormProvider);
			   sms.merge();
			}else{
				sms.setSmsStatus(GeneralConstants.SMS_STATUS_IN_QUEQUE);
				sms.merge();
			}

		}
		school.setTotalNoOfSmsRemaining(school.getTotalNoOfSmsRemaining()-totalSmsSending);
		school.merge();
		
	}
	
	
    public  static void updateSentSmsStatus(){
    	List<Sms> smsList=findAllSMSByStatus(GeneralConstants.SMS_STATUS_MESSAGE_SENT);
		for (Sms sms : smsList) {
			School school=sms.getSchoolId();
			Map<String, String> map =new HashMap<String, String>();
			map.put("userName", school.getSmsUserName());
			map.put("apiKey", school.getApiKey());
			map.put("messageId", sms.getMessageId());
			String deliveryStatus=  checkDeliveryStatus(map);
			if(deliveryStatus.equals("DELIVRD")){
				sms.setSmsStatus(GeneralConstants.SMS_DELIVERED);
				sms.setSmsDeliveredDtTime(new Date(System.currentTimeMillis()));
				sms.merge();
			}else if(!deliveryStatus.equalsIgnoreCase("Message Sent")){
				sms.setSmsStatus(GeneralConstants.SMS_NOT_DELIVERED);
				sms.merge();
			}
		}
	}
    
    
    public static String sendSms(Map<String, String> map){
		URLConnection myURLConnection=null;
		
		BufferedReader reader=null;

		String mainUrl="http://smshorizon.co.in/api/sendsms.php?";
		String encoded_message=URLEncoder.encode(map.get("message"));
		//Prepare parameter string 
		String type="txt";
		StringBuilder sbPostData= new StringBuilder(mainUrl);
		sbPostData.append("user="+map.get("userName")); 
		sbPostData.append("&apikey="+map.get("apiKey"));
		sbPostData.append("&message="+encoded_message);
		sbPostData.append("&mobile="+map.get("recipientMobileNo"));
		sbPostData.append("&senderid="+map.get("senderId"));
		sbPostData.append("&type="+type);

		//final string
		mainUrl = sbPostData.toString();
		URL myURL=null;
		try
		{
		    //prepare connection
		    myURL = new URL(mainUrl);
		    myURLConnection = myURL.openConnection();
		    myURLConnection.connect();
		    reader= new BufferedReader(new InputStreamReader(myURLConnection.getInputStream()));
		    //reading response 
		    String response1=reader.readLine();
		   
		    //print response 
		    response1=response1.trim();
		    Integer smsCode=Integer.parseInt(response1);
		    //finally close connection
		    reader.close();
		    return response1;
		} 
		catch (Exception e) 
		{ 
			e.printStackTrace();
		}
		return "0"; 
	}
    
    public static String checkDeliveryStatus(Map<String, String> map){
		URLConnection myURLConnection=null;
		
		BufferedReader reader=null;

		String mainUrl="http://smshorizon.co.in/api/status.php?";

		//Prepare parameter string 
		String type="txt";
		StringBuilder sbPostData= new StringBuilder(mainUrl);
		sbPostData.append("user="+map.get("userName")); 
		sbPostData.append("&apikey="+map.get("apiKey"));
		sbPostData.append("&msgid="+map.get("messageId"));

		//final string
		mainUrl = sbPostData.toString();
		URL myURL=null;
		try
		{
		    //prepare connection
		    myURL = new URL(mainUrl);
		    myURLConnection = myURL.openConnection();
		    myURLConnection.connect();
		    reader= new BufferedReader(new InputStreamReader(myURLConnection.getInputStream()));
		    //reading response 
		    String response1=reader.readLine();
		    if ((response1) != null) {
		    }
		    //print response 
		    response1=response1.trim();
		    //finally close connection
		    reader.close();
		    return response1;
		} 
		catch (Exception e) 
		{ 
			e.printStackTrace();
		}
		return "0"; 
	}
	
    public static Integer sendSms(String mobile,Map<String, String> map){

		String apikey = map.get("");

		// Replace with the destination mobile Number to which you want to send sms
		//String mobile = "9535381386";

		// Replace if you have your own Sender ID, else donot change
		String senderid = "LEOKID";

		// Replace with your Message content
		StringBuilder messageb=new StringBuilder();
		String message = map.get("message");

		// For Plain Text, use "txt" ; for Unicode symbols or regional Languages like hindi/tamil/kannada use "uni"
		String type="txt";
		String username=map.get("");

		//Prepare Url
		URLConnection myURLConnection=null;
		URL myURL=null;
		BufferedReader reader=null;

		//encoding message 
		String encoded_message=URLEncoder.encode(message);

		//Send SMS API
		String mainUrl="http://smshorizon.co.in/api/sendsms.php?";

		//Prepare parameter string 
		StringBuilder sbPostData= new StringBuilder(mainUrl);
		sbPostData.append("user="+username); 
		sbPostData.append("&apikey="+apikey);
		sbPostData.append("&message="+encoded_message);
		sbPostData.append("&mobile="+mobile);
		sbPostData.append("&senderid="+senderid);
		sbPostData.append("&type="+type);

		//final string
		mainUrl = sbPostData.toString();
		try
		{
		    //prepare connection
		    myURL = new URL(mainUrl);
		    myURLConnection = myURL.openConnection();
		    myURLConnection.connect();
		    reader= new BufferedReader(new InputStreamReader(myURLConnection.getInputStream()));
		    //reading response 
		    String response1=reader.readLine();
		    if ((response1) != null) {
		    	System.out.println(response1);
		    }
		    //print response 
		    response1=response1.trim();
		    Integer smsCode=Integer.parseInt(response1);
		    //finally close connection
		    reader.close();
		    return smsCode;
		} 
		catch (IOException e) 
		{ 
			e.printStackTrace();
		}
		return 0; 

	}
    
    
    public static List<Object[]>  findDeliveryReport(String dateStr){
		StringBuilder query= new StringBuilder();
		query.append(" SELECT s.STUDENT_ID,s.FIRST_NAME,m.RECIPIENT_MOBILE_NO,s.FATHER_NAME,");
		query.append(" m.SMS_DETAIL,m.SMS_COST,m.SMS_COUNT,m.SMS_SENT_DT_TIME,m.SMS_DELIVERED_DT_TIME,");
		query.append(" m.SMS_STATUS");
		query.append(" FROM sms m");
		query.append(" LEFT OUTER JOIN student s ON  m.STUDENT_ID=s.STUDENT_ID ");
		query.append(" WHERE ");
		query.append("  m.SMS_SENT_DT_TIME LIKE '"+dateStr+"%'");
		query.append(" GROUP BY m.SMS_ID");
		return entityManager().createNativeQuery(query.toString()).getResultList();
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
