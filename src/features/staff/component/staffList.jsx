import React from 'react';
import StaffItem from './staffItem';

StaffList.propTypes = {};

function StaffList({ dataList }) {
  return (
    <div className="staff-data">
      <div className="staff-item header-row">
        <div className="item-title">Name</div>
        <div className="item-user">User</div>
        <div className="item-password">Password</div>
        <div className="item-phone">Phone</div>
        <div className="item-email">E-mail</div>
        <div className="item-img">Img</div>
      </div>
      {dataList.map((item) => (
        <StaffItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default StaffList;
