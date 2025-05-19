import React, { useState, useEffect, useRef } from "react";
import "./leaderBoard.css";
import axios from "axios"; // assuming you use axios for API calls

const LeaderBoard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [userIdFilter, setUserIdFilter] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const debounceTimeout = useRef(null);

  useEffect(() => {
    // Clear previous timeout if filter changes before timeout ends
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    // Set new debounce timer
    debounceTimeout.current = setTimeout(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${
              import.meta.env.VITE_BASE_URL
            }/api/v1/activity/leaderboard?limit=10&offset=0&filter=${activeFilter}&search=${userIdFilter}`
          );
          const data = response?.data?.data?.data || [];
          setUsers(data);
          setFilteredUsers(data);
        } catch (error) {
          console.error("Error fetching leaderboard data:", error);
        }
      };

      fetchData();
    }, 500); // 500ms debounce delay, adjust as needed

    // Cleanup on unmount or before next effect run
    return () => clearTimeout(debounceTimeout.current);
  }, [userIdFilter, activeFilter]);

  const handleUserIdFilter = () => {
    const id = parseInt(userIdFilter);
    if (!isNaN(id)) {
      const filtered = users.filter((user) => user.id === id);
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  };

  const handleTimeFilter = (filter) => {
    setActiveFilter(filter);

    // Example: you may want to call API with time filter or filter locally
    // Here we're just simulating local filtering
    const filtered = users.filter((user) => {
      if (filter === "Day") return user.points >= 990;
      if (filter === "Month") return user.points >= 995;
      if (filter === "Year") return user.points >= 998;
      return true;
    });

    setFilteredUsers(filtered);
  };

  return (
    <div className="leaderboard-container">
      <button className="recalculate-btn">Recalculate</button>

      <div className="filter-controls">
        <div className="filter-search">
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            id="userId"
            placeholder="1"
            value={userIdFilter}
            onChange={(e) => setUserIdFilter(e.target.value)}
          />
          <button className="filter-btn" onClick={handleUserIdFilter}>
            Filter
          </button>
        </div>
        <div className="filter-search">
          <div className="dropdown">
            <div className="filter-options">
              {["Day", "Month", "Year"].map((option) => (
                <button
                  key={option}
                  className={`filter-option ${
                    activeFilter === option ? "active" : ""
                  }`}
                  onClick={() => handleTimeFilter(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Points</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr
              key={user.user_id}
              className={`user-row ${user.id === 1 ? "highlight" : ""}`}
            >
              <td>{user.user_id}</td>
              <td>{user.full_name}</td>
              <td>{user.totalPoints}</td>
              <td>#{user.rank}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;
