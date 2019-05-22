const basePath = 'http://wx110.heqifuhou.com/api/';
const urlList = {
  //获取用户信息
  getUserInfoUrl: basePath + 'User/login',//token
  getSmsCodeUrl: basePath + 'User/get_code',
  checkSmsCodeUrl: basePath + 'User/bind_mobile',
  certificationUrl: basePath + 'User/certification'
}
module.exports = urlList;