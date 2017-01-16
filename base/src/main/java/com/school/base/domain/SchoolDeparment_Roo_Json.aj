// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.school.base.domain;

import com.school.base.domain.SchoolDeparment;
import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

privileged aspect SchoolDeparment_Roo_Json {
    
    public String SchoolDeparment.toJson() {
        return new JSONSerializer()
        .exclude("*.class").serialize(this);
    }
    
    public String SchoolDeparment.toJson(String[] fields) {
        return new JSONSerializer()
        .include(fields).exclude("*.class").serialize(this);
    }
    
    public static SchoolDeparment SchoolDeparment.fromJsonToSchoolDeparment(String json) {
        return new JSONDeserializer<SchoolDeparment>()
        .use(null, SchoolDeparment.class).deserialize(json);
    }
    
    public static String SchoolDeparment.toJsonArray(Collection<SchoolDeparment> collection) {
        return new JSONSerializer()
        .exclude("*.class").serialize(collection);
    }
    
    public static String SchoolDeparment.toJsonArray(Collection<SchoolDeparment> collection, String[] fields) {
        return new JSONSerializer()
        .include(fields).exclude("*.class").serialize(collection);
    }
    
    public static Collection<SchoolDeparment> SchoolDeparment.fromJsonArrayToSchoolDeparments(String json) {
        return new JSONDeserializer<List<SchoolDeparment>>()
        .use("values", SchoolDeparment.class).deserialize(json);
    }
    
}