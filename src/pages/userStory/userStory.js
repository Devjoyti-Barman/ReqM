import React, { useState, useContext } from "react";
import "./style.css";
import Modal from "react-modal";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

import { UserContext } from "./../../context/userContext/userContext";

export default function Userstory() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useContext(UserContext).user;
  const [id, setID] = useState();
  const [priority, setPriority] = useState("Low");
  const [formData, setFormData] = useState({
    title: "",
    role: "",
    want: "",
    soThat: "",
    assignTo: "",
    details: "",
    watchlist: "",
    providedBy: "",
    mode: "",
  });
  const [story, setStory] = useState(1);
  const {
    title,
    role,
    want,
    soThat,
    assignTo,
    details,
    watchlist,
    providedBy,
    mode,
  } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  let projectID = useParams().projectID;
  const onSubmit = async (e) => {
    e.preventDefault();
    let api = "http://localhost:3001/api/story/add-story";
    let story_Details = {
      story_title: title,
      as_a: role,
      action_requirement: want,
      action_output: soThat,
      action_assigned_to: assignTo,
      action_provided_by: providedBy,
      action_received_mode: mode,
      priority: priority,
      details: details,
    };

    //validation
    //console.log(story_Details);
    const data = {
      project_id: projectID,
      story_details: story_Details,
    };
    try {
      let p = await axios.post(api, data, {
        headers: {
          authtoken: `${user}`,
        },
      });
      setOpen(true);
      setID(p.data.story);
      //console.log(p.data.story);
      // /console.log(message);
    } catch (e) {
      window.alert("Something went Wrong");
    }
  };
  let history = useHistory();
  const PushViewSumeery = () => {
    let path = history.location.pathname.split("addreq")[0];
    path += "viewall/" + id;
    history.push(path);
    //console.log(id);
  };

  let className1 = "story_1";
  let className2 = "story_2";
  //console.log(story);
  if (story === 1) {
    className1 += " " + "active";
    className2 += " " + "nonactive";
  } else {
    className1 += " nonactive";
    className2 += " active";
  }

  return (
    <div className="userStory__container">
      <Modal isOpen={open} className="viewSummery__modal">
        <div className="viewSummery">
          <p>Requirement Title has been succesfully captured !!</p>
          <Button variant="outlined" color="primary" onClick={PushViewSumeery}>
            View Summary
          </Button>
        </div>
      </Modal>
      <div className={className1}>
        <div>
          <form className="form">
            <div className="container has-box">
              <div className="form-group">
                <h2>User Story role</h2>
                <b>Story Title</b>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => onChange(e)}
                  className="inpt-box"
                />
              </div>
              <div className="form-group">
                <b>As a</b>
                <input
                  type="text"
                  name="role"
                  value={role}
                  onChange={(e) => onChange(e)}
                  className="inpt-box"
                />
              </div>
            </div>
            <div className="container has-box">
              <div className="form-group">
                <h2>Action to Be Done</h2>
                <b>I Want To</b>
                <input
                  type="text"
                  name="want"
                  value={want}
                  onChange={(e) => onChange(e)}
                  className="inpt-box"
                />
              </div>
              <div className="form-group">
                <b>So That</b>
                <input
                  type="text"
                  name="soThat"
                  value={soThat}
                  onChange={(e) => onChange(e)}
                  className="inpt-box"
                />
              </div>
            </div>
            <div className="container">
              <div className="btn btn-primary " onClick={() => setStory(2)}>
                Next
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className={className2}>
        <div>
          <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="container has-box">
              <div className="form-group">
                <b>Assign To</b>
                <input
                  type="text"
                  name="assignTo"
                  value={assignTo}
                  onChange={(e) => onChange(e)}
                  className="inpt-box"
                  required
                />
              </div>
              <div className="form-group">
                <b>Additional Details</b>
                <input
                  type="text"
                  name="details"
                  value={details}
                  onChange={(e) => onChange(e)}
                  className="inpt-box"
                  required
                />
              </div>
              <input type="checkbox" name="watchlist" value={watchlist} />
              <span> Add to watchlist </span>
            </div>
            <div className="container has-box">
              <div className="form-group">
                <b>Provide By</b>
                <input
                  type="text"
                  name="providedBy"
                  value={providedBy}
                  onChange={(e) => onChange(e)}
                  required
                  className="inpt-box"
                />
              </div>
              <div className="form-group">
                <b>Mode</b>
                <input
                  type="text"
                  name="mode"
                  value={mode}
                  onChange={(e) => onChange(e)}
                  required
                  className="inpt-box"
                />
                <br></br>
                <div>
                  <b>Priority</b>
                  <input
                    type="radio"
                    name="priority"
                    onClick={() => setPriority("High")}
                  />
                  <b>High</b>
                  <input
                    type="radio"
                    name="priority"
                    onClick={() => setPriority("Medium")}
                  />
                  <b>Medium</b>
                  <input
                    type="radio"
                    name="priority"
                    onClick={() => setPriority("Low")}
                  />
                  <b>Low</b>
                </div>
              </div>
            </div>
            <div className="container">
              <button className="btn btn-primary" onClick={onSubmit}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
