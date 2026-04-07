import React, { useState, useEffect } from 'react';
import { getTrendingRooms } from '../../../api/room.api';

// Sub-components
import HeroSection from './components/HeroSection';
import TrendingSection from './components/TrendingSection';

const TenantDashboard = () => {
  const [trendingData, setTrendingData] = useState({
    rooms: [],
    total: 0,
    page: 1,
    totalPages: 1
  });

  const fetchTrending = async (page = 1) => {
    try {
      const res = await getTrendingRooms({ page, limit: 10 }); // Tăng limit lên 10 cho lưới 5 cột
      setTrendingData(res.data);
    } catch (err) {
      console.error("🟢 [TenantDashboard] Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchTrending(1);
  }, []);

  return (
    <div className="space-y-16 pb-20 animate-in fade-in duration-1000">
      
      {/* 1. Hero Ad Section */}
      <HeroSection />

      {/* 3. Featured/Trending Listings with Pagination */}
      <TrendingSection 
        rooms={trendingData.rooms} 
        page={trendingData.page}
        totalPages={trendingData.totalPages}
        onPageChange={(p) => fetchTrending(p)}
      />

    </div>
  );
};

export default TenantDashboard;
