import React, { Component } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import logo1 from "../../assets/img/logo_1.png";
import logo2 from "../../assets/img/logo_2.png";
import logo3 from "../../assets/img/logo_3.png";
import logo4 from "../../assets/img/logo_4.png";
import { Facebook, Twitter, Instagram, Youtube } from "react-bootstrap-icons";
import styles from "./Footer.module.css";

class Footer extends Component {
  render() {
    return (
      <>
        <footer className="mt-5">
          <Container fluid>
            <Row>
              <Col sm={4}>
                <Image className="mb-3" src={logo1} fluid />
                <p className={styles.semi}>
                  Stop waiting in line. Buy tickets conveniently, watch movies
                  quietly.
                </p>
              </Col>
              <Col sm={2}>
                <p className={styles.bold}>Explore</p>
                <p className={styles.semi}>Movies List</p>
                <p className={styles.semi}>My Ticket</p>
                <p className={styles.semi}>Notification</p>
              </Col>
              <Col sm={3}>
                <p className={styles.bold}>Our Sponsor</p>
                <Image className="mr-3 mb-3" src={logo2} fluid />
                <Image className="mr-3 mb-3" src={logo3} fluid />
                <Image className="mr-3 mb-3" src={logo4} fluid />
              </Col>
              <Col sm={3}>
                <p className={styles.bold}>Follow Us</p>
                <p className={styles.semi}>
                  <span>
                    <Twitter />
                  </span>{" "}
                  Tickitz Cinema id
                </p>
                <p className={styles.semi}>
                  <span>
                    <Instagram />
                  </span>{" "}
                  tickitz.id
                </p>
                <p className={styles.semi}>
                  <span>
                    <Youtube />
                  </span>{" "}
                  tickitz.id
                </p>
                <p className={styles.semi}>
                  <span>
                    <Facebook />
                  </span>{" "}
                  Tickitz Cinema id
                </p>
              </Col>
            </Row>
            <Row className={`${styles.semi} text-center mt-3`}>
              <Col>
                <p>© 2020 Tickitz. All Rights Reserved.</p>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default Footer;
