package com.school.ui.admin.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigInteger;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONArray;

public class ReceiptTO {
	private BigInteger receiptNo;
	private String paymentMode;
	private String otherDetails;
	private String receiptDate;
	private JSONArray receiptDetails;
	public BigInteger getReceiptNo() {
		return receiptNo;
	}
	public void setReceiptNo(BigInteger receiptNo) {
		this.receiptNo = receiptNo;
	}
	public String getPaymentMode() {
		return paymentMode;
	}
	public void setPaymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
	}
	public String getOtherDetails() {
		return otherDetails;
	}
	public void setOtherDetails(String otherDetails) {
		this.otherDetails = otherDetails;
	}
	public String getReceiptDate() {
		return receiptDate;
	}
	public void setReceiptDate(String receiptDate) {
		this.receiptDate = receiptDate;
	}
	public JSONArray getReceiptDetails() {
		return receiptDetails;
	}
	public void setReceiptDetails(JSONArray receiptDetails) {
		this.receiptDetails = receiptDetails;
	}
	
		
	

}
