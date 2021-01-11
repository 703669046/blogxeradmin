
/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

//匹配邮箱
export function validateEmail(email) {  
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

//匹配手机号
export function validatePhone(phone){
  const reg = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/
  return reg.test(Number(phone))
}

//匹配身份证
export function validateregIdNo(str){
  const reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dX]$/
  return reg.test(str)
}
//裁剪时间格式
export function timeTailor(str){
  return str.slice(0,10)
}

//blob转base64
export function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      resolve(e.target.result);
    };
    // readAsDataURL
    fileReader.readAsDataURL(blob);
    fileReader.onerror = () => {
      reject(new Error('blobToBase64 error'));
    };
  });
}

//下载文件
export function downloadFile(data,fileName){
  let blob = new Blob([data], {
      type: 'application/vnd.ms-excel'
  });
  let objectUrl = URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = objectUrl;
  a.setAttribute('download',fileName);
  document.body.appendChild(a);
  a.click();
}


export class HolidayFind {
  constructor(){
    this.data = [
      {name:'元旦',month:1,day:1},
      {name:'情人节',month:2,day:14},
      {name:'妇女节',month:3,day:8},
      {name:'国际消费者权益日 ',month:3,day:15},
      {name:'劳动节',month:5,day:1},
      {name:'青年节',month:5,day:4},
      {name:'儿童节',month:6,day:1},
      {name:'土地日',month:6,day:25},
      {name:'劳动节',month:5,day:1},
      {name:'国庆节',month:10,day:1},
      {name:'青年节',month:11,day:10},
      {name:'平安夜',month:12,day:24},
      {name:'圣诞节',month:12,day:25},
    ]
  }
  /** 
  * 获取节日
  *  @param {*} m //月份
  *  @param {*} d //月日
  **/
  getHoliday(m,d){
    let _holidayData = this.data.find(i => i.month === m && i.day === d)
    return _holidayData ? _holidayData : ''
  }
}
 /** 
  * 获取节日
  * @param {*} Initial //初始数组
  * @param {*} Finally //最终数组
  * @param {*} Flags  //对比数组对象key
  * @param {*} type  //是否是数组对象
**/
export function diffArrFunc(Initial,Finally,Flags,type){
  let addArr = []; 
  let delArr = []; 
  let InitialArr = type === true? Initial.map( item =>{ return item[Flags] }):Initial; 
  let FinallyArr = type === true? Finally.map( item =>{ return item[Flags] }):Finally;  
  FinallyArr.forEach( item => { if(!InitialArr.includes(item)){ addArr.push(item) }})
  InitialArr.forEach( item => { if(!FinallyArr.includes(item)){ delArr.push(item) }})
  return { addArr,delArr }
}

/** 
  * 校验参数
  * @param {data}
  * @param {*} str //校验key
  * @param {*} message //错误文本信息
  * @param {*} rule  //正则表达式
**/
export function paramsCheck(data){
  let arr = data;
  for(let i = 0; i < arr.length; i++){
      let item = arr[i];
      if(item.str == null || item.str == undefined){item.str = ''};
      if(!new RegExp(item.rule).test(item.str)){
          return item.message;
      };
  };
  return '';
};
/** 
  * 树形数据通过子级信息查找所有父级
  * @param {Array} data //源数据
  * @param {string | number} id //初始子数据的值
  * @param {string} key //对比的key
  * @param {string} pid //查找父元素key
  * @param {string} children //包裹子级的key
**/
export function allFather(
  data,
  id,
  idkey='id',
  pidkey='pid', 
  childkey='children',
  itemkey = 'id'
) {
  if(!Array.isArray(data)){
    throw  new Error('源数据应该是一个数组对象的树形结构数据');
  }
  let a = 0;
  let result = [];
  let find = (arr, id)=>{
    for (let i = 0; i < arr.length; i++) {
		a++;
      let item = arr[i];
      if (item[idkey] === id) {
        result.push(item[itemkey]);
        find(data,item[pidkey])
        break;
      } else {
        if (item[childkey] && item[childkey].length) {
          find(item[childkey], id)
        }
      }
    }
  }
  find(data,id);
  console.log(a)
  return result.reverse();
}

export function pageShow(activeName,isData) {this.$EventBus.$emit('switchPage',{activeName,isData})}