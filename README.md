
# Scripts punto 2
## Estudiantes:
- Nicolás Villabona
- Oscar Serna

## Vagrant file
````
Vagrant.configure("2") do |config|

  config.vm.define :cliente do |cliente|
  config.vm.box = "bento/centos-7.9"
  cliente.vm.network :private_network, ip: "192.168.50.5"
  cliente.vm.network :public_network, bridge: "Realtek PCIe GbE Family Controller"
  cliente.vm.hostname = "cliente"
  cliente.vm.provider "virtualbox" do |v|
    v.cpus = 2 
  end
  end
  config.vm.define :servidor do |servidor|
  config.vm.box = "bento/centos-7.9"
  servidor.vm.network :private_network, ip: "192.168.50.6"
  servidor.vm.hostname = "servidor"
  servidor.vm.provider "virtualbox" do |v|
    v.cpus = 2 
  end
  end
end

````

## (SERVIDOR) Zona /etc/httpd/conf/httpd.conf
````
<VirtualHost *:80>
	        ServerName 192.168.50.6
	        Redirect permanent / http://192.168.50.6:8080
	        TransferLog /var/log/httpd/streama.yourdomain.com_access.log
	        ErrorLog /var/log/httpd/streama.yourdomain.com_error.log
</VirtualHost>
  ````
## (SERVIDOR) config streama /etc/systemd/system/streama.service
````
	[Unit]
	Description=Streama Server
	After=syslog.target
	After=network.target

	[Service]
	User=root
	Type=simple
	ExecStart=/bin/java -jar /opt/streama/streama.jar
	Restart=always
	StandardOutput=syslog
	StandardError=syslog
	SyslogIdentifier=Streama

	[Install]
	WantedBy=multi-user.target
  ````
  
  ## (CLIENTE) habilita el reenvío de paquetes IP  /etc/sysctl.conf
  ````
  net.ipv4.ip_forward = 1
  ````
   ## (CLIENTE) Zonas
  ![imagen](https://github.com/nvillabona/pr-tele-final/assets/29049942/72d6d213-fe2e-4c66-8262-517f14c3c356)
