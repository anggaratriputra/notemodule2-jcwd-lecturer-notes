import { useEffect, useState } from "react";
import axios from "axios";

function FollowerList() {
  const [followers, setFollowers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFollowers();
  }, []);

  const fetchFollowers = async () => {
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setFollowers(data);
    } catch (error) {
      setError("Error fetching followers");
    }
  };

  return (
    <div>
      {followers.map((follower, index) => (
        <h1 key={follower.id} data-testid={`follower-item-${index}`}>
          {follower.name}
        </h1>
      ))}
      {error && <p>{error}</p>}
    </div>
  );
}

export default FollowerList;
