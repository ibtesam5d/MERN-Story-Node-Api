const whiteList = [
  "https://mdibtesamhossain.com",
  "http://localhost:5000","http://localhost:5173","http://127.0.0.1:5173",
  "https://story-fe.onrender.com",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("not allowed by cors"));
    }
  },
  optionSuccessStatus: 200,
  credentials: true,
};

module.exports = corsOptions;
