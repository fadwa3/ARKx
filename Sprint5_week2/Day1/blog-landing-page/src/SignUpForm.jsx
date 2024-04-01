import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpForm({ users, setUsers }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    //* stop the page from refreshing after the submit
    e.preventDefault();
    //*check new user
    const user = users.find(
      (user) => user.email === email || user.username === username
    );
    if (!user) {
      //* create new user
      const newUser = {
        email,
        username,
        password,
      };

      setUsers([...users, newUser]);
      // alert("welcome u Signed up successfully!");
      navigate("/login");
    } else {
      alert("oops already used  email or username try another one");
    }

    //* reset the state variables to clean the form
    setEmail("");
    setUsername("");
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
        <label>UserName</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
export default SignUpForm;
