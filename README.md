
# [AI-Guardrails™](https://www.ai-guardrails.com/)

[AI-Guardrails™](https://www.ai-guardrails.com/) is specifically designed for small to mid-sized enterprises to address their Governance, Risk and Compliance needs. AI-Guardrails™ provides continuous protection via a secure and reliable solution for employees utilizing LLM models while safeguarding sensitive corporate information.



[AI-Guardrails™](https://www.ai-guardrails.com/) is an Open Source project which targets to solve the problem of governance and compliance, risk monitoring around AI Tools using our enterprise expertise of 20+ years in the industry.



If at any point, you'd like to reach out to us for any help or any support or just want to talk to us, We'd be more than happy to help, reach out to us on our [Slack workspace](https://join.slack.com/t/ai-guardrails/shared_invite/zt-1vi2wqs1z-Sbk2kW0g8Sll4bGVc2HLHw).


The cloud agnostic architecture of the application incorporates various enterprise-grade Open-Source components such as Postgres, Mongo, IDP integrations, support for Kubernetes. This ensures that organizations can leverage the benefits of AI models while maintaining the highest level of Audit Trails, Data Protection and Governance.



## Architecture: 

#### User Prompt Sequence:
![Prompt Sequence](/images/AI-Guardrails-Sequence.png)

#### Components:
![App Components](/images/Components.png)

- PostgreSQL: Storing All Audit trails, org level details, controls etc.
- MongoDb: NoSQL for storing user conversations, saved folders, saved prompts etc.
- IDP/IAM: Any OAuth2.0 provider.<sup>[1](#index)</sup>
- Superset: For those amazing dashboards.<sup>[2](#index)</sup>
- Chatbot-UI: React based Web-Interface for the employees/users to interact with the chatbots.<sup>[3](#index)</sup>
- Admin-UI:  React based Web-Interface for admins/managers to monitor usage, view dashboards, enable/disable entities/models etc.
- api: Flask based REST-API server, taking care of all the needs of both the UI apps.






## Run Locally / Deploy

**Databases**
- Run a PostgreSQL Instance locally or on the cloud.
- Run the SQL Scripts inside the [sql directory](/sql/) in the same order as the files are numbered.
- Run a MongoDb Instance either locally or on the cloud and obtain the connection string.

**Superset setup**
- Follow the directions in [/superset/README.md](/superset/README.md)

**Keycloak SETUP**
- Run a keycloak instance, with admin login enabled.
- Login as admin, create a new realm.
- Add a public client to the keycloak realm, this will be used in auth management for  the react apps.
- Add a private client to the keycloak realm, this will be used for validating users on the backend.

**API**
- Follow the directions in [/api/README.md](/api/README.md)

**Admin-UI**
- Follow the directions in [/admin-ui/README.md](/admin-ui/README.md)

**Chatbot-UI**
- Follow the directions in [/chatbot-ui/README.md](/chatbot-ui/README.md)



## Screenshots

![App Screenshot](/images/Chatbot.gif)

![App Screenshot](/images/Admin.png)

## Features

- Audit trail of all conversations, for all your compliance needs.
- Real time analysis of user inputs.
- Text classification Models to stop confidential information from leaking.
- Managerial escalations when sensitive data is detected.
- Compliance/Governance/e-Discovery Dashboards

## Contributing
- Raise an issue in the repository.
- Fork the repo.
- Raise a PR from your repo to this one.

## References
1. You can choose any OAuth 2.0 provider, we prefer [Keycloak](https://www.keycloak.org/)


2.  [Superset](https://superset.apache.org/) is an open source BI tool under the apache foundation, which makes it super easy for us to build highly customisable elegant  dashboards and deliver them to you.


3. ChatBot-UI: This react app has been inspired from an open source repository, was forked and customised for our needs, can be found [here](https://github.com/mckaywrigley/chatbot-ui). 

## License
Apache License 2.0, see [LICENSE](/LICENSE).