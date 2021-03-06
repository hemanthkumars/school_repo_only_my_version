// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.school.base.domain;

import com.school.base.domain.StudentClassHistory;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.transaction.annotation.Transactional;

privileged aspect StudentClassHistory_Roo_Jpa_ActiveRecord {
    
    @PersistenceContext
    transient EntityManager StudentClassHistory.entityManager;
    
    public static final List<String> StudentClassHistory.fieldNames4OrderClauseFilter = java.util.Arrays.asList("");
    
    public static final EntityManager StudentClassHistory.entityManager() {
        EntityManager em = new StudentClassHistory().entityManager;
        if (em == null) throw new IllegalStateException("Entity manager has not been injected (is the Spring Aspects JAR configured as an AJC/AJDT aspects library?)");
        return em;
    }
    
    public static long StudentClassHistory.countStudentClassHistorys() {
        return entityManager().createQuery("SELECT COUNT(o) FROM StudentClassHistory o", Long.class).getSingleResult();
    }
    
    public static List<StudentClassHistory> StudentClassHistory.findAllStudentClassHistorys() {
        return entityManager().createQuery("SELECT o FROM StudentClassHistory o", StudentClassHistory.class).getResultList();
    }
    
    public static List<StudentClassHistory> StudentClassHistory.findAllStudentClassHistorys(String sortFieldName, String sortOrder) {
        String jpaQuery = "SELECT o FROM StudentClassHistory o";
        if (fieldNames4OrderClauseFilter.contains(sortFieldName)) {
            jpaQuery = jpaQuery + " ORDER BY " + sortFieldName;
            if ("ASC".equalsIgnoreCase(sortOrder) || "DESC".equalsIgnoreCase(sortOrder)) {
                jpaQuery = jpaQuery + " " + sortOrder;
            }
        }
        return entityManager().createQuery(jpaQuery, StudentClassHistory.class).getResultList();
    }
    
    public static StudentClassHistory StudentClassHistory.findStudentClassHistory(Integer studentClassHistory) {
        if (studentClassHistory == null) return null;
        return entityManager().find(StudentClassHistory.class, studentClassHistory);
    }
    
    public static List<StudentClassHistory> StudentClassHistory.findStudentClassHistoryEntries(int firstResult, int maxResults) {
        return entityManager().createQuery("SELECT o FROM StudentClassHistory o", StudentClassHistory.class).setFirstResult(firstResult).setMaxResults(maxResults).getResultList();
    }
    
    public static List<StudentClassHistory> StudentClassHistory.findStudentClassHistoryEntries(int firstResult, int maxResults, String sortFieldName, String sortOrder) {
        String jpaQuery = "SELECT o FROM StudentClassHistory o";
        if (fieldNames4OrderClauseFilter.contains(sortFieldName)) {
            jpaQuery = jpaQuery + " ORDER BY " + sortFieldName;
            if ("ASC".equalsIgnoreCase(sortOrder) || "DESC".equalsIgnoreCase(sortOrder)) {
                jpaQuery = jpaQuery + " " + sortOrder;
            }
        }
        return entityManager().createQuery(jpaQuery, StudentClassHistory.class).setFirstResult(firstResult).setMaxResults(maxResults).getResultList();
    }
    
    @Transactional
    public void StudentClassHistory.persist() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.persist(this);
    }
    
    @Transactional
    public void StudentClassHistory.remove() {
        if (this.entityManager == null) this.entityManager = entityManager();
        if (this.entityManager.contains(this)) {
            this.entityManager.remove(this);
        } else {
            StudentClassHistory attached = StudentClassHistory.findStudentClassHistory(this.studentClassHistory);
            this.entityManager.remove(attached);
        }
    }
    
    @Transactional
    public void StudentClassHistory.flush() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.flush();
    }
    
    @Transactional
    public void StudentClassHistory.clear() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.clear();
    }
    
    @Transactional
    public StudentClassHistory StudentClassHistory.merge() {
        if (this.entityManager == null) this.entityManager = entityManager();
        StudentClassHistory merged = this.entityManager.merge(this);
        this.entityManager.flush();
        return merged;
    }
    
}
