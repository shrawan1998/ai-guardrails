# Superset Deployment Details 

- Deploy a superset instance on your preferred platform, we prefer Docker, use the values.yaml for the overrides that you need to enable.

- inside the ./databases/PostgreSQL.yaml enter your POSTGRES Connection details.

- Login to the superset instance and import the dashboard.

- Once imported, enable embedding on the dashboard and keep a note of the embed id, we'll need it for the environment variables for the application.