// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.school.base.domain;

import com.school.base.domain.StudentGroup;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.transaction.annotation.Transactional;

privileged aspect StudentGroup_Roo_Jpa_ActiveRecord {
    
    @PersistenceContext
    transient EntityManager StudentGroup.entityManager;
    
    public static final List<String> StudentGroup.fieldNames4OrderClauseFilter = java.util.Arrays.asList("");
    
    public static final EntityManager StudentGroup.entityManager() {
        EntityManager em = new StudentGroup().entityManager;
        if (em == null) throw new IllegalStateException("Entity manager has not been injected (is the Spring Aspects JAR configured as an AJC/AJDT aspects library?)");
        return em;
    }
    
    public static long StudentGroup.countStudentGroups() {
        return entityManager().createQuery("SELECT COUNT(o) FROM StudentGroup o", Long.class).getSingleResult();
    }
    
    public static List<StudentGroup> StudentGroup.findAllStudentGroups() {
        return entityManager().createQuery("SELECT o FROM StudentGroup o", StudentGroup.class).getResultList();
    }
    
    public static List<StudentGroup> StudentGroup.findAllStudentGroups(String sortFieldName, String sortOrder) {
        String jpaQuery = "SELECT o FROM StudentGroup o";
        if (fieldNames4OrderClauseFilter.contains(sortFieldName)) {
            jpaQuery = jpaQuery + " ORDER BY " + sortFieldName;
            if ("ASC".equalsIgnoreCase(sortOrder) || "DESC".equalsIgnoreCase(sortOrder)) {
                jpaQuery = jpaQuery + " " + sortOrder;
            }
        }
        return entityManager().createQuery(jpaQuery, StudentGroup.class).getResultList();
    }
    
    public static StudentGroup StudentGroup.findStudentGroup(Integer studentGroupId) {
        if (studentGroupId == null) return null;
        return entityManager().find(StudentGroup.class, studentGroupId);
    }
    
    public static List<StudentGroup> StudentGroup.findStudentGroupEntries(int firstResult, int maxResults) {
        return entityManager().createQuery("SELECT o FROM StudentGroup o", StudentGroup.class).setFirstResult(firstResult).setMaxResults(maxResults).getResultList();
    }
    
    public static List<StudentGroup> StudentGroup.findStudentGroupEntries(int firstResult, int maxResults, String sortFieldName, String sortOrder) {
        String jpaQuery = "SELECT o FROM StudentGroup o";
        if (fieldNames4OrderClauseFilter.contains(sortFieldName)) {
            jpaQuery = jpaQuery + " ORDER BY " + sortFieldName;
            if ("ASC".equalsIgnoreCase(sortOrder) || "DESC".equalsIgnoreCase(sortOrder)) {
                jpaQuery = jpaQuery + " " + sortOrder;
            }
        }
        return entityManager().createQuery(jpaQuery, StudentGroup.class).setFirstResult(firstResult).setMaxResults(maxResults).getResultList();
    }
    
    @Transactional
    public void StudentGroup.persist() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.persist(this);
    }
    
    @Transactional
    public void StudentGroup.remove() {
        if (this.entityManager == null) this.entityManager = entityManager();
        if (this.entityManager.contains(this)) {
            this.entityManager.remove(this);
        } else {
            StudentGroup attached = StudentGroup.findStudentGroup(this.studentGroupId);
            this.entityManager.remove(attached);
        }
    }
    
    @Transactional
    public void StudentGroup.flush() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.flush();
    }
    
    @Transactional
    public void StudentGroup.clear() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.clear();
    }
    
    @Transactional
    public StudentGroup StudentGroup.merge() {
        if (this.entityManager == null) this.entityManager = entityManager();
        StudentGroup merged = this.entityManager.merge(this);
        this.entityManager.flush();
        return merged;
    }
    
}
