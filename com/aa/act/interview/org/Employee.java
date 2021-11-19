package com.aa.act.interview.org;

import java.util.UUID;

public class Employee {

	private String identifier;
	private Name name;

	public Employee(Name name) {
		if(name == null)
			throw new IllegalArgumentException("name cannot be null");

		// changed id to UUID to avoid collisions. Probably should opt for
		// something different if human readability is important
		this.identifier = UUID.randomUUID().toString();
		this.name = name;
	}
	
	public String getIdentifier() {
		return identifier;
	}
	
	public Name getName() {
		return name;
	}

	@Override
	public String toString() {
		return name.toString() + ": " + identifier;
	}
}
