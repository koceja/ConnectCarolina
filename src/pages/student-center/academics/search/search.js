import React from "react";
import { Card, Flex, Box, Button } from "rebass";
import { Input, Label } from "@rebass/forms";
import Autocomplete from 'react-autocomplete';
import Page from "../../../page.js";
import { ShoppingNavBar } from '../../../nav/navbar.js'

import "./search.css";


class ClassResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
        this.addToCart = this.addToCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
    }

    addToCart() {
        if (!this.state.loading) {
            this.setState({
                loading: true
            });
        }
        const opts = {
            headers: {
              Authorization: localStorage.getItem("onyen"),
            },
            method: "POST",
            body: JSON.stringify({
                subject: this.props.classy.subject,
                number: this.props.classy.number,
                section: this.props.classy.section,

            })
          };
            fetch(
                "https://bkcyx6oezl.execute-api.us-east-1.amazonaws.com/academics/shopping_cart",
                opts
              )
                .then((response) => {
                    if (response.status === 400) {
                        throw Error("Class already in shopping cart");
                    }
                  return response.text();
                })
                .then((data) => {
                  data = JSON.parse(data);
                  this.props.classy.is_in_shopping_cart = true;
                  this.setState({
                    loading: false,
                  });
                })
                .catch ((error) => {
              alert(error);
              
            this.setState({
                loading: false,
                
              });
          });
          
    }

    removeFromCart() {
        if (!this.state.loading) {
            this.setState({
                loading: true
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

            })
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
                  this.props.classy.is_in_shopping_cart = false;
                  this.setState({
                    loading: false,
                  });
                })
                .catch ((error) => {
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
                        <Button style={{width: "100%"}} backgroundColor={(this.state.loading || classy.is_enrolled) ? "#4b4b4b" : classy.is_in_shopping_cart ? "red" : "#07c"} disabled={this.state.loading || classy.is_enrolled} onClick={classy.is_in_shopping_cart ? this.removeFromCart : this.addToCart} className="course-data">{classy.is_enrolled ? "Enrolled" : this.state.loading ? "..." : classy.is_in_shopping_cart ? "Remove From Cart"  : "Add to Cart"}</Button>
                      </Box>
                    </Flex>
        )
    }
}

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      subjects: [],
      subject: "",
      course: "",
      subjectCourses: [],
      results: [],
      shoppingCart: [],
      loading: true
    };

    this.changeSubject = this.changeSubject.bind(this);
    this.selectSubject = this.selectSubject.bind(this);
    this.changeCourse = this.changeCourse.bind(this);
    this.filterCourses = this.filterCourses.bind(this);
  }

  componentDidMount() {
    const opts = {
      headers: {
        Authorization: localStorage.getItem("onyen"),
      },
      method: "GET",
    };
    fetch(
      "https://bkcyx6oezl.execute-api.us-east-1.amazonaws.com/class",
      opts
    )
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        data = JSON.parse(data);
        this.setState({
          subjects: data,
        });
      });
  }

  async changeSubject(e) {
    e.preventDefault();
    if (e.target.value.length === 5) {
      return;
    }
    if (e.target.value.length === 4) {
        this.getCourses(e.target.value.toUpperCase());
    } else {
        this.setState({
            subject: e.target.value.toUpperCase()
        });
    }
    
  }

  async selectSubject(val) {
    this.getCourses(val.toUpperCase());    
  }

  getCourses(subject) {
    this.setState({
        subject: subject,
        loading: true
    });
    const opts = {
              headers: {
                Authorization: localStorage.getItem("onyen"),
              },
              method: "GET",
            };
            fetch(
              `https://bkcyx6oezl.execute-api.us-east-1.amazonaws.com/class/${subject}`,
              opts
            )
              .then((response) => {
                return response.text();
              })
              .then((data) => {
                data = JSON.parse(data);
                this.setState({
                  subjectCourses: data,
                  results: [...data],
                  loading: false,
                });
              });
  }

  filterCourses(courseNum) {
    
    const newResults = this.state.subjectCourses.filter((classy) => {
      const curr = classy.number.toString();
      courseNum = courseNum.toString();
      if (curr.length < courseNum.length) {
        return false;
      } else {
        for (let i = 0; i < courseNum.length; i++) {
          if (curr[i] !== courseNum[i]) {
            return false;
          }
        }
      }
      return true;
    });
    this.setState({
        results: [...newResults],
        course: courseNum
    });
}

  changeCourse(e) {
    e.preventDefault();
    const courseNum = e.target.value;
    if (courseNum.length === 4) {
        return;
      }
      if (parseInt(courseNum) < 0) {
        return;
      }
    if (parseInt(courseNum) > 1000) {
      return;
    }
    this.filterCourses(e.target.value);
  }

  

  render() {
    return (
      <div id="search">
          <ShoppingNavBar active="search" />
        <Flex flexWrap="wrap">
        <Box p={3} width={1 / 4}>
            <Label>Subject</Label>
            <div className="subject-form">
            <Autocomplete
        
        getItemValue={(item) => item.label}
        items={this.state.subjects.map(subj => ({label: subj}))}
        renderItem={(item, isHighlighted) =>
          <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
            {item.label}
          </div>
        }
        value={this.state.subject}
        onChange={this.changeSubject}
        onSelect={this.selectSubject}
      />
            </div>
        
          </Box>
          <Box p={3} width={3 / 4}>
            <Label>Course Number</Label>
            <Input
              disabled={this.state.loading}
              backgroundColor={this.state.loading ? "gray": "white"}
              onChange={this.changeCourse}
              value={this.state.course}
              type="number"
              placeholder="i.e. 500"
            />
          </Box>
          <Box p={3} width={1}>
            <Card style={{boxShadow: "1px 1px 2px #616161"}}>
              {!this.state.display ? null: this.state.results.length === 0 ? (
                <h3 style={{textAlign: "center"}}>No Results</h3>
              ) : (
                this.state.results.map((classy, index) => (
                  <div>
                    <ClassResult classy={classy} />
                    {index === this.state.results.length - 1 ? null : <hr />}
                  </div>
                ))
              )}
            </Card>
          </Box>
        </Flex>
      </div>
    );
  }
}

const Search = () => {
  return <Page active="academics" content={<Content />} />;
};

export default Search;
