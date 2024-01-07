FROM openjdk:22
ADD target/app-for-auslenderamt-0.0.1-SNAPSHOT.jar app-for-auslenderamt-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar","app-for-auslenderamt-0.0.1-SNAPSHOT.jar"]
EXPOSE 8080