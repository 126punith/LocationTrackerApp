export const getDateHandler = (timeStamp: number) => {
  const todate = new Date(timeStamp).getDate();
  const tomonth = new Date(timeStamp).getMonth() + 1;
  const toyear = new Date(timeStamp).getFullYear();
  const original_date = tomonth + '/' + todate + '/' + toyear;
  console.log(original_date);
};

export const getTimeHandler = (timeStamp: number) => {
  const todate = new Date(timeStamp).toLocaleString();
  console.log(todate);

  return todate;
};
