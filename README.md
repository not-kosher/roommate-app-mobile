# Abodie
A mobile app that organizes roommate communication, financials, chores, and more!  Currently for iOS only.

## Introduction
Abodie is your one stop shop for everything you need to coordinate and communicate with your roommates.  Our financials page makes it easy to keep track of bills with a summary page to organize individual charges for each roommate and a total amount owed by you or them.  Our chores feature is a quick way to post chores or house needs and see who claims them and when, so you can get on your roomie's case if they're slacking!  Plus a built in message board for group chat makes it easy to keep all your communication confined to one place, your very own Abodie!

## Demo
Video demo coming soon!

### Screenshots
![alt text](https://drive.google.com/file/d/1vE4nc6DrBMRfl0H2YRxy-_th_73WIOlf/view?usp=sharing "Splash Screen")
![alt text](https://drive.google.com/file/d/16_gTZ8zx89ARqu71IzrLvQ2F6mOXDyD-/view?usp=sharing "Financials Screen")
![alt text](https://drive.google.com/file/d/13PLmR_qDSsprRT2G8iYgXZBPVX3zlMTE/view?usp=sharing "Menu Options")

## Usage
This is a demo application, and this repo contains only the react-native code for the mobile front-end.  For the back-end server code please go here:

https://github.com/not-kosher/roommate-app-server

For instructions on how to run the app locally with an iPhone simulator, please see below.



## Local Installation

### Requirements
This application requires node and npm to install all other dependencies including: 
- React/Redux
- React-Native and other React-Native dependencies
- Socket.IO
- AWS packages

As implied above, this application also utilizes AWS services for authentication and image hosting.  As such you will need a valid AWS account and working configuration for AWS Cognito User and Identity Pools and a S3 storage bucket. Please refer to official [AWS documentation](https://aws.amazon.com/documentation/) for more info on how to set these up.

This application also uses the Mailchimp service for sending email invitations to potential roommates.  You will need a Mailchimp account and configured campaign for sending emails.  Please refer to [Mailchimp documentation](https://developer.mailchimp.com/documentation/mailchimp/reference/overview/) on setting this up as well.

Finally, this project uses React-Native and so will require XCode and the accompanying iPhone simulator to run the demo project.

### Installation
First fork a copy of this repo, then clone/download your forked copy or this repo by copying the link from github.  If cloning make a local copy using:

```
git clone <git link here>
```

Once dowloaded, navigate to the directory in a terminal window and run:

```
npm install
```

You can now run a demo version of the application on an iPhone simulator by using the following command:

```
react-native run-ios
```

Make sure the back-end server is running as well.  See above for link to the server repo.

### Configuration
This project utilizes the react-native-dotenv package to have a .env file for holding secure API information and settings.  You will need to have the following fields in a .env file at the root level of your project files:

```
AWS_PROJECT_REGION=[the AWS region you are using]
AWS_COGNITO_IDENTITY_POOL_ID=[found in AWS Cognito settings]
AWS_COGNITO_USER_POOL_ID=[found in AWS Cognito settings]
AWS_COGNITO_CLIENT_ID=[found in AWS Cognito settings]
AWS_S3_BUCKET=[found in AWS S3 settings]

SERVER_URL=[https://www.abodie.ml OR the URL used to run the back-end API]

MAILCHIMP_BASEURL=[found in Mailchimp settings]
MAILCHIMP_LISTURL=[found in Mailchimp settings]
MAILCHIMP_AUTH=[found in Mailchimp settings]
```

## Credits

This project was built by team Not-Kosher as part of the program at Hack Reactor LA.

### Team Members

- Tyler Vander Maas - tvmaasjazz@gmail.com
- Lillian Anderson - lilliananderson@ucla.edu
- Philip Marazita - pmarazita@gmail.com

## Contact

Inquiries can be made to any of the team members' emails lsited above.