import React from "react";
import Notes from "./Notes";

const Home = () => {

  return (
    <div className="container">
      <h1>Add a Note</h1>
      <form action="" className="my-3">
      <div className="mb-3">
        <label htmlFor="titleinput" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Example textarea
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
      </div>
      </form>
      <Notes></Notes>
      
    </div>
  );
};

export default Home;
