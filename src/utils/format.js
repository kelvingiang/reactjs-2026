export const formatMoney = (num) => {
  if (!num) return '0';
  return Number(num).toLocaleString('en-US');
  // nếu thêm .00 sử dụng đoạn bên dưới
  // return Number(num).toLocaleString('en-US', { minimumFractionDigits: 2 });
};
