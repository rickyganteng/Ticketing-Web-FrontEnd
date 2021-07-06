import React, { Component } from "react";
import styles from "./Register.module.css";
import {
  Row,
  Col,
  Button,
  Container,
  Form,
  Image,
  Alert,
} from "react-bootstrap";
import { Google, Facebook } from "react-bootstrap-icons";
import { connect } from "react-redux";
import { register } from "../../../redux/action/auth";
import logo from "../../../assets/img/logo_0.png";
import line from "../../../assets/img/line_long.png";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        firstName: "",
        lastName: "",
        userEmail: "",
        userPhoneNumber: "",
        userPassword: "",
      },
      isShow: ["danger", false],
      msg: "",
      firstNameValid: "valid",
      lastNameValid: "valid",
      phoneNumberValid: "valid",
      passwordValid: "valid",
    };
  }

  changeText = (event) => {
    // validation
    const name = event.target.name;
    const value = event.target.value;

    if (name === "firstName") {
      /^[A-Za-z ]+$/.test(value)
        ? this.setState({ firstNameValid: "valid" })
        : this.setState({
          firstNameValid: "Invalid",
          msg: "Please enter A-Z character",
        });
    } else if (name === "lastName") {
      /^[A-Za-z ]+$/.test(value) || value.length === 0
        ? this.setState({ lastNameValid: "valid" })
        : this.setState({
          lastNameValid: "Invalid",
          msg: "Please enter A-Z character",
        });
    } else if (name === "userPhoneNumber") {
      /^[0-9]+$/.test(value) && value.length <= 12
        ? this.setState({ phoneNumberValid: "valid" })
        : this.setState({
          phoneNumberValid: "Invalid",
          msg: "Please enter a maximum of 12 digit numbers",
        });
    } else if (name === "userPassword") {
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/.test(value)
        ? this.setState({ passwordValid: "valid" })
        : this.setState({
          passwordValid: "Invalid",
          msg:
            "Minimum 4 characters, at least one letter and one number:",
        });
    }
    this.setState({
      form: {
        ...this.state.form,
        [name]: value,
      },
    });
  };

  handleRegister = (event) => {
    event.preventDefault();
    const {
      firstNameValid,
      phoneNumberValid,
      passwordValid,
      msg,
      form,
    } = this.state;
    const { register } = this.props;

    if (
      firstNameValid === "valid" &&
      phoneNumberValid === "valid" &&
      passwordValid === "valid" &&
      msg.length > 0 &&
      form.userEmail.length > 0
    ) {
      register(form)
        .then((res) => {
          this.setState({
            msg: res.value.data.msg,
            isShow: ["success", true],
          });
          setTimeout(() => {
            this.props.history.push("/login");
          }, 3000);
        })
        .catch((err) => {
          this.setState({
            msg: "Error: " + err.response.data.msg,
            isShow: ["danger", true],
          });
        });
    }
  };

  render() {
    const {
      userEmail,
      firstName,
      lastName,
      userPhoneNumber,
      userPassword,
      firstNameValid,
      lastNameValid,
      phoneNumberValid,
      passwordValid,
      isShow,
      msg,
    } = this.state;


    return (
      <>
        <Container fluid>
          <Row>
            <Col md={7}>
              <div className={styles.left}>
                <div className={`${styles.leftIn} p-5`}>
                  <Image src={logo} className={`${styles.logo} mb-5`} />
                  <p className={`${styles.mainTitle} mt-3`}>
                    Lets build your account
                  </p>
                  <p className={`${styles.semiTitle} mb-5`}>
                    To be a loyal moviegoer and access all of features, your
                    details are required.
                  </p>
                  <div className="d-flex flex-row mb-3">
                    <div className={`${styles.dot} pt-1`}>1</div>
                    <p className={`${styles.semiTitle} pt-1 ml-4`}>
                      Fill your additional details
                    </p>
                  </div>
                  <div className="d-flex flex-row mb-3">
                    <div className={`${styles.dot} pt-1`}>2</div>
                    <p className={`${styles.semiTitle} pt-1 ml-4`}>
                      Activate your account
                    </p>
                  </div>
                  <div className="d-flex flex-row">
                    <div className={`${styles.dot} pt-1`}>3</div>
                    <p className={`${styles.semiTitle} pt-1 ml-4`}>Done</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={5}>
              <div className="mx-auto p-4">
                <h3 className="mt-5">Fill your additional details</h3>

                <Form onSubmit={this.handleRegister} className="mt-4">
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your first name"
                      name="firstName"
                      value={firstName}
                      onChange={(event) => this.changeText(event)}
                    />
                    <Form.Control.Feedback type={firstNameValid}>
                      <p className={styles.warning}>{msg}</p>
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your last name"
                      name="lastName"
                      value={lastName}
                      onChange={(event) => this.changeText(event)}
                    />
                    <Form.Control.Feedback type={lastNameValid}>
                      <p className={styles.warning}>{msg}</p>
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your phone number"
                      name="userPhoneNumber"
                      value={userPhoneNumber}
                      onChange={(event) => this.changeText(event)}
                    />
                    <Form.Control.Feedback type={phoneNumberValid}>
                      <p className={styles.warning}>{msg}</p>
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="userEmail"
                      value={userEmail}
                      onChange={(event) => this.changeText(event)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                      name="userPassword"
                      value={userPassword}
                      onChange={(event) => this.changeText(event)}
                    />
                    <Form.Control.Feedback type={passwordValid}>
                      <p className={styles.warning}>{msg}</p>
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className={`${styles.btSubmit} mt-3`}
                  >
                    Join for free now
                  </Button>
                </Form>
                <Alert
                  show={isShow[1]}
                  variant={isShow[0]}
                  className="text-center mt-4"
                >
                  {msg}
                </Alert>
                <p
                  className={`${styles.semi} text-center mt-2`}
                  style={{ fontSize: "15px" }}
                >
                  <span>Do you already have an account? </span>
                  <span
                    className={styles.resetBtn}
                    style={{ color: "#5F2EEA" }}
                    onClick={() => {
                      this.props.history.push("/login");
                    }}
                  >
                    Log in
                  </span>
                </p>
                <div className="d-flex flex-row justify-content-center mt-4 mb-3">
                  <div>
                    <Image src={line} className={styles.line} />
                  </div>
                  <p className={styles.semi} style={{ fontSize: "11px" }}>
                    Or
                  </p>
                  <div>
                    <Image src={line} className={styles.line} />
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-center">
                  <div className="mr-1">
                    <Button variant="light" className="shadow">
                      <span>
                        <Google />
                      </span>
                      <span
                        className={styles.semi}
                        style={{ fontSize: "13px" }}
                      >
                        {" "}
                        Google
                      </span>
                    </Button>
                  </div>
                  <div className="ml-2">
                    <Button variant="light" className="shadow">
                      <span>
                        <Facebook />
                      </span>
                      <span
                        className={styles.semi}
                        style={{ fontSize: "13px" }}
                      >
                        {" "}
                        Facebook
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const mapDispatchToProps = { register };

export default connect(null, mapDispatchToProps)(Register);
