let host; 
const base = '';
// 开发环境
if(process.env.NODE_ENV === 'development'){
    host = ''
}else{
    // 生产环境
    host = 'http://localhost:76'
}
module.exports = {
    host,base
}
