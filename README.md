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
