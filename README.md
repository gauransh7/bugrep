# bugrep
BugRep makes your life easier by providing a platform for tracking bugs easily.

#### Front-end is build with :

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)


#### Back-end is build with :

- [Django](https://www.djangoproject.com/)
- [Django REST framework](https://www.django-rest-framework.org/)

# SETUP for Backend :

1. Prerequisites:

    * Python 3
    * pip
    * PostgreSql
    * Docker
    * NPM (NodeJs)
    
1. Activate the virtual environment

1. Create a PostgreSql database named bugrep.

1. Run the following command to install all the required dependencies:

    ```
    pip install -r requirements.txt
    ```

1.  Inside folder /imgsummer2020/imgsummer2020 create a file .env and store the following credentials inside it:

    ```
    SECRET_KEY=your-secret-key
    DB_USER=username
    DB_PASSWORD=password
    EMAIL_USER=hostuseremail
    EMAIL_PASSWORD=hostuserpassword

1. Navigate back to the base directory for the app where manage.py file is located and make the database migrations using following command:

    ```
    python manage.py migrate
    ```

1. Start a Redis server on port 6379 using the following command:

    ```
    docker run -p 6379:6379 -d redis:5
    ```

1. Start the backend server:

    ```
    python mange.py runserver
    ```

1. Go to folder 'frontend' and Install packages using this command:

    ```
    npm install
    ```

1. Start the frontend server:

    ```
    npm start
    ```    
