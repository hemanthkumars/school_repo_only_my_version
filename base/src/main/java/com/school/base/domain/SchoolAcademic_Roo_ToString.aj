// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.school.base.domain;

import com.school.base.domain.SchoolAcademic;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

privileged aspect SchoolAcademic_Roo_ToString {
    
    public String SchoolAcademic.toString() {
        return new ReflectionToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE).setExcludeFieldNames("classExaminations", "homeWorks", "schoolFees", "schoolHolidays", "smss", "students", "studentAttedances", "schoolId", "academicYearId").toString();
    }
    
}
