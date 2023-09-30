#### My second personal project, a full-stack website for looking up movie-related information and media as well as creating custom user watchlists.

<p align="center">
<img src="/frontend/src/images/App_Demo_Screenshot.jpg" width=50% height=50%>
</p>
## Current functionality

- Search for a movie by name and see relevant information (plot summary, cast, budget, related movies, ratings etc.)
- Chat with AI based on GPT-3.5-Turbo to ask movie-related questions like:
  > "Make me a list of thrillers to watch"
  > "What is the most expensive drama ever made?"
  > "Recommend me something similar to Alien"
- Create an account where you can customize your name and upload a profile picture. Default name is auto generated from a random adjective + animal name
- Authorized users can create custom watchlists with customizable names and drag and drop functionality for re-arranging the order of lists or titles within them. These lists can be shared and viewed by anyone on a separate page, however only the creator has access to list controls

## Stack

Website built on MERN stack and is fully deployed to AWS services. React frontend is on Amplify, Node.js backend is on Elastic Beanstalk, fronted with CloudFront for https. Database is MongoDB Community Edition running on a EC2 instance. User avatar images are hosted in a S3 bucket.
