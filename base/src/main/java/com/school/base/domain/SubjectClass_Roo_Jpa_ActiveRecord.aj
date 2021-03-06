// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.school.base.domain;

import com.school.base.domain.SubjectClass;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.transaction.annotation.Transactional;

privileged aspect SubjectClass_Roo_Jpa_ActiveRecord {
    
    @PersistenceContext
    transient EntityManager SubjectClass.entityManager;
    
    public static final List<String> SubjectClass.fieldNames4OrderClauseFilter = java.util.Arrays.asList("");
    
    public static final EntityManager SubjectClass.entityManager() {
        EntityManager em = new SubjectClass().entityManager;
        if (em == null) throw new IllegalStateException("Entity manager has not been injected (is the Spring Aspects JAR configured as an AJC/AJDT aspects library?)");
        return em;
    }
    
    public static long SubjectClass.countSubjectClasses() {
        return entityManager().createQuery("SELECT COUNT(o) FROM SubjectClass o", Long.class).getSingleResult();
    }
    
    public static List<SubjectClass> SubjectClass.findAllSubjectClasses() {
        return entityManager().createQuery("SELECT o FROM SubjectClass o", SubjectClass.class).getResultList();
    }
    
    public static List<SubjectClass> SubjectClass.findAllSubjectClasses(String sortFieldName, String sortOrder) {
        String jpaQuery = "SELECT o FROM SubjectClass o";
        if (fieldNames4OrderClauseFilter.contains(sortFieldName)) {
            jpaQuery = jpaQuery + " ORDER BY " + sortFieldName;
            if ("ASC".equalsIgnoreCase(sortOrder) || "DESC".equalsIgnoreCase(sortOrder)) {
                jpaQuery = jpaQuery + " " + sortOrder;
            }
        }
        return entityManager().createQuery(jpaQuery, SubjectClass.class).getResultList();
    }
    
    public static SubjectClass SubjectClass.findSubjectClass(Integer subjectClassId) {
        if (subjectClassId == null) return null;
        return entityManager().find(SubjectClass.class, subjectClassId);
    }
    
    public static List<SubjectClass> SubjectClass.findSubjectClassEntries(int firstResult, int maxResults) {
        return entityManager().createQuery("SELECT o FROM SubjectClass o", SubjectClass.class).setFirstResult(firstResult).setMaxResults(maxResults).getResultList();
    }
    
    public static List<SubjectClass> SubjectClass.findSubjectClassEntries(int firstResult, int maxResults, String sortFieldName, String sortOrder) {
        String jpaQuery = "SELECT o FROM SubjectClass o";
        if (fieldNames4OrderClauseFilter.contains(sortFieldName)) {
            jpaQuery = jpaQuery + " ORDER BY " + sortFieldName;
            if ("ASC".equalsIgnoreCase(sortOrder) || "DESC".equalsIgnoreCase(sortOrder)) {
                jpaQuery = jpaQuery + " " + sortOrder;
            }
        }
        return entityManager().createQuery(jpaQuery, SubjectClass.class).setFirstResult(firstResult).setMaxResults(maxResults).getResultList();
    }
    
    @Transactional
    public void SubjectClass.persist() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.persist(this);
    }
    
    @Transactional
    public void SubjectClass.remove() {
        if (this.entityManager == null) this.entityManager = entityManager();
        if (this.entityManager.contains(this)) {
            this.entityManager.remove(this);
        } else {
            SubjectClass attached = SubjectClass.findSubjectClass(this.subjectClassId);
            this.entityManager.remove(attached);
        }
    }
    
    @Transactional
    public void SubjectClass.flush() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.flush();
    }
    
    @Transactional
    public void SubjectClass.clear() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.clear();
    }
    
    @Transactional
    public SubjectClass SubjectClass.merge() {
        if (this.entityManager == null) this.entityManager = entityManager();
        SubjectClass merged = this.entityManager.merge(this);
        this.entityManager.flush();
        return merged;
    }
    
}
