import React from 'react';
import MemberItem from '../member_item/member_item';

MemberList.propTypes = {};


function MemberList({ memberList  = [] }) {
  return (
    <div className='member_list'>
      <div className="member_item member_head">
        <div>name</div>
        <div>phone</div>
        <div>status</div>
      </div>
      {memberList.map((item) => (
          <MemberItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default MemberList;
