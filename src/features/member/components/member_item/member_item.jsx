import React from 'react';

MemberItem.propTypes = {};

function MemberItem({ item }) {
  return (
    <div className="member_item">
      <div>{item.name}</div>
      <div>{item.phone}</div>
      <div>{item.status}</div>
    </div>
  );
}

export default MemberItem;
