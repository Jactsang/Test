const express = require("express");
const jwt = require("jwt-simple");
const cors = require("cors");
const bodyParser = require("body-parser");
// const users = require("./users");
const config = require("./config");
const axios = require("axios");

//Require Files
const LoginRoute = require("./router/LoginRoute");
const LoginService = require("./service/LoginService");

const SignUpRoute = require("./router/SignUpRoute");
const SignUpService = require("./service/SignUpService");

const AdminRoute = require("./router/AdminRoute");
const AdminService = require("./service/AdminService");

const VideoUploadRoute = require("./router/VideoUploadRoute");
const VideoUploadService = require("./service/VideoUploadService");

const VideoFiguresRoute = require("./router/VideoFiguresRoute");
const VideoFiguresService = require("./service/VideoFiguresService");

const EarningFiguresRoute = require("./router/EarningFiguresRoute");
const EarningFiguresService = require("./service/EarningFiguresService");

const CommentRouter = require("./router/CommentListRouter");
const CommentService = require("./service/CommentListService");

const VideoRouter = require("./router/VideosListRouter");
const VideoService = require("./service/VideosListService");

const RatingRouter = require("./router/RatingRouter");
const RatingService = require("./service/RatingService");

const ApplicationDetailsRoute = require("./router/ApplicationDetailsRoute");
const ApplicationDetailsService = require("./service/ApplicationDetailsService");

const PaymentRoute = require("./router/PaymentRoute");
const PaymentService = require("./service/PaymentService");

const SubscriptionRoute = require("./router/SubscriptionRoute");
const SubscriptionService = require("./service/SubscriptionService");

// Middlewares
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const knexFile = require("./knexfile")["development"];
const knex = require("knex")(knexFile);

const authClass = require("./auth")(knex);
app.use(authClass.initialize());

/////////////// Stripe Test /////////////

const paymentService = new PaymentService(knex);
const paymentRoute = new PaymentRoute(paymentService);

const subscriptionService = new SubscriptionService(knex);
const subscriptionRoute = new SubscriptionRoute(subscriptionService);

app.use('/api/payment', paymentRoute.route());
app.use('/api/subscription', subscriptionRoute.route());

/////////////// Stripe Test /////////////

// Connect Route & Service
const loginService = new LoginService(knex);
const loginRoute = new LoginRoute(loginService);

const signUpService = new SignUpService(knex);
const signUpRoute = new SignUpRoute(signUpService);

const videoUploadService = new VideoUploadService(knex);
const videoUploadRoute = new VideoUploadRoute(videoUploadService);

const videoFiguresService = new VideoFiguresService(knex);
const videoFiguresRoute = new VideoFiguresRoute(videoFiguresService);

const earningFiguresService = new EarningFiguresService(knex);
const earningFiguresRoute = new EarningFiguresRoute(earningFiguresService);

const adminService = new AdminService(knex);
const adminRoute = new AdminRoute(adminService);

const applicationDetailsService = new ApplicationDetailsService(knex);
const applicationDetailsRoute = new ApplicationDetailsRoute(applicationDetailsService);

const commentService = new CommentService(knex);

const videoService = new VideoService(knex);

const ratingService = new RatingService(knex);

// DB API Route

app.use("/api/login", loginRoute.route());
app.use("/api/signup", signUpRoute.route());
app.use("/api/videosUploaded", videoUploadRoute.route());
app.use("/api/videoFigures", videoFiguresRoute.route());
app.use("/api/earningFigures", earningFiguresRoute.route());
app.use("/api/commentsList", new CommentRouter(commentService).router());
app.use("/api/videosList", new VideoRouter(videoService).router());
app.use("/api/rating", new RatingRouter(ratingService).router());
app.use("/api/admin", adminRoute.route());
app.use("/api/jobDetails", applicationDetailsRoute.router());

app.listen(8080, () => {
  console.log("App is listening to port 8080");
});
