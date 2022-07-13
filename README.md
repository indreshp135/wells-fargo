# Team-2 PoliAuth

## Problem Statement
Develop a policy based authorization engine which will take user entitlement rules as an input and
based on rules it provides authorization token for access to application resources as Yes/No.
Authorization engine should be able to accommodate exclusions for a particular user configured in
existing system/database. 

#### (PBE is short for Policy Based Engine)

## Installation

### For File Manager and PBE Backend
- Change directory to respective folders
- Ensure that you have python and pip installed
- Clone the repository
- Create a virtual environment and activate it
	```
	python -m venv /path/to/new/virtual/environment
	source /path/to/new/virtual/environment/bin/activate
	```
- Install the required packages
	    `pip install -r requirements.txt`
- Run
        `pre-commit install`
- Copy env file using `cp .env.example .env` and fill in the necessary fields
- Start the server
	    `python manage.py runserver`
- PBE server is available at [http://localhost:8000](http://localhost:8000)
- File Manager server is available at [http://localhost:8001](http://localhost:8001)

### For File Manager and PBE Frontend
- Change directory to respective folders
- Ensure that you have node and npm/yarn installed
- Run `npm install`
- `cd src` and `cp config.example.js config.js` and fill in the necessary details
- Run `npm start` to start server
- PBE frontend is available at [http://localhost:3000](http://localhost:3000)
- File manager frontend is available at [http://localhost:3001](http://localhost:3001)

## Note to developers
- [VSCode editor settings for React](https://gist.github.com/indreshp135/22e9af1f6b07fcb389c8bed9aee788e0)
- Black, Flake8 and Husky pre commit hooks have been setup for linting and code formatting. 
- Stick to [Commit message format](http://karma-runner.github.io/latest/dev/git-commit-msg.html) for commit message rules.

## Tech Stack (PBE and File manager):
### Server
- Django
- PostgreSQL
- Swagger Docs

### Frontend
- ReactJS
- React Bootstrap

## Features
### User Authentication
- Add Google OAuth Provider to social accounts through Django Admin
- Google Oauth is used for User Authentication. (PBE and File Manager)

### Features of PBE
### Add Application and List of Application
- New applications can be added to PBE by admins.
- On adding a new application, an application hash will be returned. This application hash is a unique identifier of the application and has to be included in application specific requests.
### Add Assets and Actions
- The add Assets and Actions page can be found at [http://localhost:3000/applications/<application_hash>/](http://localhost:3000/applications/<application_hash>/)
- Here Assets and Actions can be added for a particular Application
### Add SOD
- The add SOD page can be found at [http://localhost:3000/applications/<applicatio_hash/sod/](http://localhost:3000/applications/<applicatio_hash/sod/)
- New SODs can be added/deleted for an application here
### Edit SOD
- Edit SOD page can be found at [http://localhost:3000/applications/<application_hash>/sod/update/<sod_id>/](http://localhost:3000/applications/<application_hash>/sod/update/<sod_id>/)
- Here access with/without permission can be provided for different Asset Action combination.
### Add Users
- Add Users page can be found at [http://localhost:3000/applications/<application_hash>/addUser/](http://localhost:3000/applications/<application_hash>/addUser/)
- It is assumed that users from Wells Fargo can be obtained through an account aggregator and SODs can be assigned for different users for a particular application
### Add Exceptions
 - Add Exceptions page can be found at [http://localhost:3000/applications/<application_hash/exception/](http://localhost:3000/applications/<application_hash/exception/)
 - Exceptions can be added to a specific user through this page.
### Features of File Manager
### Actions on folder locations:
- Users can Read, Write, Delete and Transfer files from the available folder locations based on the rules provided in the PBE engine.
### Notifications
- Managers receive notifications if an employee seeks permission to perform an action on a location folder. The manager can choose to accept/reject the request.

Team Members:
- [Indresh](https://github.com/indreshp135)
- [Ishaan](https://github.com/ISHAAN1091)
- [Sailesh](https://github.com/0149Sailesh)







