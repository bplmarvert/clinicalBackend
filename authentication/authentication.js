let uuid = require("uuid");

var validToken = ""; // improvement to plan set a list
let isAllowed = false;

const generateToken = () => {
  validToken = uuid.v4();
  console.log(validToken);
  return { token: validToken };
};

const authMiddleware = (req, res, next) => {
  console.log("req headers = ", req.headers);
  console.log("req body = ", req.params);

  //console.log("Token in middleware", token);
  let token = req.body.token;
  token === validToken ? (isAllowed = true) : (isAllowed = false);
  next();
};

module.exports = { generateToken, authMiddleware };
/*var isUserAuthenticated = false;
var authenticatedUsers = {
  "nsdfsdf-lkjlkdjf": { username: "lala" },
};

let restrictedUrls = ["/api/aevent"];

//password should be stored as hashed
let registeredUsers = [
  {
    username: "lala@lala.fr",
    password: "lala",
  },
];

/*  To call if user authentication is sucessful */
/*function authenticationSucessful(username) {
  let token = Math.random(); // use uuid lib
  authenticatedUsers[token] = { username };
  return token;
}

function checkCredentials(login, password) {
  let filter = registeredUsers.filter(
    (user) => (user.username = login && user.password == password)
  );

  return filter.length == 1; // should contain one element if password and login are correct
  //blabla
}

/* check that the token is valid */
/*function isTokenValid(token) {
  if (authenticatedUsers[token]) {
    return true;
  } else {
    return false;
  }
}

function firewalMiddleware(request, response, next) {
  let url = request.url;
  let headers = request.headers;

  //check if the requested url is restricted or not
  if (restrictedUrls.includes(url)) {
    //if user is not authenticated
    if (!isTokenValid(headers.authorization)) {
      response.status(403);
      response.send();
      return;
    }
    next(); // proceed as usual because user is authenticated
    return;
  }
  next(); //proceed as usual for public urls
}

module.exports.checkCredentials = checkCredentials;
module.exports.authenticationSucessful = authenticationSucessful;

/**
 * a middle to restrict access to
 * specific routes
 */
/*module.exports.firewalMiddleware = firewalMiddleware; */
