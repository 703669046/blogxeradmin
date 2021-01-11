import ajax from '@/utils/ajax'
//根据规则id查询项目
export const getProjectByRegulations = params => ajax.$get('/tbu/regulation/getProjectByRegulationsId', params || {});
// 删除项目
export const deleteProjects = params => ajax.$get('/tbu/regulation/deleteTbuRegulationsProjects', params || {});