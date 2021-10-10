@echo off
color 6f
java -agentlib:jdwp=transport=dt_socket,address=8000,server=y,suspend=n -jar .\target\fileserver-0.0.1-SNAPSHOT.jar
