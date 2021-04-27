# se-04-team-33
27.04.2021

## Authors
_Erlisa Kulla & Hai Long Tran_ 

# Table of Contents
- [Changes Overview:](#changes-overview-)
  * [Backend](#backend)
  * [Frontend](#frontend)
- [Basic Local Setup](#basic-local-setup)
  * [Backend](#backend-1)
  * [Frontend](#frontend-1)
- [Documentation](#documentation)
  * [Backend](#backend-2)
    + [Setting Up Databases](#setting-up-databases)
    + [File structure](#file-structure)
    + [Documentation](#documentation-2)
  * [Frontend](#frontend-2)
    + [File Structure](#file-structure)
    + [Dependencies](#dependencies)
    + [Testing](#testing)

# Changes Overview:
## Backend:
- Made some changes to the models to make them more suitable for the database model:
  - Connected User model with PlayerGame model (`playerrole`)
  - Connected PlayerGame model with Game model (`gameroles`)
  - Connected Instructor model with Game model 
  - Connected Instructor model with DemandPattern model 
  - Connected Week model with PlayerGame model (`roleweeks`)
- Implemented automatic role creation when a game is created and week creation when roles are created (also how they are connected with each other)
- Implemented many endpoints to get and post data:
  - Get all games created
  - Get a list of games the current logged in instructor has created
  - Changed game creation and updating/editing of games
  - Delete games 
  - Get a list of all weeks data in a game
  - Get a list of all available roles (roles that users have not registered for)
  - Get all roles a student is registered for
  - Updated role registration for students
  - Get data of current week in game
  - Get the status of everyone's orders (have they placed orders or not)
  - Get the status if game is ready to proceed to next week 
  - Post order for current week
  - added comprehensive tests and corrected old tests to reflect our changes to the backend
- **Note:** we have not implemented what happens when the student submits the order, so the game logic is implemented only for the first week of the game. We have also not fully integrated the demand in the game logic 

## Frontend:
- User is redirected to Instructor or Student view after logging in
- Game pages are updated to render data from backend
- All neccessary connections to backend are made using `axios`
- client-side frontend validation was added across login, sign up and demand creation pages
- demand creation can now recognize wether the demand pattern matches the number of weeks it should represent
- meaning the user can clearly see what is wrong: missing blanks, bad format, account with the given email already exists...
- additionally server-side error messages are conveniently redirected into the frontend validation process
- sign-up process improved byu requiring reentering of password 
- added comprehensive tests and corrected old tests to reflect our changes to the frontend


# Basic Local Setup 
- Find a directory within your computer where you would like to store the repository.
- Open the terminal in that directory and run:

```bash
# Clone repository
git clone https://github.com/lorenzorota/se-04-team-33.git
# Change to repository directory
cd se-04-team-33
```
- Use `git status` to check whether everything is up to date
- The two different apps, [backend](backend/) and [frontend](frontend/), should be run silmutaneously.

## Backend
1. Change to backend directory:
```
cd backend
```

2. For this project we suggest setting up a simple python virtual environment: 
```bash
# Install Virtual Environment
python3 -m pip install --user virtualenv
# Create a Virtual Environment
python3 -m venv env
# Activate Virtual Environment
source env/bin/activate
```

- The virtual environment should be installed within the backend folder and run from there 
- You can then run your Django app inside the environment, this simplifies python versioning as well as package management

4. Migrate database: 
```bash
python manage.py makemigrations
python manage.py migrate
```

5. Start server:
```bash
python manage.py runserver
```
- Navigate to [http://127.0.0.1:8000](http://127.0.0.1:8000)

6. Run tests:

```bash
python manage.py test
```

## Frontend
1. Change to the frontend directory:
```
cd frontend
```
2. Install all dependencies:
```
npm install
```
3. Run the app in development mode:
```
npm start
```
- Navigate to [http://localhost:3000](http://localhost:3000)

4. Run tests:
```
npm test
```

# Documentation

## Backend

### Setting Up Databases

#### Default option
- Django projects use an SQLite database by default which is setup in the [`settings.py`](backend/beergame/settings.py) (found inside [`beergame`](backend/beergame/) folder) as following:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```
- All the data and migrations are saved in the [`db.sqlite3`](backend/db.sqlite3) file
- All databases and created data can be accessed by going to [127.0.0.1:8000/admin](127.0.0.1:8000/admin) and logging in with admin data
- To create an admin user run the following command and input the credentials as prompted:
```bash
python manage.py createsuperuser
```
- After successful creation, use the credentials to access the default django admin view. From there you can view, create and update data
  - It is important to include all models in the `admin.py` files in each APP so they appear in the admin view:
  ```python
  from django.contrib import admin
  # Register your models here.
  from .models import User
  admin.site.register(User)

  ```

#### MySQL option
- Make sure to create your own sql database first 
- Login to MYSQL

```bash
mysql -h {hostname} -u username -p {databasename}

# Enter your server password
Password: {your password}
```
- The host is usually localhost if you are running locally on your machine 
- After sucessful login inside mysql shell, run:

```mysql
CREATE DATABASE YOUR_DATABASE_NAME;
```
- Setup your databse in the [`settings.py`](backend/beergame/settings.py) file
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

- Replace DATABASE_NAME, USERNAME, PASSWORD, MYSQL_SERVER_URL, SERVER_PORT to match your SQL server address and login credentials
- To visualize the data you can either use the [MySQL Workbench](https://www.mysql.com/products/workbench/) or the Django admin view as mentioned above
 
<hr/>

- It doesn't really matter which database type you use but in this project we have used the MySQL one since it is easier to manage (you can't use both types at the same time)

- After connecting your database make sure to run the following commands after every change made in any of the `models.py` files
```bash
# Make migrations
python manage.py makemigrations

# Apply migrations - synchronizes all models with the schema in the database
python manage.py migrate
```

### File structure
#### `settings.py`
- All projects settings are set up in this file:
```python
# Created apps: User, Home, Game
INSTALLED_APPS = [
    ...

    'User', # sets up all models, views, urls etc. for User
    'Home', # sets upurls for Swagger and Redoc
    'Game', # sets up all models, views, urls etc. for Game (role, week, demand pattern)
]

# Database settings
DATABASES = {
    'default': {
        ...
    }
}

# Defines how JWT Authentication token is generated, can be customized
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=10),
    ...
}

# Whitelisting frontend for CORS headers
CORS_ORIGIN_WHITELIST = 'http://localhost:3000',
```

#### `models.py`
- Each app has models set up in this file. They provide the database tables and their fields are the table columns
```python
class MODEL_NAME(models.Model):
    # Model fields
    FIELD_NAME = models.FIELD_TYPE('SETTINGS')

    # Defines if there are any required fields
    REQUIRED_FIELDS = ['FIELD_NAME']

    # Display name in admin view
    def __str__(self):
        return self.FIELD_NAME
```

#### `serializers.py`
- Model serializers are defined in this file
- These serializers are used in requests set up in the `views.py` files. They define the format of the data on GET methods and the data to be sent in POST methods
```python
class MODEL_NAME_SERIALIZER(serializers.ModelSerializer):
    class Meta:
        # Defines which model it will be based upon
        model = MODEL_NAME
        fields = (
            # All fields should be named EXACTLY as the Model fields
            # Not neccessary to serialize all Model fields
            "FIELD_NAME",
            ...
        )
```
#### `views.py`
- All permissions, requests and actions are set up here
- Requests could be handeld using the generics library that sets up views using functions like `generics.ListCreateAPIView` which means we have to define a query to GET all data as a list (`get_queryset`) as well as to create instances of the model (`perform_create`)
  - In each case we need to define `permission_classes` and the `serializer_class`
- Example:
```python
class DemandList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated, GameCreatePermission]
    serializer_class = DemandPatternSerializer

    def get_queryset(self):
        user = self.request.user
        return DemandPattern.objects.filter(instructor=user)

    def perform_create(self, serializer):
        serializer.save(instructor=self.request.user)
```

<hr/>

- Another way of setting up requests is using the `viewsets.ModelViewSet` library
- In this case we always must define `permission_classes`, the `queryset` and the `get_serializer_class`
- By default this method creates all GET, POST, PUT, PATCH, DELETE requests of the type `/model_name/{modelid}/`
- Inside each view we can define different functions to GET, POST, PUT, PATCH, DELETE etc. data which could be defined using `@action(detail=True, methods=['get'])` or similar
- Each `def` action will be an url that can be used for requests
- Example:
```python
class GameActions(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, GameCreatePermission, GameUserWritePermission]
    queryset = Game.objects.all()

    # Defines serializer class to be used for requests
    def get_serializer_class(self):
        return GameSerializer

    # Creates the list view of all model instances
    def list(self, request):
        queryset = Game.objects.all().filter(instructor=request.user)
        serializer = GameSerializer(queryset, many=True)
        return Response(serializer.data)

    # Defines the POST method to create model instances
    def create(self, request):
        user = request.user
        serializer = GameSerializer(data=request.data)
        if(serializer.is_valid()):
            serializer.save(instructor=user)
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_406_NOT_ACCEPTABLE)
            
```

#### `urls.py`
- All urls defined in the `views.py` file are set up here.
- These urls are used to retrieve or post data from frontend to backend
- Example:
```python
# Creates rutes based on Game and PlayerGame defined actions
router = routers.DefaultRouter()
router.register("", GameActions)
router.register("role", PlayerGameActions, 'Role')

urlpatterns = [
    path("", include(router.urls)),
    path("demand", DemandList.as_view(), name="demandlist"),
]

```



### Api documentation
- To view all available endpoints and descriptions as well as run test requests, go to:
  - `http://localhost:8000/swagger/` or  
  - `http://localhost:8000/redoc/` 

<hr/>

## Frontend
### File Structure
- All main files are located in the `src` directory. 
- Files in the `public` folder are simply used to set up the Single Page Rendering in the index.html file

#### `App.js` and `index.js`
- All links are setup using the `Router` Componenct in the `App.js` file
- All pages are rendered inside the 'root' div in the `index.js` file

#### `axios.js`
- Sets up the axios requests by providing the base URL and Authorization headers so it will be easier to work with requests inside the project
- Instead of using `axios` itself, we import `axiosInstance` from `axios.js` and use it to set up requests

#### `helper_functions`
- Include the logout functionality and checking whether the user is authenticated so they can access the other pages

#### `components`
- All pages and subcomponents are implemented inside this directory

### Dependencies
- Use the package manager `npm` or `yarn` to install dependencies:
```bash
npm install
# or
yarn install
```
- `package-lock.json`: records the exact version of each installed package which allows you to re-install them. Future installs will be able to build an identical dependency tree.
- `package.json`: records the minimum version you app needs. If you update the versions of a particular package, the change is not going to be reflected here.
- If there are any issues insalling dependencies, try removing the `package-lock.json` file since it may store data that is OS specific and not be able to run in different environments
## Testing
### Testing for backend 
What to test?
- Run `coverage run --source='.' manage.py test` if not installed use `pip install coverage`
- Then simply generate a report - `coverage report`
- This will give you an idea of what is covered by your tests and what is not
- 
- To test, run the command:
```bash
python manage.py test
```
- If the tests pass you will get this:
```
Creating test database for alias 'default'...
System check identified no issues (0 silenced).
.....
----------------------------------------------------------------------
Ran 5 tests in 0.063s

OK
Destroying test database for alias 'default'...
```

### Testing for frontend 
- All tests are set up in the [`test`](frontend/src/components/test/) folder
- To run all tests, run the command:
```bash
npm test
```

