Work4me

Welcome to Work4me!!

Requirements:

- nodejs >= 14.17.0 lts
- mysql >= 5

Follow this steps to execute the project:

- The database backup is located in documents/Work4MeBackUp.sql

- Open file with MysqlWorkbench and execute it

- You need to create a mysql user with this credentials:
    -Login name: work4me_Admin
    -Password: Work4me@

- Give the account privileges to work4me database schema with privileges to:
    -SELECT
    -INSERT
    -UPDATE
    -DELETE
    -EXECUTE
    -SHOW VIEW

- You can now open de w4mBack folder located in the root of the project with the command prompt
    - In windows you can acces with the folder going to the folder then clicking on file -> Open Windows Powershell
    - In mac os you can acces with finder going to the folder then right clicking the project folder icon then press new Terminal at Folder

- Then in the console you have to do this commands first 'npm install', when this command finish please execute 'npm start', this is going to create a server runing on your computer at port 4000

ALERT: 'DONT CLOSE THE TERMINAL or POWER SHELL doing this is going to turn down our server and the applications is not going to work'

- you need to edit de w4mFront/src/assets/url.json file to put your own ip direction please replace the link's value to:
    "http://your_computer`s_ip_addres_goes_here:4000"
    - If you don`t know your computer´s ip addres:
        - On windows open a terminal and type ipconfig and your ip addres is going to be next to IPV4 direction
        - On mac os open the terminal and if your computer is using wired network use the command ipconfig getifaddr en1 then if your network is wifi use the command ipconfig getifaddr en0

- You can now open de w4mFront folder located in the root of the project with the command prompt
    - In windows you can acces with the folder going to the folder then clicking on file -> Open Windows Powershell
    - In mac os you can acces with finder going to the folder then right clicking the project folder icon then press new Terminal at Folder

- Then in the console you have to run this commands first 'npm install -f', when this command finish please execute 'npm start', this is going to start the react application on your computer at port 3000

- So to execute your application open the browser you want then go to http://your computer`s ip addres goes here:3000 

Happy Hacking :)