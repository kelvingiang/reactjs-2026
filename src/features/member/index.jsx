import { Button } from '@mui/material';   // ⬅ MUI v5 正確來源
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';   // ⬅ v6 正確 Hooks
import MemberList from './components/memberlist/memberlist';
import '../../styles/main.css';

MemberFeature.propTypes = {};

function MemberFeature() {
  const initlist = [
    { id: 1, name: 'tran van hung', phone: '023658779', status: 'best' },
    { id: 2, name: 'ly van tung', phone: '12132132', status: 'bad' },
    { id: 3, name: 'nguyen thi giau', phone: '023658779', status: 'good' },
    { id: 4, name: 'luong hieu my', phone: '02154654', status: 'best' },
    { id: 5, name: 'tran thien nhan', phone: '045465656', status: 'best' },
    { id: 6, name: 'do thi thanh ', phone: '456456645', status: 'good' },
    { id: 7, name: 'lam van tung', phone: '12132132', status: 'bad' },
    { id: 8, name: 'ung van hung', phone: '088888849', status: 'good' },
    { id: 9, name: 'tran thi manh', phone: '09899898989', status: 'best' },
    { id: 10, name: 'la thanh thanh', phone: '08989888555', status: 'best' },
  ];

  const location = useLocation();
  const navigate = useNavigate();   // ⬅ useHistory 改用這個

  const [memberList] = useState(initlist);
  const [filterList, setFilterList] = useState(() => {
    const params = queryString.parse(location.search);
    return params.status || "all";
  });

  useEffect(() => {
    const params = queryString.parse(location.search);
    setFilterList(params.status || "all");
  }, [location.search]);

  // 通用更新 Query function
  const updateStatus = (status) => {
    navigate(`?status=${status}`);
  };

  const renderMemberList = memberList.filter(
    member => filterList === 'all' || filterList === member.status
  );

  return (
    <div>
      <div className='member_button'>
        <button className="btn btn-primary" onClick={() => updateStatus('all')}>Show All</button>
        <button className="btn btn-secondary" onClick={() => updateStatus('best')}>Show Best</button>
        <button className="btn btn-success" onClick={() => updateStatus('good')}>Show Good</button>
        <button className="btn btn-warning" onClick={() => updateStatus('bad')}>Show Bad</button>

        {/* MUI v5 Button 正常可用 */}
        <Button variant="contained" sx={{ ml:1 }}>MUI Button</Button>
        <Button variant="outlined" sx={{ ml:1 }}>Outlined</Button>
      </div>

      <hr />

      <div className="member_space">
        <MemberList memberList={renderMemberList} />
      </div>
    </div>
  );
}

export default MemberFeature;

