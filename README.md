# Graphql-server

Server for graphql

  - Contoh CRUD
  - Contoh format data

# Instalasi

  - git clone https://pojok-webdev/graphql-server.git
  - cd graphql-server
  - npm install

# Cara menjalankan
  - node index.js

# Cara menjalankan sebagai service
  - buat file node-app.conf
nano /etc/init/node-app.conf
  - isi dengan script berikut
start on filesystem and started networking
respawn
chdir /home/deploy/node-app
env NODE_ENV=production #change this to staging if this is a staging server
env PORT=3000
exec /usr/local/bin/node bin/www

start node-app
stop node-app
restart node-app #performs a stop and start. This is all we need for deployments

echo "deploy ALL=(root) NOPASSWD: /sbin/restart node-app" >> /etc/sudoers


## dalam ubuntu dist > 15.04 ,menggunakan systemd , bukan upstart 

  - log ke root
su

  - buat file .service
nano /lib/systemd/system/<service name>.service

  - isi script berikut

[Unit]
Description=Start <appname> node.js app

[Service]
ExecStart=/usr/local/bin/node /home/deploy/<app name>/bin/www
Restart=always

## untuk menjalankan layanan, menggunakan perintah berikut 

- service <service name> start
- service <service name> stop

## untuk menjalankan saat boot

- cd /lib/systemd/system/
- sudo systemctl enable <service name>
- systemctl add-wants multi-user.target <servicename>.service

# Query
## Untuk meretrieve record tertentu 
Jalankan dari browser http://localhost:4000/graphql

{
  getEmployee(id:1){
    username
    id
    division{
      name
    }
  }
}


{
  getDivision(id:2){
    description
    name
  }
  
}

## Untuk meretrieve keseluruhan record 
{
  getDivisions{
    name
    id
  }
}

{
  getEmployees{
    username
    id
    division{
      name
    }
  }
}

# Mutation
## Untuk menyimpan record dilakukan sebagai berikut
mutation {
  saveDivision(input :{id:1,name:"Sales",description:"Sales Marketing"}){
    id
    name
    description
  }
  
}

mutation{
  saveEmployee(input:{id:5,username:"Bebop",level:1,division:{
    id:1,name:"TS",description:"Technical Support"
  }})
  {
    username
    level
    division{
      name
    }
  }
}

## Untuk update dilakukan sebagai berikut
mutation {
  updateEmployee_(input:{id:1,username:"Felice",level:7})
  {
    id,level,username
  }
}