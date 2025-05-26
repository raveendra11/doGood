# Use official OpenJDK runtime as base image
FROM openjdk:17-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the jar file built by Maven/Gradle into the container
COPY target/doGood-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your app listens on
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java","-jar","app.jar"]