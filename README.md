# Canteen Portal

• A Canteen Portal app based on MERN stack. Functionality to add food item, place order, status of order, interactive dashboard for both buyer and seller.  
• Dockerized the web-app and hosted it on local Nginx server.

## Installations

### Node

```
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### MongoDB

Install and configure MongoDB Atlas [here](https://mongodb.com/atlas/).


### React

```
npm install -g create-react-app
```

### Docker

Install and configure docker from [here](https://docs.docker.com/engine/install/ubuntu/). Then Run the following commands for docker-compose.  

```
sudo curl -L "https://github.com/docker/compose/releases/download/1.26.0/docker-compose-$(uname -s)-$(uname -m)"  -o /usr/local/bin/docker-compose
sudo mv /usr/local/bin/docker-compose /usr/bin/docker-compose
sudo chmod +x /usr/bin/docker-compose
```

## Running the code

* Run the dockerized app:
```
sudo docker compose up -d
```

Navigate to [http://localhost:3000/](http://localhost:3000/) in your browser to access the website.
