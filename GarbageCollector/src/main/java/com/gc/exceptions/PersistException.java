package com.gc.exceptions;

import java.util.List;

import com.gc.pojos.ValidationError;

public class PersistException extends Exception{

	private List<ValidationError> verrors;

	public PersistException(String message) {
		super(message);
	}

	public List<ValidationError> getVerrors() {
		return verrors;
	}

	public void setVerrors(List<ValidationError> verrors) {
		this.verrors = verrors;
	}
}
