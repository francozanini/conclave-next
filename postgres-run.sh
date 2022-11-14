#!/bin/bash 
sudo docker run -itd -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=qwerty -e POSTGRES_DB=conclave -p 5432:5432 -v /data:/var/lib/postgresql/data --name postgresql postgres