import * as React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import NavBarStudent from "./components/NavBarStudent";
import NavBarExpert from "./components/NavBarExpert";
import NavBarAdmin from "./components/NavBarAdmin";
import { Spring, Affix } from "react-spring/renderprops";

import {
  ContactUsPage,
  HomePage,
  Login,
  VideosList,
  NoMatch,
  CommentOnVideo,
  VideoUploadPage,
  StudentDashboard,
  StudentViewCom,
  ExpertDashboard,
  StudentSignUp,
  ExpertSignUp,
  AdminJobPending,
  AdminSignUp,
  PendingJobList,
  ProcessedJobList,
  ProcessedApplicationDetails,
  PendingApplicationDetails,
  SubscriptionPage
} from "./screens";

export class LandingPage extends React.Component {
  render() {
    // This checks if isAuthenticated = true for each page, Otherwise no access
    const PurePrivateRoute = ({ component, isAuthenticated, ...rest }) => {
      const Component = component;
      if (Component != null) {
        return (
          <Route
            {...rest}
            render={props =>
              isAuthenticated ? (
                <Component {...props} />
              ) : (
                <Redirect
                  to={{
                    pathname: "/login",
                    state: { from: props.location }
                  }}
                />
              )
            }
          />
        );
      } else {
        return null;
      }
    };

    // This gets isAuthenticated state from Store
    const PrivateRoute = connect(state => ({
      isAuthenticated: state.auth.isAuthenticated
    }))(PurePrivateRoute);

    // Pleae create a variable name for each pages except public pages (Public Routes dont need to create variable names)
    let homePage;
    let adminJobPendingPage;
    let videosListPage;
    let commentOnVideoPage;
    let videoUploadPage;
    let studentDashboard;
    let studentViewCom;
    let expertDashboard;
    let pendingJobList;
    let processedJobList;
    let processedDetails;
    let pendingDetails;
    let logInPage;
    let subscriptionPage;
    let contactUsPage;

    // !!! Important: This will re-render this part once again after login. Otherwise, the PrivateRoute remains as false since that's the value once you load this app.
    // Decide what pages can be accessed by users based on userType
    console.log(
      `UserID: ${localStorage.getItem(
        "userID"
      )} UserType: ${localStorage.getItem("userType")}`
    );

    if (this.props.isAuthenticated === true) {
      // This will reload the login page and redirect to other pages
      logInPage = <Route path="/login" component={Login} />;

      if (localStorage.getItem("userType") === "expert") {
        homePage = <PrivateRoute exact path="/" component={HomePage} />;
        videosListPage = (
          <PrivateRoute path="/videosList" component={VideosList} />
        );
        commentOnVideoPage = (
          <PrivateRoute
            path="/commentOnVideo/:video_id"
            component={CommentOnVideo}
          />
        );
        expertDashboard = (
          <PrivateRoute path="/earnings" component={ExpertDashboard} />
        );
        studentViewCom = (
          <PrivateRoute
            path="/studentViewCom/:video_id"
            component={StudentViewCom}
          />
        );
      }

      if (localStorage.getItem("userType") === "student") {
        homePage = <PrivateRoute exact path="/" component={HomePage} />;
        videosListPage = (
          <PrivateRoute path="/videosList" component={VideosList} />
        );
        videoUploadPage = (
          <PrivateRoute path="/uploadVideo" component={VideoUploadPage} />
        );
        studentDashboard = (
          <PrivateRoute path="/studentDashboard" component={StudentDashboard} />
        );
        studentViewCom = (
          <PrivateRoute
            path="/studentViewCom/:video_id"
            component={StudentViewCom}
          />
        );
        subscriptionPage = (
          <PrivateRoute path="/subscription" component={SubscriptionPage} />
        );
        commentOnVideoPage = (
          <PrivateRoute
            path="/commentOnVideo/:video_id"
            component={CommentOnVideo}
          />
        );
      }

      if (localStorage.getItem("userType") === "admin") {
        homePage = <PrivateRoute exact path="/" component={HomePage} />;
        pendingJobList = (
          <PrivateRoute path="/adminJobPending" component={PendingJobList} />
        );
        processedJobList = (
          <PrivateRoute
            path="/adminJobProcessed"
            component={ProcessedJobList}
          />
        );
        processedDetails = (
          <PrivateRoute
            path="/processedApplicationDetails/:applicationId"
            component={ProcessedApplicationDetails}
          />
        );
        pendingDetails = (
          <PrivateRoute
            path="/pendingApplicationDetails/:applicationId"
            component={PendingApplicationDetails}
          />
        );
        adminJobPendingPage = (
          <PrivateRoute path="/admin/jobpending" component={AdminJobPending} />
        );
      }
    } else {
      // This allow you access the login page without login
      logInPage = <Route path="/login" component={Login} />;
    }

    if (localStorage.getItem("userType") === "student") {
      return (
        <div>
          <BrowserRouter>
            <Spring
              from={{ opacity: 0, marginTop: -500 }}
              to={{ opacity: 1, marginTop: 0 }}
              config={{ delay: 0, duration: 500 }}
            >
              {props => (
                <div style={props}>
                  <NavBarStudent />
                </div>
              )}
            </Spring>
            <Switch>
              <div>
                {/* Put the variable names of pages here*/}
                {contactUsPage}
                {homePage}
                {videosListPage}
                {commentOnVideoPage}
                {videoUploadPage}
                {studentDashboard}
                {studentViewCom}
                {subscriptionPage}
                {/* Public Route doesnt need to create variable names*/}
                {/* <Route path="/login" component={Login} /> */}
                {logInPage}
              </div>
            </Switch>
          </BrowserRouter>
        </div>
      );
    }
    if (localStorage.getItem("userType") === "expert") {
      return (
        <div>
          <BrowserRouter>
            <Spring
              from={{ opacity: 0, marginTop: -500 }}
              to={{ opacity: 1, marginTop: 0 }}
              config={{ delay: 0, duration: 500 }}
            >
              {props => (
                <div style={props}>
                  <NavBarExpert />
                </div>
              )}
            </Spring>
            <Switch>
              {/* Put the variable names of pages here*/}
              {contactUsPage}
              {homePage}
              {videosListPage}
              {commentOnVideoPage}
              {videoUploadPage}
              {expertDashboard}
              {studentViewCom}
              {/* Public Route doesnt need to create variable names*/}
              <Route path="/login" component={Login} />
              <Route path="/error404" component={NoMatch} />
            </Switch>
          </BrowserRouter>
        </div>
      );
    }
    if (localStorage.getItem("userType") === "admin") {
      return (
        <div>
          <BrowserRouter>
            <Spring
              from={{ opacity: 0, marginTop: -500 }}
              to={{ opacity: 1, marginTop: 0 }}
              config={{ delay: 0, duration: 500 }}
            >
              {props => (
                <div style={props}>
                  <NavBarAdmin />
                </div>
              )}
            </Spring>
            <Switch>
              {/* Put the variable names of pages here*/}
              {homePage}
              {pendingJobList}
              {processedJobList}
              {processedDetails}
              {pendingDetails}
              {/* Public Route doesnt need to create variable names*/}
              <Route path="/login" component={Login} />
              <Route exact path="/contactUs" component={ContactUsPage} />

              <Route component={NoMatch} />
            </Switch>
          </BrowserRouter>
        </div>
      );
    } else {
      return (
        <div>
          <BrowserRouter>
            <Switch>
              {/* Put the variable names of pages here*/}
              {homePage}
              {videosListPage}
              {commentOnVideoPage}
              {videoUploadPage}
              {/* Public Route doesnt need to create variable names*/}
              {logInPage}
              <Route exact path="/contactUs" component={ContactUsPage} />
              <Route exact path="/" component={HomePage} />
              <Route exact path="/signup/student" component={StudentSignUp} />
              <Route exact path="/signup/expert" component={ExpertSignUp} />
              <Route exact path="/signup/admin" component={AdminSignUp} />
            </Switch>
          </BrowserRouter>
        </div>
      );
    }
  }
}

// !!! Important: This receive the updated isAuthenticated once login
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(LandingPage);
