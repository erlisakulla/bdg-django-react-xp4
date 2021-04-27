# se-04-team-33
Jumping from one STACK to another every 2 weeks can be quite jarring, cleaning it up, providing proper documentation and guidance as well as imporving and addding new features was our main motivation during this sprint.

## Authors
_Erlisa Kula & Hai Long Tran_ 

# Local Setup and deployment
## Setup 
### Git
- find a directory within your computer where you would liek to store the repo
- open the terminal in that directory and run
```
git clone https://github.com/lorenzorota/se-04-team-33.git
```

```
cd se-04-team-33
```
- use `git status` to check whether everything is up to date
### Virtual Environment:
- for this project we suggest using a simple python virtual environment 
```bash
#Install Virtual Environment first
python3 -m pip install --user virtualenv

# Creating a virtual environment
python3 -m venv env

#Activating Virtual Environment
source env/bin/activate

```
- the virtual environment should be installed within the project folder (main directory) and run from there 
- you can then run your Django app inside the environment, this simplifies python versioning as well as package management
- you will se "(name_of_your_env)" next to the name of your directory in the terminal
- you must activate venv everytime, here is the command again:

```
source env/bin/activate
```
## Installation and deployment

### Database 
- make sure to create your own sql database first 
- login to MYSQL

```bash
mysql -h {hostname} -u username -p {databasename}

#enter your server password
Password: {your password}
```
- the host is usually localhost if you are running locally on your machine 
- after sucessful login inside mysql shell, run:

```mysql
CREATE DATABASE YOUR_DATABASE_NAME;
```
- change directory to the backend
```
cd backend
```
- then go to the beergame folder and open settings.py
- within that file you will find the following code
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
- replace DATABASE_NAME, USERNAME, PASSWORD, MYSQL_SERVER_URL, SERVER_PORT to match your SQL server address and login credentials

After connecting your database makesure to migrate, for initial installation the second command suffices 

```bash
#make Migration
python manage.py makemigrations

#Apply Migration
python manage.py migrate
```
- this command will  run migrations against your database - essentially, synchronizing the new models with the schema in the database
- this is needed to initialize the database and create the necessary tables, you just need to create a database with a 'NAME' in this case 'beer_game'
- the beauty is this process takes care of all the SQL commands using models from the DJANGO framework (explained in more detail within the backend documentation)

#### Backend
Use the package manager [pip](https://pip.pypa.io/en/stable/) to install django specific dependencies. You can install each dependency like below:

```bash
python -m pip install django djangorestframework django-cors-headers djangorestframework_simplejwt
```
or simply used the provided requirements.txt as follows: 
```
python -m pip install -r requirements.txt
```
- this will install all the necessary dependencies

Now you are ready to run your backend server: 

```bash
python manage.py runserver
```

### Frontend
Makesure to configure your frontend url in settings.py for CORS
```python
CORS_ORIGIN_WHITELIST = 'http://localhost:3000',
```

Use the package manager [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) to install dependencies:
- go to the Frontend Directory
- run `npm install package.json` more detail on this is provided in the frontend readme.md
- Note: you will see will see package.json and package-lock.json, don't get confused using package.json is enough, but here is the difference:
  - package-lock.json: records the exact version of each installed package which allows you to re-install them. Future installs will be able to build an identical dependency tree.  
  - package.json: records the minimum version you app needs. If you update the versions of a particular package, the change is not going to be reflected here.


## Testing
### Backend testing 
- run:
```bash
python manage.py test
```
- if the tests pass you will get this:
```
Creating test database for alias 'default'...
System check identified no issues (0 silenced).
.....
----------------------------------------------------------------------
Ran 5 tests in 0.063s

OK
Destroying test database for alias 'default'...
```
What to test?
- run `coverage run --source='.' manage.py test` if not installed use `pip install coverage`
- then simply generate a report - `coverage report`
- this will give you an idea of what is covered by your tests and what is not
### Frontend testing
run:
```
npm test -- name of the test file
```
To start the application run the command:
npm start
# Documentation 
- [Backend](Backend-documentation.pdf)
- [Frontend](Frontend-documentation.pdf)
- will add these once I finish - Long 
# Actionable items for next group 
# Progress report:

## OUR PROGRESS:
Frontend: 
Login.js
- proper field checking: email pattern, password inputted with warnings
    - ui improvemenet shows what went wrong in login more nicely
Signup.js
-  proper field checking: email pattern, password inputted with warnings
-  notifies if user has already been created
-  redirects to login
About.js 
- update text with and added picture 

# PREVIOUS GROUP:
- UI improvements in the screens from the previous sprint
- new screens added:


 
  - view game details screen(not fully implemented)

- test cases added and adapted to the new screens and UI improvements
  - tbd

- Use cannot visit pages that are allowed only when it is authenticated.
- instructor can:
  - view all the games that are created
  - view the details of the game
  - modify the setting of a game.
  - create a demmand pattern
- student can:
  - join in one of the games created by the instructors
  - select the role for that game
  - if the role is taken another studetn has to choose a different role 
  - continue the games where the player is already registered
- none of the above actions can be done without the user being authenticated and passing the token in the request that client make to the backend server

- test cases are added for the backend and frontend. They include:
  - test cases for the models
  - test cases for the authentication
  - test cases for the API
  - test cases for the screens

- API documentation is added. Go to url:
  ` localhost:8000/swagger` or
  ` localhost:8000/redoc` when the backend server is running.
