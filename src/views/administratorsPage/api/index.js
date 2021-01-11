import ajax from '@/utils/ajax'

export const getPageSelect = param => ajax.$post('admin/adminList',param||{});

export const addMeunt = param =>ajax.$post('admin/addmeuns',param||{});