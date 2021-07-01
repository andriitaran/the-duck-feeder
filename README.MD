## THE DUCK FEEDER

<img width="1280" alt="the duck feeder" src="https://i.ibb.co/SXWSYtZ/the-duck-feeder.png">

First of all, thank you for an opportunity to showcase my skills developing this application!

First of all, thank you for an opportunity to showcase my skills developing this application!

## TECHNOLOGIES USED :

React on the front-end, Node + Express on the backend, database via Mongo DB. As for dependencies, here's a list of some of them :

1. material-ui/pickers used for styled select and time
2. axios for fetching data
3. moment for converting UTC time to readable format
4. node-sass for SCSS compiling
5. react-places-autocomplete for dynamic address input autocomplete, setting up lat & lang via Google Maps API
6. hapi/joi, bcryptjs, jsonwebtoken for authentication

## APPROACH :

I felt like this assignment covers all the necessary bases of a full stack developer. I started with a React installation, then did a Node + Express setup. Created basic JSON model and tested POST and GET requests via Postman. Then created a component PostData in React that would be responsible for posting data (no pun intended) and tested it. Next step was creating a new database in Mongo and connecting to it. After that I felt that instead of spending most of the alloted time on styling (which I do a lot at my current role), I'd rather showcase my JS skills and my thinking patterns, so I decided to implement login/authentication functionality. After that was implemented I set up routing, so the user would be able to see details about data they posted. Next step was administrator login - pretty much identical to user login, except admin won't be able to POST, but would be able to GET all data (user only can see the data they posted). I didn't have time to make it a protected route, but it still have a separate login and navigation. Did some basic styling, but ran out of time at the end, so my BEM is not perfect.

## APP ROUTES :

/ - redirects to /login & registration

/add - route for adding data

/profile - user profile with posted data

/profile/feeding/:id - displays specific data details

/admin - displays ALL posted data

/admin/feeding/:id - displays specific data details

/login - login route

/logout - clears localStorage, user/admin is logged out

/register - register route (not accessible via navigation) but accessible via /login button at the bottom

## SETUP :

- Clone into repo
- Navigate to client folder and run `npm i`
- Navigate back to root directory and then navigate to server folder and run `npm i`
- While in server folder, run `npm run dev` to start project.

## NOTES :

- .env was not excluded from commits for the sake of simplicity of the setup
- Profile, Admin, FeedingInfo & AdminFeedingInfo components use promises instead of async/await as I couldn't set it to work properly with axios inside useEffect() hook. Every other request uses async/await with error handling.
- There was no point of implementing admin registration functionality (and I was out of time), so please use these credentials for accessing /admin/login route :
  email : test@freshworks.io
  password : FreshworksIsAwesome
