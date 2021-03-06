// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.school.base.domain;

import com.school.base.domain.ReceiptSchoolFee;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.transaction.annotation.Transactional;

privileged aspect ReceiptSchoolFee_Roo_Jpa_ActiveRecord {
    
    @PersistenceContext
    transient EntityManager ReceiptSchoolFee.entityManager;
    
    public static final List<String> ReceiptSchoolFee.fieldNames4OrderClauseFilter = java.util.Arrays.asList("");
    
    public static final EntityManager ReceiptSchoolFee.entityManager() {
        EntityManager em = new ReceiptSchoolFee().entityManager;
        if (em == null) throw new IllegalStateException("Entity manager has not been injected (is the Spring Aspects JAR configured as an AJC/AJDT aspects library?)");
        return em;
    }
    
    public static long ReceiptSchoolFee.countReceiptSchoolFees() {
        return entityManager().createQuery("SELECT COUNT(o) FROM ReceiptSchoolFee o", Long.class).getSingleResult();
    }
    
    public static List<ReceiptSchoolFee> ReceiptSchoolFee.findAllReceiptSchoolFees() {
        return entityManager().createQuery("SELECT o FROM ReceiptSchoolFee o", ReceiptSchoolFee.class).getResultList();
    }
    
    public static List<ReceiptSchoolFee> ReceiptSchoolFee.findAllReceiptSchoolFees(String sortFieldName, String sortOrder) {
        String jpaQuery = "SELECT o FROM ReceiptSchoolFee o";
        if (fieldNames4OrderClauseFilter.contains(sortFieldName)) {
            jpaQuery = jpaQuery + " ORDER BY " + sortFieldName;
            if ("ASC".equalsIgnoreCase(sortOrder) || "DESC".equalsIgnoreCase(sortOrder)) {
                jpaQuery = jpaQuery + " " + sortOrder;
            }
        }
        return entityManager().createQuery(jpaQuery, ReceiptSchoolFee.class).getResultList();
    }
    
    public static ReceiptSchoolFee ReceiptSchoolFee.findReceiptSchoolFee(Long receiptSchoolFeeId) {
        if (receiptSchoolFeeId == null) return null;
        return entityManager().find(ReceiptSchoolFee.class, receiptSchoolFeeId);
    }
    
    public static List<ReceiptSchoolFee> ReceiptSchoolFee.findReceiptSchoolFeeEntries(int firstResult, int maxResults) {
        return entityManager().createQuery("SELECT o FROM ReceiptSchoolFee o", ReceiptSchoolFee.class).setFirstResult(firstResult).setMaxResults(maxResults).getResultList();
    }
    
    public static List<ReceiptSchoolFee> ReceiptSchoolFee.findReceiptSchoolFeeEntries(int firstResult, int maxResults, String sortFieldName, String sortOrder) {
        String jpaQuery = "SELECT o FROM ReceiptSchoolFee o";
        if (fieldNames4OrderClauseFilter.contains(sortFieldName)) {
            jpaQuery = jpaQuery + " ORDER BY " + sortFieldName;
            if ("ASC".equalsIgnoreCase(sortOrder) || "DESC".equalsIgnoreCase(sortOrder)) {
                jpaQuery = jpaQuery + " " + sortOrder;
            }
        }
        return entityManager().createQuery(jpaQuery, ReceiptSchoolFee.class).setFirstResult(firstResult).setMaxResults(maxResults).getResultList();
    }
    
    @Transactional
    public void ReceiptSchoolFee.persist() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.persist(this);
    }
    
    @Transactional
    public void ReceiptSchoolFee.remove() {
        if (this.entityManager == null) this.entityManager = entityManager();
        if (this.entityManager.contains(this)) {
            this.entityManager.remove(this);
        } else {
            ReceiptSchoolFee attached = ReceiptSchoolFee.findReceiptSchoolFee(this.receiptSchoolFeeId);
            this.entityManager.remove(attached);
        }
    }
    
    @Transactional
    public void ReceiptSchoolFee.flush() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.flush();
    }
    
    @Transactional
    public void ReceiptSchoolFee.clear() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.clear();
    }
    
    @Transactional
    public ReceiptSchoolFee ReceiptSchoolFee.merge() {
        if (this.entityManager == null) this.entityManager = entityManager();
        ReceiptSchoolFee merged = this.entityManager.merge(this);
        this.entityManager.flush();
        return merged;
    }
    
}
