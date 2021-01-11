import ajax from '@/utils/ajax';
//获取当前登陆用户指定线路中可以查看的站以及各个站可以管理的岗位类型
export const getSiteList = params => ajax.$get('/sys/lineStandRightCompetency/findCurrentStation',params || {});
//获取当前线所有站
export const getAllSiteList = params => ajax.$get('/sys/lineStand/selectStationList',params || {});
