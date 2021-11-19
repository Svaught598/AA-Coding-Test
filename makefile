build:
	@echo "Building..."
	javac ./com/aa/act/interview/org/*.java
	@echo "Running..."
	java com.aa.act.interview.org.MyOrganization

clean:
	@echo "cleaning..."
	rm -rf ./com/aa/act/interview/org/*.class