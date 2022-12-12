import React from "react";

export default function Login() {
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const onChangeSetUserName = (e) => {
    setUserName(e.target.value);
  };

  const onChangeSetPassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <h2 className="loginDisplay"> Please log in :</h2>
      <form>
        <label>
          <p>
            <strong>Username : </strong>
          </p>{" "}
          <input type="text" onChange={onChangeSetUserName} />
        </label>
        <label>
          <p>
            <strong>Password : </strong>
          </p>{" "}
          <input type="password" onChange={onChangeSetPassword} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}
