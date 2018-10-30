package com.gc.util;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;


import javax.persistence.RollbackException;
import javax.swing.ProgressMonitorInputStream;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import org.springframework.transaction.TransactionSystemException;

import com.gc.exceptions.PersistException;
import com.gc.pojos.ValidationError;
/**
 * This is a utility class 
 * used to get correct messages when receive error
 * message in transaction 
 * @author nikumar
 *
 */
public class ExceptionUtil {
	
	public static PersistException createPersistExceptionFrom(Exception e) {
		if (e instanceof TransactionSystemException) {

			TransactionSystemException ex = (TransactionSystemException) e;
			Throwable th = ex.getCause();
			if (th instanceof RollbackException) {
				RollbackException exr = (RollbackException) th;
				Throwable thn = exr.getCause();
				if (thn instanceof ConstraintViolationException) {
					ConstraintViolationException cne = ((ConstraintViolationException) thn);
					Iterator<ConstraintViolation<?>> it = cne.getConstraintViolations().iterator();
					List<ValidationError> errors = new ArrayList<ValidationError>();
					PersistException pre = new PersistException("Not able to save due to constraint voilation");
					while (it.hasNext()) {
						ConstraintViolation<?> constraint = it.next();
						ValidationError err = new ValidationError(constraint.getPropertyPath().toString(), constraint.getMessageTemplate());
						errors.add(err);
					}
					pre.setVerrors(errors);
					return pre;
				}
			}

		}
		return null;
	}		
}
