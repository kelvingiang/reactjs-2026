import React, { useEffect, useState, useRef } from 'react';
import staffApi from '../../api/staffApi';
import StaffList from './component/staffList';

StaffsFeature.propTypes = {};

function StaffsFeature(props) {
  const [dataList, setDataList] = useState([]);
  const [error, setError] = useState(null); //………
  const [loading, setLoading] = useState(false); // 👈 加入這一行
  const isFetching = useRef(false); // chăn thông báo alert 2 lần

  useEffect(() => {
    if (isFetching.current) return;
    isFetching.current = true;
    const fetchStaffs = async () => {
      setError(null); // 👈 2. 每次請求前先清除之前的錯誤
      setLoading(true); // 👈 開始載入
      try {
        const res = await staffApi.getAll();
        console.log('API 原始回傳:', res.data);
        // setDataList(list.data.data || []); // ← 取出陣列才行！
        if (res.data && Array.isArray(res.data.data)) {
          setDataList(res.data.data);
        } else {
          // 預防萬一，如果結構不如預期
          setDataList(res.data || []);
        }
      } catch (error) {
        console.error('抓取產品資料失敗:', error);
        setError('連線失敗，請稍後再試'); // 👈 3. 設定錯誤訊息內容
        setDataList([]);
      } finally {
        setLoading(false); // 👈 結束載入
        // 5. 請求徹底結束才解鎖
        isFetching.current = false;
      }
    };
    fetchStaffs();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loading">載入中...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div>
          <h1>Staff List</h1>
          <StaffList dataList={dataList} />
        </div>
      )}
    </div>
  );
}

export default StaffsFeature;
