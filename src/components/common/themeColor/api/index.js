import ajax from '@/utils/ajax';
// 获取
export const obtainAPI = params => ajax.$get('/sys/preference/findCurrentUserPreference', params || {});

// 更改
export const findAPI = params => ajax.$post('/sys/preference/updatedCurrentUserPreference', params || {});

// 解锁
export const passwordAPI = params => ajax.$get('/sys/preference/updatedCurrentUserLock', params || {});


