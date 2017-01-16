package com.school.ui.admin.util;

import com.school.base.domain.Staff;

public class UserContext {
	private Staff staff;
	private Integer schoolId;
	
	public Integer getSchoolId() {
		return schoolId;
	}

	public void setSchoolId(Integer schoolId) {
		this.schoolId = schoolId;
	}

	public Staff getStaff() {
		return staff;
	}

	public void setStaff(Staff staff) {
		this.staff = staff;
	}
	
	
	
	
	
}
