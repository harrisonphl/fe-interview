import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../constants";

const ViewUser = () => {
  const [user, setUser] = useState(null);

  const { id } = useParams();


  useEffect(() => {
    fetch(`${API_URL}/api/user?userId=${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then(setUser);
  }, [id]);

  if (user == null) {
    return <div>"loading"</div>;
  }

  return (
    <div>
      <h1>View User</h1>
      <ul>
        <li>Email: {user.email}</li>
        <li>
          Name: {user.first} {user.last}
        </li>
        <li>Company: {user.company}</li>
        <li>Country: {user.country}</li>
      </ul>
    </div>
  );
};

export { ViewUser };