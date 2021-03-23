## se-02-team-33
SE Sprint 02, Team 33

Ishwor Giri & Hamza Bouhelal


## Installation

```
git clone https://github.com/lorenzorota/se-02-team-33.git
```

```
cd se-02-team-33
```

```bash
#Install Virtual Environment first 
python3 -m pip install --user virtualenv

# Creating a virtual environment
python3 -m venv env
#Activating Virtual Environment
source env/bin/activate

```
must activate venv everytime if working with backend
```
source env/bin/activate
```

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install django.

```bash
python -m pip install django djangorestframework django-cors-headers djangorestframework_simplejwt 
```
or 
```
python -m pip install -r requirements.txt
```

## Backend

Change Directory to the backend  
```
cd backend 
```

Database Migration

```bash
#make Migration
python manage.py makemigrations
#Apply Migration

python manage.py migrate
```

Start Server
```bash
python manage.py runserver 
```

Run  Test
```bash
python manage.py test 
```
more commands : follow this link 
[https://docs.djangoproject.com/en/3.1/ref/django-admin/](https://docs.djangoproject.com/en/3.1/ref/django-admin/)


## For Custom Database (optional)
This project uses mysqlite for database management. If you want to integrate to your database server.
Install mysql adaptor 
```bash
python -m pip install mysqlclient
```

make sure to create sql database first and link it to this project. 

login to MYSQL
```bash
mysql -h {hostname} -u username -p {databasename}

#enter your server password
Password: {your password}
```
after sucessful login inside mysql shell. Run
```mysql
CREATE DATABASE YOUR_DATABASE_NAME;
```


replace this  in settings.py located inside beergame folder. 


```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```
to 
```python
DATABASES = {
  'default': {
  'ENGINE': 'django.db.backends.mysql',
  'NAME': DATABASE_NAME,
  'USER': USERNAME,
  'PASSWORD': PASSWORD,
  'HOST': MYSQL_SERVER_URL,
  'PORT': SERVER_PORT,
  }

}
```
replace  DATABASE_NAME, USERNAME, PASSWORD, MYSQL_SERVER_URL, SERVER_PORT to match your SQL server address and login credentials.

After connecting database makesure to run all migrations 
```bash
#make Migration
python manage.py makemigrations
#Apply Migration

python manage.py migrate
```

Makesure to configure your frontend url in settings.py for CORS

```python
CORS_ORIGIN_WHITELIST = 'http://localhost:3000',
```

## Frontend SETUP 

Use the package  manager [npm](https://www.npmjs.com/) or  [yarn](https://yarnpkg.com/) to install dependencies.

n.

```bash
#Frontend Directory 
#Install Dependencies
npm install
# or
yarn install
```

## Starting Frontend

### Further steps are only shown using yarn but you can use npm

```bash
yarn start
```


# Test cases
Only checks for .tests.js files 
```bash
yarn test
```


## NOTE
Please see Frontend,Backend Documentation for more information and layout of this project. 