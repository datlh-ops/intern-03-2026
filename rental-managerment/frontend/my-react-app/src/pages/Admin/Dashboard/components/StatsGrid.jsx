import React from "react";
import StatCard from "./StatCard";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import KeyIcon from '@mui/icons-material/Key';
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

const StatsGrid = React.memo(({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      <StatCard title="Tổng phòng" value={stats.totalRooms} icon={MeetingRoomIcon} color="blue" />
      <StatCard title="Phòng đã thuê" value={stats.rentedRooms} icon={KeyIcon} color="rose" />
      <StatCard title="Khách thuê" value={stats.totalUsers} icon={PeopleIcon} color="emerald" />
      <StatCard title="Hợp đồng active" value={stats.activeContracts} icon={DescriptionIcon} color="purple" />
      <StatCard title="Tổng chủ trọ" value={stats.totalMasters} icon={SupervisorAccountIcon} color="amber" />
    </div>
  );
});

export default StatsGrid;