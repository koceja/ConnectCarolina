import React from "react";
import { Card, Flex, Box } from "rebass";

import Loading from "./loading.js";

import "./core-components.css";

export class Personal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      personal: null,
    };
  }

  componentDidMount() {
    const opts = {
      headers: {
        Authorization: localStorage.getItem("onyen"),
      },
      method: "GET",
    };
    fetch(
      "https://bkcyx6oezl.execute-api.us-east-1.amazonaws.com/personal",
      opts
    )
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        data = JSON.parse(data);
        this.setState({
          personal: {
            name: `${data.first_name} ${data.last_name}`,
            address: data.home_address,
            mailing: data.mailing_address,
            phone: data.phone_number,
            email: data.unc_email,
          },
          loading: false,
        });
      });
  }

  render() {
    const person = this.state.personal;
    return (
      <div className="dashboard-card personal-container">
        {this.state.loading ? (
          <Card className="dashboard-card text-only">
            <Loading />
          </Card>
        ) : (
          <Card className="dashboard-card">
            <div id="personal-info">
              <h3>{person.name}</h3>
              <p>{`Address: ${person.address}`}</p>
              <p>{`Mailing: ${person.mailing}`}</p>
              <p>{`Phone: ${person.phone}`}</p>
              <p>{`Email: ${person.email}`}</p>
            </div>
          </Card>
        )}
      </div>
    );
  }
}

export class Classes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      classes: [],
    };
  }

  componentDidMount() {
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
      <div className="dashboard-card classes">
        {this.state.loading ? (
          <Card className="dashboard-card text-only">
            <Loading />
          </Card>
        ) : (
          <Card className="dashboard-card">
            <h3>My Classes</h3>

            <div id="class-list">
              {this.state.classes.length === 0 ? (
                <h3 className="text-only">You have no classes</h3>
              ) : (
                this.state.classes.map((course, index) => (
                  <div>
                    <Flex>
                      <Box p={2} width={1 / 4}>
                        <h3>{`${course.subject} ${course.number}-${course.section}`}</h3>
                      </Box>
                      <Box p={2} width={1 / 4}>
                        <p className="course-data">{`${course.meeting_days} ${course.meeting_time}`}</p>
                      </Box>
                      <Box p={2} width={1 / 4}>
                        <p className="course-data">{course.room}</p>
                      </Box>
                      <Box p={2} width={1 / 4}>
                        <p className="course-data">{course.professor}</p>
                      </Box>
                      
                    </Flex>
                    {index === this.state.classes.length - 1 ? null : <hr />}
                  </div>
                ))
              )}
            </div>
          </Card>
        )}
      </div>
    );
  }
}

export class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      classes: [],
    };
  }

  componentDidMount() {
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
          classes: data,
          loading: false,
        });
      });
  }

  render() {
    return (
      <div className="dashboard-card shopping-cart">
        {this.state.loading ? (
          <Card className="dashboard-card text-only">
            <Loading />
          </Card>
        ) : (
          <Card className="dashboard-card">
            <h3>Shopping Cart</h3>
            <div id="course-list">
              {this.state.classes.length === 0 ? (
                <h3 className="text-only">Your shopping cart is empty</h3>
              ) : (
                this.state.classes.map((course, index) => (
                  <div key={`class-${index}`}>
                    <Flex>
                      <Box p={2} width={1 / 5}>
                        <h3>{`${course.subject} ${course.number}-${course.section}`}</h3>
                      </Box>
                      <Box p={2} width={1 / 5}>
                        <p className="course-data">{`${course.meeting_days} ${course.meeting_time}`}</p>
                      </Box>
                      <Box p={2} width={1 / 5}>
                        <p className="course-data">{course.room}</p>
                      </Box>
                      <Box p={2} width={1 / 5}>
                        <p className="course-data">{course.professor}</p>
                      </Box>
                      <Box p={2} width={1 / 5}>
                        <p className="course-data">
                          {course.capacity <= course.students.length
                            ? <span style={{color: "red", fontWeight: "bold"}}>closed</span>
                            : <span style={{color: "green", fontWeight: "bold"}}>open</span>}
                        </p>
                      </Box>
                    </Flex>
                    {index === this.state.classes.length - 1 ? null : <hr />}
                  </div>
                ))
              )}
            </div>
          </Card>
        )}
      </div>
    );
  }
}

export class Finances extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      finances: null,
    };
  }

  componentDidMount() {
    const opts = {
      headers: {
        Authorization: localStorage.getItem("onyen"),
      },
      method: "GET",
    };
    fetch(
      "https://bkcyx6oezl.execute-api.us-east-1.amazonaws.com/financial",
      opts
    )
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        data = JSON.parse(data);
        this.setState({
          finances: data,
          loading: false,
        });
      });
  }

  render() {
    const finances = this.state.finances;
    return (
      <div className="dashboard-card finances">
        {this.state.loading ? (
          <Card className="dashboard-card text-only">
            <Loading />
          </Card>
        ) : (
          <Card className="dashboard-card">
            <div id="finances">
              <Flex flexWrap="wrap">
                <Box p={1} width={1 / 3}>
                  <p>
                    <span className="boldy">Outstanding Amount Due</span>
                  </p>
                </Box>
                <Box p={1} width={1 / 3}>
                  <p>
                    <span className="boldy">Due now</span>
                  </p>
                </Box>
                <Box p={1} width={1 / 3}>
                  <p>
                    <span className="boldy">Future Due</span>
                  </p>
                </Box>
                <Box p={1} width={1 / 3}>
                    
                  <p>{(finances.due === 0) ? <span style={{color: "green", fontWeight: "bold"}}>{"$" + finances.due}</span>
                            : <span style={{color: "red", fontWeight: "bold"}}>{"$" + finances.due}</span>}</p>
                </Box>
                <Box p={1} width={1 / 3}>
                <p>{(finances.due_now === 0) ? <span style={{color: "green", fontWeight: "bold"}}>{"$" + finances.due_now}</span>
                            : <span style={{color: "red", fontWeight: "bold"}}>{"$" + finances.due_now}</span>}</p>
                </Box>
                <Box p={1} width={1 / 3}>
                <p>{(finances.future_due === 0) ? <span style={{color: "green", fontWeight: "bold"}}>{"$" + finances.future_due}</span>
                            : <span style={{color: "#929200", fontWeight: "bold"}}>{"$" + finances.future_due}</span>}</p>
                </Box>
              </Flex>
            </div>
          </Card>
        )}
      </div>
    );
  }
}

export class Holds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      holds: [],
    };
  }

  componentDidMount() {
    const opts = {
      headers: {
        Authorization: localStorage.getItem("onyen"),
      },
      method: "GET",
    };
    fetch(
      "https://bkcyx6oezl.execute-api.us-east-1.amazonaws.com/academics",
      opts
    )
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        data = JSON.parse(data);
        this.setState({
          holds: data.holds,
          loading: false,
        });
      });
  }

  render() {
    return (
      <div className="dashboard-card holds">
        {this.state.loading ? (
          <Card className="dashboard-card text-only">
            <Loading />
          </Card>
        ) : (
          <Card className="dashboard-card">
            <h3>Holds</h3>
            <div className="holds-list">
              {this.state.holds.map((curr, index) => (
                <div key={`hold-${index}`}>
                  <ul>
                    <li className="holds-item">{curr}</li>
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    );
  }
}

export class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      todos: [],
    };
  }

  componentDidMount() {
    const opts = {
      headers: {
        Authorization: localStorage.getItem("onyen"),
      },
      method: "GET",
    };
    fetch(
      "https://bkcyx6oezl.execute-api.us-east-1.amazonaws.com/academics",
      opts
    )
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        data = JSON.parse(data);
        this.setState({
          todos: data.todo,
          loading: false,
        });
      });
  }

  render() {
    return (
      <div className="dashboard-card todos">
        {this.state.loading ? (
          <Card className="dashboard-card text-only">
            <Loading />
          </Card>
        ) : (
          <Card className="dashboard-card">
            <h3>To Do</h3>
            <div className="todo-list">
              {this.state.todos.map((curr, index) => (
                <div key={`todo-${index}`}>
                  <ul>
                    <li>{curr}</li>
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    );
  }
}

export class FinancialAid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      aidAmount: 0,
    };
  }

  componentDidMount() {
    const opts = {
      headers: {
        Authorization: localStorage.getItem("onyen"),
      },
      method: "GET",
    };
    fetch(
      "https://bkcyx6oezl.execute-api.us-east-1.amazonaws.com/financial",
      opts
    )
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        data = JSON.parse(data);
        this.setState({
          aidAmount: data.financial_aid,
          loading: false,
        });
      });
  }

  render() {
    return (
      <div className="dashboard-card personal-container">
        {this.state.loading ? (
          <Card className="dashboard-card text-only">
            <Loading />
          </Card>
        ) : (
          <Card className="dashboard-card text-only">
            <div className="cover">
              <h3>
                View <br />
                Financial Aid
              </h3>
            </div>
            <h3>{`$${this.state.aidAmount}`}</h3>
          </Card>
        )}
      </div>
    );
  }
}

export class GPA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      gpa: 0,
    };
  }

  componentDidMount() {
    const opts = {
      headers: {
        Authorization: localStorage.getItem("onyen"),
      },
      method: "GET",
    };
    fetch(
      "https://bkcyx6oezl.execute-api.us-east-1.amazonaws.com/academics",
      opts
    )
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        data = JSON.parse(data);
        this.setState({
          gpa: data.gpa,
          loading: false,
        });
      });
  }

  render() {
    return (
      <div className="dashboard-card personal-container">
        {this.state.loading ? (
          <Card className="dashboard-card text-only">
            <Loading />
          </Card>
        ) : (
          <Card className="dashboard-card text-only">
            <div className="cover">
              <h2 style={{ width: "100px" }}>
                View <br />
                GPA
              </h2>
            </div>
            <h2>{(Math.round(this.state.gpa * 100) / 100).toFixed(2)}</h2>
          </Card>
        )}
      </div>
    );
  }
}

export class DashboardSearch extends React.Component {
  render() {
    return (
      <div className="dashboard-card personal-container">
        <a href="/student-center/academics/search">
          <Card className="dashboard-card text-only">
            <h3>Search for Classes</h3>
          </Card>
        </a>
      </div>
    );
  }
}

export class Advisor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      advisor: null,
    };
  }

  componentDidMount() {
    const opts = {
      headers: {
        Authorization: localStorage.getItem("onyen"),
      },
      method: "GET",
    };
    fetch(
      "https://bkcyx6oezl.execute-api.us-east-1.amazonaws.com/academics",
      opts
    )
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        data = JSON.parse(data);
        this.setState({
          advisor: data.advisor,
          loading: false,
        });
      });
  }

  render() {
    const advisor = this.state.advisor;
    return (
      <div className="dashboard-card advisor-container">
        {this.state.loading ? (
          <Card className="dashboard-card text-only">
            <Loading />
          </Card>
        ) : (
          <Card className="dashboard-card text-only">
            {this.state.loading ? (
              <Loading />
            ) : (
              <div id="advisor-info">
                <h3>Advisor</h3>
                <p>{advisor}</p>
              </div>
            )}
          </Card>
        )}
      </div>
    );
  }
}
