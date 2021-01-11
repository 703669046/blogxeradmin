import ajax from '@/utils/ajax';
//登陆
export const login = param => ajax.$post('admin/login', param);
//修改密码
export const updatePass = (id,param) => ajax.$get();
//退出登陆
export const logout = () => ajax.$get('admin/logout');
//验证码对比
export const codeRuselu = (result,uuid) => ajax.$get();
//用户信息
export const userInfo = () => ajax.$get();
//用户菜单栏
export const getUserMenu = id => ajax.$get();
//  删除图片
export const deleteImgAPI = params => ajax.$post();
//  获取当前登陆用户指定线路中可以查看的站以及各个站可以管理的岗位类型
export const authorityStation = params => ajax.$get();



export const getLoginCode =param=>ajax.$get('/admin/captcha',param || {});

