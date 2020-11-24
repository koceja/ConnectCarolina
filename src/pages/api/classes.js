import React, { useState } from "react";
import { Card, Button } from "rebass";
import { Label, Input } from "@rebass/forms";


const ClassMaker = () => {
  const [subject, setSubject ] = useState("");
  const [number, setNumber] = useState("");
  const [section, setSection] = useState("");
  const [room, setRoom] = useState("");
  const [professor, setProfessor] = useState("");
  const [meetingDays, setMeetingDays] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [capacity, setCapacity] = useState("");



  const handleCreate = (event) => {
    event.preventDefault();
    const opts = {
        headers: {
          Authorization: "tylery",
        },
        method: "POST",
        body: JSON.stringify({
          number: parseInt(number),
          section: parseInt(section),
          room: room,
          professor: professor,
          meeting_days: meetingDays,
          meeting_time: meetingTime,
          capacity: parseInt(capacity),
          students: []
        }),
      };
      fetch(
        `https://bkcyx6oezl.execute-api.us-east-1.amazonaws.com/class/${subject.toUpperCase()}`,
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
        })
        .catch((error) => {
          alert(error);
        });

  };


  const changeSubject = (event) => {
    setSubject(event.target.value);
  };

  const changeNumber = (event) => {
    setNumber(event.target.value);
  };

  const changeSection = (event) => {
    setSection(event.target.value);
  };

  const changeRoom = (event) => {
    setRoom(event.target.value);
  };

  const changeProfessor = (event) => {
    setProfessor(event.target.value);
  };

  const changeMeetingDays = (event) => {
    setMeetingDays(event.target.value);
  };

  const changeMeetingTime = (event) => {
    setMeetingTime(event.target.value);
  };

  const changeCapacity = (event) => {
    setCapacity(event.target.value);
  };


  return (
    <div id="login">
      <div className="login-container">
        <Card>
          <h1>Create Classes</h1>
          <form>
            <div className="form-input">
              <Label htmlFor="subject">subject</Label>
              <Input value={subject} onChange={changeSubject} type="text" />
            </div>
            <div className="form-input">
              <Label htmlFor="Password">number</Label>
              <Input
                value={number}
                onChange={changeNumber}
                type="number"
              />
            </div>
            <div className="form-input">
              <Label htmlFor="Password">section</Label>
              <Input
                value={section}
                onChange={changeSection}
                type="text"
              />
            </div>
            <div className="form-input">
              <Label htmlFor="Password">room</Label>
              <Input
                value={room}
                onChange={changeRoom}
                type="text"
              />
            </div>
            <div className="form-input">
              <Label htmlFor="Password">professor</Label>
              <Input
                value={professor}
                onChange={changeProfessor}
                type="text"
              />
            </div>
            <div className="form-input">
              <Label htmlFor="Password">meeting days</Label>
              <Input
                value={meetingDays}
                onChange={changeMeetingDays}
                type="text"
              />
            </div>
            <div className="form-input">
              <Label>meeting time</Label>
              <Input
                value={meetingTime}
                onChange={changeMeetingTime}
                type="text"
              />
            </div>
            <div className="form-input">
              <Label>capacity</Label>
              <Input
                value={capacity}
                onChange={changeCapacity}
                type="text"
              />
            </div>

            <br />
            <Button type="submit" onClick={handleCreate}>
              Create
            </Button>
            
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ClassMaker;
