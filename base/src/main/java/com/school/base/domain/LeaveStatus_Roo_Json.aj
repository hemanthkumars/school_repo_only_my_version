// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.school.base.domain;

import com.school.base.domain.LeaveStatus;
import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

privileged aspect LeaveStatus_Roo_Json {
    
    public String LeaveStatus.toJson() {
        return new JSONSerializer()
        .exclude("*.class").serialize(this);
    }
    
    public String LeaveStatus.toJson(String[] fields) {
        return new JSONSerializer()
        .include(fields).exclude("*.class").serialize(this);
    }
    
    public static LeaveStatus LeaveStatus.fromJsonToLeaveStatus(String json) {
        return new JSONDeserializer<LeaveStatus>()
        .use(null, LeaveStatus.class).deserialize(json);
    }
    
    public static String LeaveStatus.toJsonArray(Collection<LeaveStatus> collection) {
        return new JSONSerializer()
        .exclude("*.class").serialize(collection);
    }
    
    public static String LeaveStatus.toJsonArray(Collection<LeaveStatus> collection, String[] fields) {
        return new JSONSerializer()
        .include(fields).exclude("*.class").serialize(collection);
    }
    
    public static Collection<LeaveStatus> LeaveStatus.fromJsonArrayToLeaveStatuses(String json) {
        return new JSONDeserializer<List<LeaveStatus>>()
        .use("values", LeaveStatus.class).deserialize(json);
    }
    
}
