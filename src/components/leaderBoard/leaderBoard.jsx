import React, { useState, useEffect, useRef } from "react";
import "./leaderBoard.css";
import axios from "axios";

const LIMIT = 5;

const LeaderBoard = () => {
  const [users, setUsers] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [userIdFilter, setUserIdFilter] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const debounceTimeout = useRef(null);

  const fetchData = async (reset = false) => {
    try {
      const currentOffset = reset ? 0 : offset;
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/v1/activity/leaderboard?limit=${LIMIT}&offset=${currentOffset}&filter=${activeFilter}&search=${userIdFilter}`
      );
      const data = response?.data?.data?.data || [];

      if (reset) {
        setUsers(data);
        setFilteredUsers(data);
        setOffset(LIMIT);
      } else {
        const updatedUsers = [...users, ...data];
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        setOffset(currentOffset + LIMIT);
      }

      // Disable "Load More" if fewer results returned than limit
      if (data.length < LIMIT) setHasMore(false);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  };

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      fetchData(true); // reset = true
    }, 500);

    return () => clearTimeout(debounceTimeout.current);
  }, [userIdFilter, activeFilter, refreshData]);

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
  };

  return (
    <div className="leaderboard-container">
      <button
        className="recalculate-btn"
        onClick={() => {
          setRefreshData(!refreshData);
          setHasMore(true);
          setOffset(0);
        }}
      >
        Recalculate
      </button>

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
                  onClick={() => {
                    setHasMore(true);
                    setOffset(0);
                    handleTimeFilter(option);
                  }}
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

      {hasMore && (
        <button className="load-more-btn" onClick={() => fetchData(false)}>
          Load More
        </button>
      )}
    </div>
  );
};

export default LeaderBoard;
