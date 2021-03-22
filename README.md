## se-01-team-34
SE Sprint 02, Team 33

Ishwor Giri & Hamza Bouhelal


## Installation


```bash
#Install Virtual Environment first 
python3 -m pip install --user virtualenv

# Creating a virtual environment
python3 -m venv env
#Activating Virtual Environment
source env/bin/activate
```
Leaving VENV
```
deactivate
```


Use the package manager [pip](https://pip.pypa.io/en/stable/) to install django.

```bash
python -m pip install Django
```

or 
```
python -m pip install -r requirements.txt
```


Change Directory to the project 
```
cd beergame
```

Database Migration

```bash
#make Migration

python manage.py makemigrations
#Apply Migration

python manage.py migrate
```

Start Server
```
./manage.py runserver 
```
more commands : follow this link 
[https://docs.djangoproject.com/en/3.1/ref/django-admin/](https://docs.djangoproject.com/en/3.1/ref/django-admin/)



## Frontend SETUP 

Use the package  manager [npm](https://www.npmjs.com/) to install dependencies.



uses babel to convert jsx to js functions and webpack to compile codes to one js file that can be attached to index.html

```bash
#Frontend Directory 
#Install Dependencies
npm install
# or
yarn install


```
#Compile React Codes using Webpack and watch for changes
execute this command in some terminal and run it in the background 
```
npm run dev
```


#Compile React Codes using Webpack for Production Version
once done with everything and the frontend no longer needs any 
changes final build can be created using this command
```
npm run build
```


## NOTE
You don`t have to run npm commands to serve the website .
Just run python command to serve the website and it will use the last compressed version the javascript file.


# Test cases
Only checks for .tests.js files 
```
npm test
```


## NOTE
Please see Frontend,Backend Documentation for more information and layout of this project. 