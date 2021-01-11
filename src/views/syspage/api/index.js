import ajax from '@/utils/ajax'

export const getPageSelect = param => ajax.$get('admin/meunslist',param||{});

export const addMeunt = param =>ajax.$post('admin/addmeuns',param||{});