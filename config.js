const basePath = 'http://wx110.heqifuhou.com/api/';
const urlList = {
  //获取用户信息
  getUserInfoUrl: basePath + 'User/login',//token
  getSmsCodeUrl: basePath + 'User/get_code',
  checkSmsCodeUrl: basePath + 'User/bind_mobile',
  certificationUrl: basePath + 'User/certification',
  uploadFileUrl: basePath + 'Eventreport/upload',
  submitReportUrl: basePath + 'Eventreport/createjs',
  getAlarmRecordsUrl: basePath + 'Alarmcall/get_record',
  createConnectionUrl: basePath + 'Alarmcall/create_connection',
  getConnectionRoomUrl: basePath + 'Alarmcall/get_room'
}
module.exports = urlList;