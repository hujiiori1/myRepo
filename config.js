//const basePath = 'https://wx110.xchs.com/api/';
const basePath = 'https://wx110.xk-health.com/api/';
const urlList = {
  //获取用户信息
  getUserInfoUrl: basePath + 'User/login',//token
  getSmsCodeUrl: basePath + 'User/get_code',
  checkSmsCodeUrl: basePath + 'User/bind_mobile',
  certificationUrl: basePath + 'User/certification',
  uploadFileUrl: basePath + 'Eventreport/upload',
  submitReportUrl: basePath + 'Eventreport/createjs',
  getReportListUrl: basePath + 'Eventreport/get_list',
  getAlarmRecordsUrl: basePath + 'Alarmcall/get_request_list',
  createConnectionUrl: basePath + 'Alarmcall/create_connection',
  getConnectionRoomUrl: basePath + 'Alarmcall/get_room',
  changeStatusAlarmUrl: basePath + 'Alarmcall/change_status',
  GetNewscarouselUrl: basePath + 'News/get_carousel',
  GetNewsListUrl: basePath + 'News/get_list',
  GetAddressListUrl: basePath + 'Address/get_list',
  GetMapAllData: basePath +'Location/get_all_data'
}
module.exports = urlList;