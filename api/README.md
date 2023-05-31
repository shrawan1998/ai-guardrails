## Run Locally / Deploy
- We use ```pipenv``` as a dependency manager for the python server.

**API**
- To install ```pipenv``` run  ```pip install pipenv```
- Install dependencies by running ```pipenv install```
- RUN ```pipenv run python3 -m spacy download en_core_web_lg```
- RUN ```pipenv run pip3 install torch```
- Edit the [env.example](./src/app/env.example) file to update your environemnt variables and save the file as .env
- Run ```pipenv run start``

**-OR-**

- Build a docker file using ```docker build -t api . ```
- Run the docker image and provide the environment variable while booting the image.