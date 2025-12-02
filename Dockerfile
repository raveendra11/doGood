# Use JDK image to build the app
FROM maven:3.9.2-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Use JRE image to run the app
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]








# Use official OpenJDK runtime as base image
#FROM openjdk:17-jdk-alpine

# Set the working directory inside the container
#WORKDIR /app

# Copy the jar file built by Maven/Gradle into the container
#COPY target/doGood-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your app listens on
#EXPOSE 8087

# Run the jar file
#ENTRYPOINT ["java","-jar","app.jar"]
