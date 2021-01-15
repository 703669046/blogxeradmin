import ajax from '@/utils/ajax'

export const getPageSelect = param => ajax.$get('index/meunslist',param||{});

export const addMeunt = param =>ajax.$post('index/addmeuns',param||{});


export const updatMeunList = param =>ajax.$post('index/updatemeuns',param||{})


export const deleteMeunList = param =>ajax.$post(`index/deletemeuns`,param||{})