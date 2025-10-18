import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";

const Home = () => {
  useUserAuth();
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 text-5xl mx-auto">home</div>
    </DashboardLayout>
  );
};

export default Home;
