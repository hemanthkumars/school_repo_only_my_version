package com.school.ui.admin.util;

import org.springframework.scheduling.annotation.Scheduled;

import com.school.base.domain.Sms;

public class SmsIntiate implements Runnable {

	
	
   public static void initiateSmsSending(){
	     Thread thread=new Thread(new SmsIntiate());
	     thread.start();
	}
	
	@Override
	public void run() {
        Sms.sendAllPendingSMS();
	}
	
	@Scheduled(fixedDelay=60000)
	 public static void sendSmsCron(){
		 Sms.updateSentSmsStatus();
	 }

}
