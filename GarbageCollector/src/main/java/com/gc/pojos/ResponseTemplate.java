package com.gc.pojos;

import java.util.List;

/**
 * Template class to send the Response in Body
 * of Http Request
 * @author nikumar
 *
 * @param <T>
 */
public class ResponseTemplate<T> {

	private boolean error;
	private String message;
	private T data;
	private List<ValidationError> vError;
	
	public List<ValidationError> getvError() {
		return vError;
	}
	public void setvError(List<ValidationError> vError) {
		this.vError = vError;
	}
	public ResponseTemplate(boolean error,String message,T data) {
		this.error = error;
		this.message = message;
		this.data = data;
	}
	public ResponseTemplate(boolean error,String message) {
		this(error,message,null);
	}
	
	public ResponseTemplate(boolean error) {
		this(error,null,null);
	}
	
	public ResponseTemplate(String message) {
		this(false,message,null);
	}
	public ResponseTemplate(T data) {
		this(false,null,data);
	}
	
	public boolean isError() {
		return error;
	}
	public void setError(boolean error) {
		this.error = error;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public T getData() {
		return data;
	}
	public void setData(T data) {
		this.data = data;
	}
	
}
