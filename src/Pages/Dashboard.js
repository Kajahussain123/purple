import { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { ordersCount, usersCount, vendorsCount } from "../Services/allApi";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [totalVendors, setTotalVendors] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await ordersCount();
        if (response?.data) {
          setTotalOrders(response.data.count);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await vendorsCount();
        if (response?.data) {
          setTotalVendors(response.data.count);
        }
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await usersCount();
        if (response?.data) {
          setTotalUsers(response.data.total_users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Chart Data
  const barData = {
    labels: ["Vendors", "Orders", "Users"],
    datasets: [
      {
        label: "Statistics",
        data: [totalVendors, totalOrders, totalUsers],
        backgroundColor: ["#2196F3", "#4CAF50", "#FF9800"],
        borderRadius: 5,
      },
    ],
  };

  // Chart Options
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  // Card Data
  const cards = [
    { title: "Total Vendors", count: totalVendors, bgColor: "#2196F3" },
    { title: "Total Orders", count: totalOrders, bgColor: "#4CAF50" },
    { title: "Total Users", count: totalUsers, bgColor: "#FF9800" },
  ];

  return (
    <div style={{ padding: "24px", overflow: "hidden" }}>
      {/* Dashboard Cards */}
      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card
              sx={{
                background: `linear-gradient(135deg, ${card.bgColor} 30%, ${card.bgColor}99 100%)`,
                color: "white",
                boxShadow: 3,
                borderRadius: 3,
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" fontWeight={600}>
                  {card.title}
                </Typography>
                <Typography variant="h4" fontWeight={700}>
                  {card.count}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Graph Section */}
      <div style={{ marginTop: "30px", maxHeight: "350px" }}>
        <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600}>
              User Statistics
            </Typography>
            <div style={{ height: "300px" }}>
              <Bar data={barData} options={barOptions} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
