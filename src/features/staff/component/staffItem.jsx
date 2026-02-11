import React from 'react';

StaffItem.propTypes = {};

function StaffItem({ item }) {
  return (
    <div className='staff-item'>
      <div className='item-title'>{item.title}</div>
      <div className='item-user'>{item.meta._metabox_member_user}</div>
      {/* <div className='item-password'>{item.meta._metabox_member_password}</div> */}
      <div className='item-phone'>{item.meta._metabox_member_phone}</div>
      <div className='item-email'>{item.meta._metabox_member_email}</div>
      <div className='item-img'><img src={item.img} alt={item.name} /></div>
    </div>
  );
}

export default StaffItem;
