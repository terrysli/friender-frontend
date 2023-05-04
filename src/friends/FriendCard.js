import React, { useContext, useState } from "react";
import "./JobCard.css";
import UserContext from "../auth/UserContext";

/** Show limited information about a friend.
 *
 * Props:
 *  - {username, email, bio, photo, location}
 *
 * State:
 *
 * FriendList -> FriendCard
 */

function FriendCard({ username, email, bio, photo, location }) {
  console.debug("FriendCard");

  const { hasAppliedToJob, applyToJob } = useContext(UserContext);
  const [applied, setApplied] = useState();

  console.debug("FriendCard, username=", username);


  /** Apply for a job */
  async function handleApply(evt) {
    if (hasAppliedToJob(id)) return;
    applyToJob(id);
    setApplied(true);
  }

  return (
    <div className="FriendCard card">
      {" "}
      {applied}
      <div className="card-body">
        <h6 className="card-title">{title}</h6>
        <p>{companyName}</p>
        {salary && (
          <div>
            <small>
              Salary: {"$" + Intl.NumberFormat("en-US").format(salary)}
            </small>
          </div>
        )}
        {equity !== undefined && (
          <div>
            <small>Equity: {equity}</small>
          </div>
        )}
        <button
          className="btn btn-danger fw-bold text-uppercase float-end"
          onClick={handleApply}
          disabled={applied}
        >
          {applied ? "Applied" : "Apply"}
        </button>
      </div>
    </div>
  );
}


export default FriendCard;
