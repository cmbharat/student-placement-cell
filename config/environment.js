const development = {
  name: "development",
  asset_path: "./assets",
  session_cookie: "something",
  db: "students_list_db",
  google_clientID:
    "963091267993-sp7ghubbue8j5h1uds8l5se90ndr4ofg.apps.googleusercontent.com",
  google_clientSecret: "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",
  google_callbackURL: "http://localhost:8000/users/auth/google/callback",
};
const production = {
  name: process.env.CODEIAL_ENVIRONMENT,
  asset_path: process.env.CODEIAL_ASSET_PATH,
  session_cookie: process.env.CODEIAL_SESSION_COOKIE,
  db: process.env.CODEIAL_DB,
  google_clientID: process.env.CODEIAL_GOOGLE_CLIENT_ID,
  google_clientSecret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
  google_callbackURL: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
};

module.exports =
  eval(process.env.CODEIAL_ENVIRONMENT) == undefined
    ? development
    : eval(process.env.CODEIAL_ENVIRONMENT);
