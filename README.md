## se-03-team-33

SE Sprint 3, Team 33

Enis Mustafaj & Diego Ricardo Zablah

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

Run Test

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

replace this in settings.py located inside beergame folder.

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

replace DATABASE_NAME, USERNAME, PASSWORD, MYSQL_SERVER_URL, SERVER_PORT to match your SQL server address and login credentials.

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

Use the package manager [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) to install dependencies.

n.

```bash
#Frontend Directory
#Install Dependencies
npm install
```

### Frontend testing

To run the tests for the frontend, run the command:

```
npm test -- name of the test file
```

## Progress report:

- UI improvements in the screens from the previous sprint
- new screens added:

  - create demand pattern screen added
  - edit game scrren added
  - view game details screen(not fully implemented)

- test cases added and adapted to the new screens and UI improvements
- models are created and added to the database.
- the navigation system is completed and the user can navigate throug different
  screens with changing the URL.
- Use cannot visit pages that are allowed only when it is authenticated.
- instructor can:
  - view all the games that are created
  - view the details of the game
  - modify the setting of a game.
  - create a demmand pattern
- player can:
  - join in one of the games created by the instructors
  - select the role for that game
  - if the role is taken player cannot join
  - continue the games where the player is already registered
- none of the above actions cannot be done without the user being authenticated and passing the token in the request that client make to the backend server

- test cases are added for the backend and frontend. They include:

  - test cases for the models
  - test cases for the authentication
  - test cases for the API
  - test cases for the screens

- API documentation is added. Go to url:
  ` localhost:8000/swagger` or
  ` localhost:8000/redoc` when the backend server is running.
