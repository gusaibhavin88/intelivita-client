import React, { useEffect } from "react";
import { getUserProfile } from "../../api/userRequest";

const Home = () => {
  const getProfile = async () => {
    await getUserProfile();
  };
  useEffect(() => {
    getProfile();
  }, []);

  return <div>Home</div>;
};

export default Home;
