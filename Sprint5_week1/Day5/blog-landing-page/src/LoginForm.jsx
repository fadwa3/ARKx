import React, { useState } from "react";

function LoginForm({ users,setTrackLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    //* stop the page from refreshing after the submit
    e.preventDefault();
    //* check the user
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      setTrackLogin(true);
      alert("hello you Loged in successfully !");
    } else {
      alert("oops Invalid email or password");
    }
    //* reset the state variables to clean the form
    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
export default LoginForm;
