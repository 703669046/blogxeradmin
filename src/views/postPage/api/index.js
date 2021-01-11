import ajax from '@/utils/ajax'

export const getPageSelect = param => ajax.$get('admin/postlist',param||{});

export const getPostInfo = id =>ajax.$get(`admin/postinfo/${id}`)

export const approvalData =param =>ajax.$post('admin/approval',param||{})

export const addMeunt = param =>ajax.$post('admin/addmeuns',param||{});