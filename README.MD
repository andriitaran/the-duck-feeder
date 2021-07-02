## THE DUCK FEEDER

<img width="1280" alt="the duck feeder" src="https://i.ibb.co/SXWSYtZ/the-duck-feeder.png">

## SETUP :

- Clone into repo
- Navigate to client folder and run `npm i`
- Navigate back to root directory and then navigate to server folder and run `npm i`
- While in server folder, run `npm run dev` to start project.

## NOTES :

- .env was not excluded from commits for the sake of simplicity of the setup
- There was no point of implementing admin registration functionality (and I was out of time), so please use these credentials for accessing /admin/login route :
  email : test@freshworks.io
  password : FreshworksIsAwesome

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
