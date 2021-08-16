import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Nav, Navbar, Button, Image, Modal, Form } from "react-bootstrap";
import logo from "../../assets/img/logo_1.png";
import { Search } from "react-bootstrap-icons";
import styles from "./NavBar.module.css";
// import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import { logout } from "../../redux/action/auth";
import { getAllMovie } from "../../redux/action/movie";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      page: 1,
      limit: 5,
      isShow: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      this.getData(this.state.search);
    }
  }

  getData = (search) => {
    const { page, limit } = this.state;
    this.props.getAllMovie(page, limit, "movie_name ASC", "%" + search + "%");
  };

  changeText = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleClose = () => {
    this.setState({
      isShow: false,
    });
  };

  handleShow = () => {
    this.setState({
      isShow: true,
    });
  };

  handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    this.setState({ page: selectedPage }, () => {
      this.getData(this.state.search);
    });
  };

  handleResSearch = (id) => {
    this.props.history.push(`/main/movie-detail/${id}`);
  };

  handleLogin = () => {
    this.props.history.push("/login");
  };

  handleLogout = () => {
    this.props.logout();
    this.props.history.push("/login");
  };

  render() {
    const { isShow } = this.state;
    const { dataMovie } = this.props.movie;
    const { data } = this.props.auth;
    const { isAdminPage } = this.props;

    return (
      <>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="light"
          variant="light"
          sticky="top"
        >
          <Navbar.Brand>
            <Image src={logo} fluid />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-between"
          >
            {isAdminPage ? (
              <Nav>
                <Link className="ml-sm-5 mr-2" to="/">
                  <span className={styles.link}>Home</span>
                </Link>
                <Link className="ml-sm-5" to="/main/admin/dashboard">
                  <span className={styles.link}>Dashboard</span>
                </Link>
                <Link className="ml-sm-5" to="/main/admin/manage-movie">
                  <span className={styles.link}>Manage Movie</span>
                </Link>
                <Link className="ml-sm-5" to="/main/admin/manage-schedule">
                  <span className={styles.link}>Manage Schedule</span>
                </Link>
              </Nav>
            ) : (
              <Nav>
                <Link className="ml-sm-5 mr-2" to="/">
                  <span className={styles.link}>Home</span>
                </Link>
                <Link className="ml-sm-5 mr-2" to="/main/payment">
                  <span className={styles.link}>Payment</span>
                </Link>
                <Link className="ml-sm-5 mr-2" to="/main/profile">
                  <span className={styles.link}>Profile</span>
                </Link>
                {data.user_role === "admin" ? (
                  <Link className="ml-sm-5 mr-2" to="/main/admin/manage-movie">
                    <span className={styles.link}>Admin</span>
                  </Link>
                ) : (
                  ""
                )}
              </Nav>
            )}

            <Nav>
              <p className="mr-sm-4 mt-3">
                <span className={styles.link}>Location</span>
              </p>
              <div className="mr-sm-4 mt-3" onClick={this.handleShow}>
                <Search className={styles.search} />
              </div>
              <Modal animation={false} show={isShow} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title className={styles.rightBold}>
                    Movie Search
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group>
                      <Form.Control
                        name="search"
                        type="text"
                        placeholder="Type your movie name here"
                        onChange={(event) => this.changeText(event)}
                      />
                    </Form.Group>
                  </Form>
                  {dataMovie.map((item, index) => {
                    return (
                      <p
                        key={index}
                        className={styles.searchText}
                        onClick={() => this.handleResSearch(item.movie_id)}
                      >{item.movie_name}</p>
                    );
                  })}
                </Modal.Body>
                <div className="d-flex justify-content-center">
                  {/* <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pagination.totalPage ? pagination.totalPage : 0}
                    marginPagesDisplayed={5}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={styles.pagination}
                    subContainerClassName={`${styles.pages} ${styles.pagination}`}
                    activeClassName={styles.active}
                  /> */}
                </div>
              </Modal>
              <div className="mr-sm-4 mt-2">
                {Object.keys(data).length === 0 ? (
                  <Button
                    className={(styles.link, styles.btNav)}
                    onClick={() => this.handleLogin()}
                  >
                    Login
                  </Button>
                ) : (
                  <div className="d-flex flex-md-row flex-column">
                    <div className="mr-sm-4 mt-0 mb-1">
                      <Image
                        src={`https://ticketingweb.herokuapp.com/backend1/api/${data.user_profile_image}`}
                        roundedCircle
                        style={{ width: "45px", height: "45px" }}
                      />
                    </div>
                    <Button
                      className={(styles.link, styles.btNav)}
                      onClick={() => this.handleLogout()}
                    >
                      Log out
                    </Button>
                  </div>
                )}
              </div>

            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  movie: state.movie,
});

const mapDispatchToProps = { logout, getAllMovie };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NavBar));
