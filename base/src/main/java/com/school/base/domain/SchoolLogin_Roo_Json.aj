// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.school.base.domain;

import com.school.base.domain.SchoolLogin;
import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

privileged aspect SchoolLogin_Roo_Json {
    
    public String SchoolLogin.toJson() {
        return new JSONSerializer()
        .exclude("*.class").serialize(this);
    }
    
    public String SchoolLogin.toJson(String[] fields) {
        return new JSONSerializer()
        .include(fields).exclude("*.class").serialize(this);
    }
    
    public static SchoolLogin SchoolLogin.fromJsonToSchoolLogin(String json) {
        return new JSONDeserializer<SchoolLogin>()
        .use(null, SchoolLogin.class).deserialize(json);
    }
    
    public static String SchoolLogin.toJsonArray(Collection<SchoolLogin> collection) {
        return new JSONSerializer()
        .exclude("*.class").serialize(collection);
    }
    
    public static String SchoolLogin.toJsonArray(Collection<SchoolLogin> collection, String[] fields) {
        return new JSONSerializer()
        .include(fields).exclude("*.class").serialize(collection);
    }
    
    public static Collection<SchoolLogin> SchoolLogin.fromJsonArrayToSchoolLogins(String json) {
        return new JSONDeserializer<List<SchoolLogin>>()
        .use("values", SchoolLogin.class).deserialize(json);
    }
    
}
