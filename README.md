# Node-Mongo-Redis-Nginx

# Basic Usage
```
rename .env-example to .env
sudo docker-compose up --build
```

# Service Names
  - node-app
  - redis (cache) session storage for app
  - mongo
  - nginx

# Scaling App
```
sudo docker-compose up --scale node-app=3
```

By default scaling limit is 5 (but you can increase anytime)

### Port limit for each service:
 - node-app: 3000-3005
 - redis:  6374-6379
 - mongo: 27012-27017
 - nginx: 80


# Example
```
sudo docker-compose up --scale node-app=2
```
https://cdn.rawgit.com/dkvilo/moderenix/master/images/screenshot.png

