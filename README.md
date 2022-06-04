# MERN-Practice

## Demo 🧐
[MERN Goal Tracker](https://mernapptreez.herokuapp.com/)

## About 📖
MERN Stack REST API goal tracker app built using *Redux Toolkit's* global state management, along with Redux *RTK Query* for data fetching. This application provides full asyncronous CRUD operability, as well as secure login.

## How it Works 🔨
The authentication flow is built with *JWT* (JSON Web Token) access and refresh tokens, utilizing secure cookies and an *RTK Query* base query 'Reauth' container, assuring any access token is only stored in memory and refreshed when necessary.
<br> 

```
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 403) {
    console.log('Sending refresh token...');
    // send refresh token to get new access token
    const refreshResult = await baseQuery('/api/refresh', api, extraOptions);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // store new access token
      api.dispatch(setCredentials({ user, ...refreshResult.data }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(signOut());
    }
  }
  return result;
};
```

## Creator ✋
**Joey Kubalak**

AKA 

👇

*Treez* 🌲

Github profile 👉 [TreezCode](https://github.com/TreezCode)