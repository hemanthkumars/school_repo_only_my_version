// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.school.base.domain;

import com.school.base.domain.Promotion;
import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

privileged aspect Promotion_Roo_Json {
    
    public String Promotion.toJson() {
        return new JSONSerializer()
        .exclude("*.class").serialize(this);
    }
    
    public String Promotion.toJson(String[] fields) {
        return new JSONSerializer()
        .include(fields).exclude("*.class").serialize(this);
    }
    
    public static Promotion Promotion.fromJsonToPromotion(String json) {
        return new JSONDeserializer<Promotion>()
        .use(null, Promotion.class).deserialize(json);
    }
    
    public static String Promotion.toJsonArray(Collection<Promotion> collection) {
        return new JSONSerializer()
        .exclude("*.class").serialize(collection);
    }
    
    public static String Promotion.toJsonArray(Collection<Promotion> collection, String[] fields) {
        return new JSONSerializer()
        .include(fields).exclude("*.class").serialize(collection);
    }
    
    public static Collection<Promotion> Promotion.fromJsonArrayToPromotions(String json) {
        return new JSONDeserializer<List<Promotion>>()
        .use("values", Promotion.class).deserialize(json);
    }
    
}
