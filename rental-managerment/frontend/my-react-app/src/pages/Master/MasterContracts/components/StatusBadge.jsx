import React from 'react';

const StatusBadge = ({ status }) => {
  const statusMap = {
    pending: { text: 'Chờ duyệt', class: 'badge-pending' },
    active: { text: 'Đang hiệu lực', class: 'badge-active' },
    decline: { text: 'Đã từ chối', class: 'badge-decline' },
    cancelled: { text: 'Đã hủy', class: 'badge-cancelled' },
    expired: { text: 'Hết hạn', class: 'badge-expired' },
  };
  
  const config = statusMap[status] || { text: status, class: '' };
  
  return <span className={`contract-badge ${config.class}`}>{config.text}</span>;
};

export default StatusBadge;
