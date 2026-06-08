const jwt = require("jsonwebtoken");

const authHadler = async (
  req,
  res,
  next
) => {
  try {
    // headers
    const appId = req.headers.appid;
    const version = req.headers.version;

    // validate app id
    if (
      !appId ||
      appId !== process.env.APP_ID
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid App ID",
      });
    }

    // validate version
    if (
      !version ||
      version !== process.env.APP_VERSION
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid App Version",
      });
    }

    // default values
    req.token = null;
    req.user = null;
    req.userId = null;

    // optional userId
    if (req.headers.userid) {
      req.userId = req.headers.userid;
    }

    // optional jwt token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(
        "Bearer"
      )
    ) {
      const token =
        req.headers.authorization.split(
          " "
        )[1];

      req.token = token;

      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET
        );

        req.user = decoded;
      } catch (error) {
        req.token = null;
        req.user = null;
      }
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = authHadler;