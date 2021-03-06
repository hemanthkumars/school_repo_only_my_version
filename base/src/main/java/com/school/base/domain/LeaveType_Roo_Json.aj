// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.school.base.domain;

import com.school.base.domain.LeaveType;
import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

privileged aspect LeaveType_Roo_Json {
    
    public String LeaveType.toJson() {
        return new JSONSerializer()
        .exclude("*.class").serialize(this);
    }
    
    public String LeaveType.toJson(String[] fields) {
        return new JSONSerializer()
        .include(fields).exclude("*.class").serialize(this);
    }
    
    public static LeaveType LeaveType.fromJsonToLeaveType(String json) {
        return new JSONDeserializer<LeaveType>()
        .use(null, LeaveType.class).deserialize(json);
    }
    
    public static String LeaveType.toJsonArray(Collection<LeaveType> collection) {
        return new JSONSerializer()
        .exclude("*.class").serialize(collection);
    }
    
    public static String LeaveType.toJsonArray(Collection<LeaveType> collection, String[] fields) {
        return new JSONSerializer()
        .include(fields).exclude("*.class").serialize(collection);
    }
    
    public static Collection<LeaveType> LeaveType.fromJsonArrayToLeaveTypes(String json) {
        return new JSONDeserializer<List<LeaveType>>()
        .use("values", LeaveType.class).deserialize(json);
    }
    
}
