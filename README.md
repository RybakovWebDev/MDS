# MDS

#### My second personal project, a full-stack website for looking up movie-related information and media as well as creating custom user watchlists.

<p align="center">
<img src="/frontend/src/images/App_Demo_Screenshot.jpg" width=50% height=50%>
</p>

Live website can be found here: **https://main.d3agl6wdyl1nit.amplifyapp.com/**

## Features

- Search for a movie by name and see relevant information (plot summary, cast, budget, related movies, ratings etc.)
- Chat with AI based on GPT-3.5-Turbo to ask movie-related questions like:
  > - "Make me a list of thrillers to watch"
  > - "What is the most expensive drama ever made?"
  > - "Recommend me something similar to Alien"
- Create an account where you can customize your name and upload a profile picture. The default name is auto generated from a random adjective + animal name
- Authorized users can create custom watchlists with customizable names and drag-and-drop functionality for re-arranging the order of lists or titles within them. These lists can be shared and viewed by anyone on a separate page, however only the creator has access to list controls
- Responsive design providing an optimal user experience on both desktop and mobile devices

## Tech Stack

The website is built on the MERN stack (MongoDB, Express.js, React.js, Node.js) and is fully deployed to AWS services. The frontend is hosted on Amplify, and the backend on Elastic Beanstalk with CloudFront for HTTPS. User avatar images are stored in an S3 bucket.

Most components are customized MUI v5 components, with all icons also sourced from MUI v5. Drag-and-drop functionality in watchlists is achieved with the dnd-kit library for React. On the backend, Multer is used for image uploads and the Sharp library is used for image processing. Authorization is done with JSON Web Tokens, with passwords being hashed and salted with bcrypt before storage.

## API Usage

The application communicates with the backend through a RESTful API for operations such as creating, reading, updating, and deleting user data. It also integrates with TMDB and OMDB APIs for fetching movie data and OpenAI’s API for AI chatbot functionality.
