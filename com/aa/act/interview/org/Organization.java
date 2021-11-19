package com.aa.act.interview.org;

import java.util.Optional;
import java.util.LinkedList;

public abstract class Organization {

	private Position root;
	
	public Organization() {
		root = createOrganization();
	}
	
	protected abstract Position createOrganization();
	
	/**
	 * hire the given person as an employee in the position that has that title
	 * 
	 * @param person
	 * @param title
	 * @return the newly filled position or empty if no position has that title
	 */
	public Optional<Position> hire(Name person, String title) {
		Employee employee = new Employee(person);
		Optional<Position> position = findOpenPosition(title);
		Optional<Position> hiredPosition;

		if (position.isEmpty())
			// Log an Error? Throw Exception? Bubble up notification?
			// I would assume we'd want to let someone know if a position has been filled
			return Optional.empty();
		
		position.get().setEmployee(Optional.of(employee));
		return position;
	}

	/**
	 * Find the position with a specific title
	 *
	 * @param title
	 * @return the position corresponding to a given title
	 */
	private Optional<Position> findOpenPosition(String title) {
		Position currentPosition = root;

		// BFS on organization to find given position
		// Depending on org structure, DFS might be a better solution.
		LinkedList<Position> queue = new LinkedList();
		queue.offer(currentPosition);
		boolean found = false;
		
		while (!queue.isEmpty()) {
			currentPosition = queue.poll();

			if (currentPosition.getTitle() == title && !currentPosition.isFilled())
				found = true;
			for (Position p : currentPosition.getDirectReports())
				queue.offer(p);
			if (found) break;
		}

		if (!found) 
			return Optional.empty();
		return Optional.of(currentPosition);
	}

	@Override
	public String toString() {
		return printOrganization(root, "");
	}
	
	private String printOrganization(Position pos, String prefix) {
		StringBuffer sb = new StringBuffer(prefix + "+-" + pos.toString() + "\n");
		for(Position p : pos.getDirectReports()) {
			sb.append(printOrganization(p, prefix + "\t"));
		}
		return sb.toString();
	}
}
