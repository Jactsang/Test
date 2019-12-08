import * as React from "react";
import Background from "../images/OJBG.jpg";
import Background2 from "../images/homepagestudent.jpg";
import Background3 from "../images/34.jpg";
import Background4 from "../images/2356051.jpg";
import Navbar from "../components/NavBar";

import ContactForm from "../components/ContactForm";
import Cara1 from "../images/cara6.jpg";
import Cara2 from "../images/cara2.jpg";
import Cara3 from "../images/cara5.jpg";
import Cara4 from "../images/cara4.jpg";
import "./ScreensCSS/homepage.css";
import { Spring } from "react-spring/renderprops";
import { Layout } from "antd";
import { Col, BackTop, Carousel, Button, Row, Icon, Modal, Form } from "antd";
const { Footer } = Layout;
function onChange(a, b, c) {}

const caraStyle = {
  width: "390px",
  height: "250px",
  image: "cover"
};
const backgroundIma4 = {
  width: "100%",
  height: "100vh",
  backgroundImage: `url(${Background4})`,
  backgroundSize: "cover",
  zIndex: 1,
  opacity: ".8"
};
const backgroundIma3 = {
  width: "100%",
  height: "100vh",
  backgroundImage: `url(${Background3})`,
  backgroundSize: "cover",
  zIndex: 1,
  opacity: ".8"
};
const backgroundIma2 = {
  width: "100%",
  height: "100vh",
  backgroundImage: `url(${Background2})`,
  backgroundSize: "cover",
  zIndex: 1,
  opacity: ".8"
};
const backgroundImg = {
  paddingTop: "15px",
  width: "100%",
  height: "100vh",
  backgroundImage: `url(${Background})`,
  backgroundSize: "cover",
  zIndex: 1,
  opacity: ".8"
};

const footerContainerStyle = {
  backgroundColor: "#efefefef",
  paddingBottom: "10px"
};

export default class HomePage extends React.Component {

  state = {
    top: 10,
    bottom: 10,

  };
 
  render() {
    if (localStorage.getItem("userType") === null) {
      return (
        <Spring
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}
          config={{ delay: 700, duration: 700 }}
        >
          {props => (
            <div style={props}>
              <div>
                {" "}
                <Navbar />
                <section style={backgroundImg}>
                  <Spring
                    from={{ opacity: 0 }}
                    to={{ opacity: 1 }}
                    config={{ delay: 1500, duration: 700 }}
                  >
                    {props => (
                      <div style={props}>
                        <div id="home" className="homepage-slogan">
                          <Row>
                            <Col span={14}></Col>
                            <Col span={6}>
                              <div className="homepage-music">CommentFly</div>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={15}></Col>
                            <Col span={8}>
                              <div className="homepage-clever">
                                Music, the clever way.
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={15}></Col>
                            <Col span={8}>
                              <div className="homepage-oneliner">
                                “To acquire knowledge, one must study; but to
                                acquire wisdom, one must observe.”
                                <span
                                  style={{
                                    fontStyle: "italic"
                                  }}
                                >
                                  ― Marilyn vos Savant
                                </span>
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <br />
                        <Row>
                          <Col span={14}></Col>
                          <Col className="carousel" span={8}>
                            <Carousel
                              autoplay="true"
                              effect="fade"
                              afterChange={onChange}
                            >
                              <div>
                                {" "}
                                <img style={caraStyle} src={Cara1}></img>
                              </div>
                              <div>
                                {" "}
                                <img style={caraStyle} src={Cara2}></img>
                              </div>
                              <div>
                                {" "}
                                <img style={caraStyle} src={Cara3}></img>
                              </div>
                              <div>
                                {" "}
                                <img style={caraStyle} src={Cara4}></img>
                              </div>
                            </Carousel>
                          </Col>
                        </Row>
                      </div>
                    )}
                  </Spring>
                </section>
                <section id="about-us" style={backgroundIma2}>
                  <Spring
                    from={{ opacity: 0 }}
                    to={{ opacity: 1 }}
                    config={{ delay: 1500, duration: 700 }}
                  >
                    {props => (
                      <div style={props}>
                        <div className="homepage-slogan">
                          <br />
                          <br />
                          <br />
                          <br />
                          <Row>
                            <Col span={14}></Col>
                            <Col span={8}>
                              <div className="homepage-music">About Us</div>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={12}></Col>

                            <Col span={10}>
                              <div className="homepage-oneliner">
                                Students are faced with immense difficulties
                                when trying to develop skills such as performing
                                music, acting, public-speaking, cooking,
                                dancing, etc. because of the lack of frequent,
                                quality feedback on their practises. In
                                addition, having frequent classes with coaches,
                                though effective, could incur high investment in
                                both money and time. What if students could
                                conveniently record their practise routine
                                anywhere on an app, and upload it for dedicated,
                                certified experts from around the world to
                                review and comment? This where CommentFly comes
                                in. With a simple click of a button, you're
                                video will be viewed by professionals all around
                                the world to help you achieve your goal. With
                                over 500,000 expert within your finguretip to
                                comment away.
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    )}
                  </Spring>
                </section>
                <section style={backgroundIma3}>
                  <Spring
                    from={{ opacity: 0 }}
                    to={{ opacity: 1 }}
                    config={{ delay: 1500, duration: 700 }}
                  >
                    {props => (
                      <div style={props}>
                        <Row>
                          <Col span={1}></Col>

                          <Col span={16}>
                            <div
                              id="student-overview"
                              className="homepage-slogan"
                            >
                              <br />
                              <br />
                              <br />
                              <br />
                              <div className="homepage-music">
                                Start Your Journey
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <br />
                          <br />
                          <br />
                          <br />
                          <Col span={2}></Col>

                          <Col span={16}>
                            <div
                              id="student-overview"
                              className="homepage-clever"
                            >
                              <ul type="square">
                                <li>Affordable Prices</li>
                                <li>
                                  Practical Advice from Reputable World Class
                                  Expert
                                </li>
                                <li>Automated Progression Charts</li>
                                <li>Easy to use on a daily basis</li>
                                <li>Practice on your own time and schedule!</li>
                                <li>
                                  Be remote! Access are App all around the World
                                </li>
                                <li>
                                  Have multiple expert comment on your videos
                                </li>
                              </ul>
                            </div>{" "}
                          </Col>
                        </Row>
                        <Row>
                          <Col span={3}></Col>

                          <Col span={12}>
                            <Row
                              type="flex"
                              justify="center"
                              align="middle"
                              style={{
                                height: "10vh",
                                marginTop: "2%"
                              }}
                              id="hoverEffect"
                            >
                              <Col
                                xs={20}
                                sm={10}
                                md={8}
                                style={{
                                  height: "100%",
                                  backgroundColor: "white"
                                }}
                              >
                                <a href="/signup/student">
                                  <Row
                                    type="flex"
                                    justify="center"
                                    align="middle"
                                    className="btnStyle"
                                    id="btnUpload"
                                  >
                                    <Col>{" Sign Up"}</Col>
                                  </Row>
                                </a>
                              </Col>
                            </Row>{" "}
                          </Col>
                        </Row>
                      </div>
                    )}
                  </Spring>
                </section>
                <section style={backgroundIma4}>
                  <Spring
                    from={{ opacity: 0 }}
                    to={{ opacity: 1 }}
                    config={{ delay: 1500, duration: 700 }}
                  >
                    {props => (
                      <div style={props}>
                        <Row>
                          <Col span={1}></Col>

                          <Col span={16}>
                            <div id="work-with-us" className="homepage-slogan">
                              <br />
                              <br />
                              <br />
                              <br />
                              <div className="homepage-music">Work With Us</div>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <br />
                          <br />
                          <br />
                          <br />
                          <Col span={2}></Col>

                          <Col span={16}>
                            <div
                              id="student-overview"
                              className="homepage-clever"
                            >
                              <ul type="square">
                                <li>Be you own boss</li>
                                <li>Spread your Knowledge and Passion</li>
                                <li>See your progress and earnings!</li>
                                <li>Easy to use on a daily basis</li>
                                <li>Work on your own time and schedule!</li>
                                <li>
                                  Be remote! Access are App all around the World
                                </li>
                                <li>Earn as you go </li>
                              </ul>
                            </div>{" "}
                          </Col>
                        </Row>
                        <Row>
                          <Col span={3}></Col>

                          <Col span={12}>
                            <Row
                              type="flex"
                              justify="center"
                              align="middle"
                              style={{
                                height: "10vh",
                                marginTop: "5%"
                              }}
                              id="hoverEffect"
                            >
                              <Col
                                xs={20}
                                sm={10}
                                md={8}
                                style={{
                                  height: "100%",
                                  backgroundColor: "#efefef"
                                }}
                              >
                                <a href="/signup/expert">
                                  <Row
                                    type="flex"
                                    justify="center"
                                    align="middle"
                                    className="btnStyle"
                                    id="btnUpload"
                                  >
                                    <Col>{" Apply Now"}</Col>
                                  </Row>
                                </a>
                              </Col>
                            </Row>{" "}
                          </Col>
                        </Row>
                      </div>
                    )}
                  </Spring>
                  <BackTop />
                </section>
              </div>
              <div style={footerContainerStyle}>
                <Footer><Col span={10}>
                       </Col>
                  <Col span={8}> CommentFly 2019 </Col>
                  <Col span={8}></Col>
                </Footer>
              </div>
            </div>
          )}
        </Spring>
      );
    }
    if (localStorage.getItem("userType") !== null) {
      return (
        <Spring
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}
          config={{ delay: 700, duration: 700 }}
        >
          {props => (
            <div style={props}>
              <div>
                {" "}
                <section style={backgroundImg}>
                  <Spring
                    from={{ opacity: 0 }}
                    to={{ opacity: 1 }}
                    config={{ delay: 1500, duration: 700 }}
                  >
                    {props => (
                      <div style={props}>
                        <div id="home" className="homepage-slogan">
                          <Row>
                            <Col span={14}></Col>
                            <Col span={6}>
                              <div className="homepage-music">CommentFly</div>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={15}></Col>
                            <Col span={8}>
                              <div className="homepage-clever">
                                Music, the clever way.
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={15}></Col>
                            <Col span={8}>
                              <div className="homepage-oneliner">
                                “To acquire knowledge, one must study; but to
                                acquire wisdom, one must observe.”
                                <span
                                  style={{
                                    fontStyle: "italic"
                                  }}
                                >
                                  ― Marilyn vos Savant
                                </span>
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <br />
                        <Row>
                          <Col span={14}></Col>
                          <Col className="carousel" span={8}>
                            <Carousel
                              autoplay="true"
                              effect="fade"
                              afterChange={onChange}
                            >
                              <div>
                                {" "}
                                <img style={caraStyle} src={Cara1}></img>
                              </div>
                              <div>
                                {" "}
                                <img style={caraStyle} src={Cara2}></img>
                              </div>
                              <div>
                                {" "}
                                <img style={caraStyle} src={Cara3}></img>
                              </div>
                              <div>
                                {" "}
                                <img style={caraStyle} src={Cara4}></img>
                              </div>
                            </Carousel>
                          </Col>
                        </Row>
                      </div>
                    )}
                  </Spring>
                </section>
                <section id="about-us" style={backgroundIma2}>
                  <Spring
                    from={{ opacity: 0 }}
                    to={{ opacity: 1 }}
                    config={{ delay: 1500, duration: 700 }}
                  >
                    {props => (
                      <div style={props}>
                        <div className="homepage-slogan">
                          <br />
                          <br />
                          <br />
                          <br />
                          <Row>
                            <Col span={14}></Col>
                            <Col span={8}>
                              <div className="homepage-music">About Us</div>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={12}></Col>

                            <Col span={10}>
                              <div className="homepage-oneliner">
                                Students are faced with immense difficulties
                                when trying to develop skills such as performing
                                music, acting, public-speaking, cooking,
                                dancing, etc. because of the lack of frequent,
                                quality feedback on their practises. In
                                addition, having frequent classes with coaches,
                                though effective, could incur high investment in
                                both money and time. What if students could
                                conveniently record their practise routine
                                anywhere on an app, and upload it for dedicated,
                                certified experts from around the world to
                                review and comment? This where CommentFly comes
                                in. With a simple click of a button, you're
                                video will be viewed by professionals all around
                                the world to help you achieve your goal. With
                                over 500,000 expert within your finguretip to
                                comment away.
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    )}
                  </Spring>
                </section>
                <section style={backgroundIma3}>
                  <Spring
                    from={{ opacity: 0 }}
                    to={{ opacity: 1 }}
                    config={{ delay: 1500, duration: 700 }}
                  >
                    {props => (
                      <div style={props}>
                        <Row>
                          <Col span={1}></Col>

                          <Col span={16}>
                            <div
                              id="student-overview"
                              className="homepage-slogan"
                            >
                              <br />
                              <br />
                              <br />
                              <br />
                              <div className="homepage-music">
                                Start Your Journey
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <br />
                          <br />
                          <br />
                          <br />
                          <Col span={2}></Col>

                          <Col span={16}>
                            <div
                              id="student-overview"
                              className="homepage-clever"
                            >
                              <ul type="square">
                                <li>Affordable Prices</li>
                                <li>
                                  Practical advice from reputable world class
                                  expert
                                </li>
                                <li>Automated progression charts</li>
                                <li>Easy to use on a daily basis</li>
                                <li>Practice on your own time and schedule!</li>
                                <li>
                                  Be remote! Access our app all around the World
                                </li>
                                <li>
                                  Have multiple expert comment on your videos
                                </li>
                              </ul>
                            </div>{" "}
                          </Col>
                        </Row>
                        <Row>
                          <Col span={6}></Col>

                          <Col span={6}>
                            <Row
                              type="flex"
                              justify="center"
                              align="middle"
                              style={{ height: "15vh", marginTop: "5%" }}
                              id="hoverEffect"
                            >
                              <Col
                                xs={20}
                                sm={10}
                                md={8}
                                style={{ height: "100%" }}
                              >
                                <a href="/uploadVideo">
                                  <Row
                                    type="flex"
                                    justify="center"
                                    align="middle"
                                    className="btnStyle"
                                    id="btnUpload"
                                  >
                                    <Col>
                                      <Icon type="upload" />
                                      {" UPLOAD VIDEO"}
                                    </Col>
                                  </Row>
                                </a>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    )}
                  </Spring>
                </section>
                <section style={backgroundIma4}>
                  <Spring
                    from={{ opacity: 0 }}
                    to={{ opacity: 1 }}
                    config={{ delay: 1500, duration: 700 }}
                  >
                    {props => (
                      <div style={props}>
                        <Row>
                          <Col span={1}></Col>

                          <Col span={16}>
                            <div id="work-with-us" className="homepage-slogan">
                              <br />
                              <br />
                              <br />
                              <br />
                              <div className="homepage-music">Work With Us</div>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <br />
                          <br />
                          <br />
                          <br />
                          <Col span={2}></Col>

                          <Col span={16}>
                            <div
                              id="student-overview"
                              className="homepage-clever"
                            >
                              <ul type="square">
                                <li>Be you own boss</li>
                                <li>Spread your knowledge and passion</li>
                                <li>See your progress and earnings!</li>
                                <li>Easy to use on a daily basis</li>
                                <li>Work on your own time and schedule!</li>
                                <li>
                                  Be remote! access our app all around the world
                                </li>
                                <li>Earn as you go </li>
                              </ul>
                            </div>{" "}
                          </Col>
                        </Row>
                        <Row>
                          <Col span={6}></Col>

                          <Col span={6}>
                            <Button href="/signup/expert">Apply Now!</Button>
                          </Col>
                          <ContactForm />
                        </Row>
                      </div>
                    )}
                  </Spring>
                  <div></div>
                  <BackTop />
                </section>
              {/* </div>{" "}
              <Footer>Footer</Footer> */}
                <section style={backgroundIma4}>
                  <Spring
                    from={{ opacity: 0 }}
                    to={{ opacity: 1 }}
                    config={{ delay: 1500, duration: 700 }}
                  >
                    {props => (
                      <div style={props}>
                        <Row>
                          <Col span={1}></Col>

                          <Col span={16}>
                            <div id="work-with-us" className="homepage-slogan">
                              <br />
                              <br />
                              <br />
                              <br />
                              <div className="homepage-music">Contact Us</div>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <br />
                          <br />
                          <br />
                          <br />
                          <Col span={2}></Col>

                          <Col span={16}>
                            <div
                              id="student-overview"
                              className="homepage-clever"
                            >
                              <ContactForm />
                            </div>{" "}
                          </Col>
                        </Row>
                        <Row>
                          <Col span={6}></Col>
                        </Row>
                      </div>
                    )}
                  </Spring>
                  <div></div>
                </section>

              </div>
            </div>
          )}
        </Spring>
      );
    }
  }
}
