// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.school.base.domain;

import com.school.base.domain.Staff;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

privileged aspect Staff_Roo_ToString {
    
    public String Staff.toString() {
        return new ReflectionToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE).setExcludeFieldNames("classExaminations", "homeWorks", "schoolClassSections", "schoolFees", "schoolFeeReceipts", "schoolHolidays", "schoolLogins", "smss", "smss1", "staffs", "staffAttendances", "staffAttendances1", "students", "studentAttedances", "studentExaminations", "subjectStaffClasses", "auiditUserId", "schoolId", "stateId", "countryId", "religionId", "bloodGroupId", "genderId", "motherTongueId", "casteId", "departmentId", "positionId", "cityId").toString();
    }
    
}
