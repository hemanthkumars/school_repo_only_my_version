// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.school.base.domain;

import com.school.base.domain.StudentAttedance;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.transaction.annotation.Transactional;

privileged aspect StudentAttedance_Roo_Jpa_ActiveRecord {
    
    @PersistenceContext
    transient EntityManager StudentAttedance.entityManager;
    
    public static final List<String> StudentAttedance.fieldNames4OrderClauseFilter = java.util.Arrays.asList("");
    
    public static final EntityManager StudentAttedance.entityManager() {
        EntityManager em = new StudentAttedance().entityManager;
        if (em == null) throw new IllegalStateException("Entity manager has not been injected (is the Spring Aspects JAR configured as an AJC/AJDT aspects library?)");
        return em;
    }
    
    public static long StudentAttedance.countStudentAttedances() {
        return entityManager().createQuery("SELECT COUNT(o) FROM StudentAttedance o", Long.class).getSingleResult();
    }
    
    public static List<StudentAttedance> StudentAttedance.findAllStudentAttedances() {
        return entityManager().createQuery("SELECT o FROM StudentAttedance o", StudentAttedance.class).getResultList();
    }
    
    public static List<StudentAttedance> StudentAttedance.findAllStudentAttedances(String sortFieldName, String sortOrder) {
        String jpaQuery = "SELECT o FROM StudentAttedance o";
        if (fieldNames4OrderClauseFilter.contains(sortFieldName)) {
            jpaQuery = jpaQuery + " ORDER BY " + sortFieldName;
            if ("ASC".equalsIgnoreCase(sortOrder) || "DESC".equalsIgnoreCase(sortOrder)) {
                jpaQuery = jpaQuery + " " + sortOrder;
            }
        }
        return entityManager().createQuery(jpaQuery, StudentAttedance.class).getResultList();
    }
    
    public static StudentAttedance StudentAttedance.findStudentAttedance(Long studentAttendanceId) {
        if (studentAttendanceId == null) return null;
        return entityManager().find(StudentAttedance.class, studentAttendanceId);
    }
    
    public static List<StudentAttedance> StudentAttedance.findStudentAttedanceEntries(int firstResult, int maxResults) {
        return entityManager().createQuery("SELECT o FROM StudentAttedance o", StudentAttedance.class).setFirstResult(firstResult).setMaxResults(maxResults).getResultList();
    }
    
    public static List<StudentAttedance> StudentAttedance.findStudentAttedanceEntries(int firstResult, int maxResults, String sortFieldName, String sortOrder) {
        String jpaQuery = "SELECT o FROM StudentAttedance o";
        if (fieldNames4OrderClauseFilter.contains(sortFieldName)) {
            jpaQuery = jpaQuery + " ORDER BY " + sortFieldName;
            if ("ASC".equalsIgnoreCase(sortOrder) || "DESC".equalsIgnoreCase(sortOrder)) {
                jpaQuery = jpaQuery + " " + sortOrder;
            }
        }
        return entityManager().createQuery(jpaQuery, StudentAttedance.class).setFirstResult(firstResult).setMaxResults(maxResults).getResultList();
    }
    
    @Transactional
    public void StudentAttedance.persist() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.persist(this);
    }
    
    @Transactional
    public void StudentAttedance.remove() {
        if (this.entityManager == null) this.entityManager = entityManager();
        if (this.entityManager.contains(this)) {
            this.entityManager.remove(this);
        } else {
            StudentAttedance attached = StudentAttedance.findStudentAttedance(this.studentAttendanceId);
            this.entityManager.remove(attached);
        }
    }
    
    @Transactional
    public void StudentAttedance.flush() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.flush();
    }
    
    @Transactional
    public void StudentAttedance.clear() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.clear();
    }
    
    @Transactional
    public StudentAttedance StudentAttedance.merge() {
        if (this.entityManager == null) this.entityManager = entityManager();
        StudentAttedance merged = this.entityManager.merge(this);
        this.entityManager.flush();
        return merged;
    }
    
}
