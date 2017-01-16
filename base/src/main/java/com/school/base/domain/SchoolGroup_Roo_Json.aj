// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.school.base.domain;

import com.school.base.domain.SchoolGroup;
import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

privileged aspect SchoolGroup_Roo_Json {
    
    public String SchoolGroup.toJson() {
        return new JSONSerializer()
        .exclude("*.class").serialize(this);
    }
    
    public String SchoolGroup.toJson(String[] fields) {
        return new JSONSerializer()
        .include(fields).exclude("*.class").serialize(this);
    }
    
    public static SchoolGroup SchoolGroup.fromJsonToSchoolGroup(String json) {
        return new JSONDeserializer<SchoolGroup>()
        .use(null, SchoolGroup.class).deserialize(json);
    }
    
    public static String SchoolGroup.toJsonArray(Collection<SchoolGroup> collection) {
        return new JSONSerializer()
        .exclude("*.class").serialize(collection);
    }
    
    public static String SchoolGroup.toJsonArray(Collection<SchoolGroup> collection, String[] fields) {
        return new JSONSerializer()
        .include(fields).exclude("*.class").serialize(collection);
    }
    
    public static Collection<SchoolGroup> SchoolGroup.fromJsonArrayToSchoolGroups(String json) {
        return new JSONDeserializer<List<SchoolGroup>>()
        .use("values", SchoolGroup.class).deserialize(json);
    }
    
}