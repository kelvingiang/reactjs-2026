import React, { useEffect, useState } from 'react';
import staffApi from '../../api/staffApi';
import StaffList from './component/staffList';


StaffsFeature.propTypes = {};

function StaffsFeature(props) {
  const [dataList, setDataList] = useState([]);


  useEffect(() => {
  const fetchStaffs = async () => {
    const params = { _limit: 10 };
    
    const memberList = await staffApi.getAll(params);
    setDataList(memberList.data.data || []); // ← 取出陣列才行！
    
    // console.log("API 回傳：", productList);
  };
  fetchStaffs();
}, []);

  return (
    <div>
      <h1>Staff List</h1>
      <div>
        <StaffList dataList={dataList} />
      </div>
    </div>
  );
}

export default StaffsFeature;
