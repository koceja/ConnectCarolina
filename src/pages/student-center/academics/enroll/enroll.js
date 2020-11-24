import React from "react";
import { Card, Flex, Box, Button } from "rebass";
import Loading from "../../shared/loading.js";
import Page from "../../../page.js";
import { ShoppingNavBar } from "../../../nav/navbar.js";

import "./enroll.css";

class ClassResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };

    this.drop = this.drop.bind(this);
  }

  drop() {
    if (!this.state.loading) {
      this.setState({
        loading: true,
      });
    }
    const opts = {
      headers: {
        Authorization: localStorage.getItem("onyen"),
      },
      method: "DELETE",
      body: JSON.stringify({
        subject: this.props.classy.subject,
        number: this.props.classy.number,
        section: this.props.classy.section,
      }),
    };
    fetch(
      "https://bkcyx6oezl.execute-api.us-east-1.amazonaws.com/academics/classes",
      opts
    )
      .then((response) => {
        if (response.status === 400) {
          throw Error("You are not enrolled in this course.");
        }
        return response.text();
      })
      .then((data) => {
        data = JSON.parse(data);
        this.setState({
          loading: false,
        });
        this.props.refresh();
      })
      .catch((error) => {
        alert(error);
        this.setState({
          loading: false,
        });
      });
  }

  render() {
    const classy = this.props.classy;
    return (
      <Flex>

        <Box p={2} width={3 / 16}>
                        <h3>{`${classy.subject} ${classy.number}-${classy.section}`}</h3>
                      </Box>
                      <Box p={2} width={3 / 16}>
                        <p className="course-data">{`${classy.meeting_days} ${classy.meeting_time}`}</p>
                      </Box>
                      <Box p={2} width={3 / 16}>
                        <p className="course-data">{classy.room}</p>
                      </Box>
                      <Box p={2} width={3 / 16}>
                        <p className="course-data">{classy.professor}</p>
                      </Box>
                      <Box p={2} width={1 / 8}>
                        <p className="course-data">
                          {classy.capacity <= classy.students.length
                            ? (<span style={{color: "red", fontWeight: "700"}}>closed</span>)
                            : (<span style={{color: "green", fontWeight: "700"}}>open</span>)}
                        </p>
                      </Box>
        <Box p={2} width={1 / 8}>
          <Button
            style={{ width: "100%" }}
            onClick={this.drop}
            className="course-data"
          >
            {this.state.loading ? "dropping..." : "Drop"}
          </Button>
        </Box>
      </Flex>
    );
  }
}

class ShoppingClassResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };

    this.removeFromCart = this.removeFromCart.bind(this);
  }

  removeFromCart() {
    if (!this.state.loading) {
      this.setState({
        loading: true,
      });
    }
    const opts = {
      headers: {
        Authorization: localStorage.getItem("onyen"),
      },
      method: "DELETE",
      body: JSON.stringify({
        subject: this.props.classy.subject,
        number: this.props.classy.number,
        section: this.props.classy.section,
      }),
    };
    fetch(
      "https://bkcyx6oezl.execute-api.us-east-1.amazonaws.com/academics/shopping_cart",
      opts
    )
      .then((response) => {
        if (response.status === 400) {
          throw Error("Class is not in shopping cart");
        }
        return response.text();
      })
      .then((data) => {
        data = JSON.parse(data);
        this.setState({
          loading: false,
        });
        this.props.refresh();
      })
      .catch((error) => {
        alert(error);
        this.setState({
          loading: false,
        });
      });
  }

  render() {
    const classy = this.props.classy;
    return (
      <Flex>

        <Box p={2} width={3 / 16}>
                        <h3>{`${classy.subject} ${classy.number}-${classy.section}`}</h3>
                      </Box>
                      <Box p={2} width={3 / 16}>
                        <p className="course-data">{`${classy.meeting_days} ${classy.meeting_time}`}</p>
                      </Box>
                      <Box p={2} width={3 / 16}>
                        <p className="course-data">{classy.room}</p>
                      </Box>
                      <Box p={2} width={3 / 16}>
                        <p className="course-data">{classy.professor}</p>
                      </Box>
                      <Box p={2} width={1 / 8}>
                        <p className="course-data">
                          {classy.capacity <= classy.students.length
                            ? (<span style={{color: "red", fontWeight: "700"}}>closed</span>)
                            : (<span style={{color: "green", fontWeight: "700"}}>open</span>)}
                        </p>
                      </Box>
        <Box p={2} width={1 / 8}>
          <Button
            style={{ width: "100%" }}
            onClick={this.removeFromCart}
            className="course-data"
          >
            {this.state.loading ? "removing..." : "Remove from Cart"}
          </Button>
        </Box>
        
      </Flex>
    );
  }
}

class ClassesManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      classes: [],
    };

    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    if (!this.state.loading) {
      this.setState({
        loading: true,
      });
    }
    const opts = {
      headers: {
        Authorization: localStorage.getItem("onyen"),
      },
      method: "GET",
    };
    fetch(
      "https://bkcyx6oezl.execute-api.us-east-1.amazonaws.com/academics/classes",
      opts
    )
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        data = JSON.parse(data);
        this.setState({
          classes: data,
          loading: false,
        });
      });
  }

  

  render() {
    return (
      <div id="classes-manager">
          <Box p={3} width={1}>
            <h3>Enrolled Courses</h3>
            {this.state.loading ? (
              <Card
                className="text-only"
                style={{ minHeight: "150px", boxShadow: "1px 1px 2px #616161" }}
              >
                <Loading />
              </Card>
            ) : (
              <Card style={{ boxShadow: "1px 1px 2px #616161" }}>
                {this.state.classes.length === 0 ? (
                  <h3 style={{ textAlign: "center" }}>You have no classes</h3>
                ) : (
                  this.state.classes.map((classy, index) => (
                    <div>
                      <ClassResult classy={classy} refresh={this.refresh} />
                      {index === this.state.classes.length - 1 ? null : (
                        <hr />
                      )}
                    </div>
                  ))
                )}
              </Card>
            )}
          </Box>
          <ShoppingCartManager refreshClasses={this.refresh} />
      </div>
    );
  }
}

class ShoppingCartManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      shoppingCart: [],
    };

    this.refresh = this.refresh.bind(this);
    this.enroll = this.enroll.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    if (!this.state.loading) {
      this.setState({
        loading: true,
      });
    }
    const opts = {
      headers: {
        Authorization: localStorage.getItem("onyen"),
      },
      method: "GET",
    };
    fetch(
      "https://bkcyx6oezl.execute-api.us-east-1.amazonaws.com/academics/shopping_cart",
      opts
    )
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        data = JSON.parse(data);
        this.setState({
          shoppingCart: data,
          loading: false,
        });
      });
  }

  enroll() {
    if (this.state.shoppingCart.length > 7) {
      alert("Too many items in the shopping cart. Please limit it to 7 at a time.");
      return;
    }
    if (!this.state.loading) {
      this.setState({
        loading: true,
      });
    }
    const opts = {
      headers: {
        Authorization: localStorage.getItem("onyen"),
      },
      method: "PATCH",
    };
    fetch(
      "https://bkcyx6oezl.execute-api.us-east-1.amazonaws.com/academics/shopping_cart",
      opts
    )
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        data = JSON.parse(data);
        this.setState({
          classes: data,
          loading: false,
        });
        this.refresh();
        this.props.refreshClasses();
      });
  }

  render() {
    const cart = this.state.shoppingCart;
    return (
      <div id="shopping-cart-manager" >

          <Box p={3} width={1}>
            <h3>Shopping Cart</h3>
            {this.state.loading ? (
              <Card
                className="text-only"
                style={{ minHeight: "150px", boxShadow: "1px 1px 2px #616161" }}
              >
                <Loading />
              </Card>
            ) : (
              <Card style={{ boxShadow: "1px 1px 2px #616161" }}>
                {this.state.shoppingCart.length === 0 ? (
                  <h3 style={{ textAlign: "center" }}>Your Cart is Empty</h3>
                ) : (
                  this.state.shoppingCart.map((classy, index) => (
                    <div>
                      <ShoppingClassResult classy={classy} refresh={this.refresh} />
                      {index === cart.length - 1 ? null : (
                        <hr />
                      )}
                    </div>
                  ))
                )}
              </Card>
            )}
          </Box>
          <div id="enroll-button">
            <Button onClick={this.enroll}>
              Enroll
            </Button>
          </div>              
      </div>
    );
  }
}

class Content extends React.Component {

  render() {
    return (
      <div id="enroll">
        <ShoppingNavBar active="enroll" />
        <ClassesManager />
      </div>
    )
  }
}

const Enroll = () => {
  return <Page active="academics" content={<Content />} />;
};

export default Enroll;
