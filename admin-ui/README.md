## Run Locally / Deploy

**Admin-UI**
- Run ```npm i``` or ```yarn``` to install project dependencies
- Edit the [env.example](./env.example) file to update your environemnt variables and save the file as .env
- Run ```npm run start``` or ```yarn start``` to start the project.

**-OR-**

- Build a docker file using ```docker build -t admin-ui . ```
- Run the docker image and provide the environment variable while booting the image.