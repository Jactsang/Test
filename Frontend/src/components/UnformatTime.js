function unFormatTime(timeStamp){
    let hms = timeStamp.toString().split(':'),
      s = 0, m = 1;
    while (hms.length > 0) {
      s += m*parseInt(hms.pop(), 10);
      m *= 60;
    }
    s = s.toFixed(1)
    return s;
  };

  export default unFormatTime;