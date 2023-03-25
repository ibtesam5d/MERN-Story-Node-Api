const whiteList = [
  "https://mdibtesamhossain.com",
  "https://mdibtesamhossain.com/story",
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
