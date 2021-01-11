export default {
    namespaced: true,
    state: {
        moduleList:[] , //模块权限列表
        userInfo:null, //用户信息
        token:localStorage.getItem('token')
    },
    mutations: {
        setModuleList(state,data){
            state.moduleList = data
        },
        setUserInfo(state,data){
            state.userInfo = data
        },
        // setAuthorityLineStation(state,data){
        //     let lineInfo = data.line;
        //     let stationfo = data.station;
        //     let lineStationInfo = [];
        //     lineInfo.forEach(item => {
        //         lineStationInfo.push({
        //             id: item.lineId,
        //             lineStationName: item.lineName
        //         });
        //     });

        //     lineStationInfo.forEach(lineItem => {
        //         lineItem.children = [];
        //         stationfo.forEach(stationInfo => {
        //             if(lineItem.id == stationInfo.lineId){
        //                 lineItem.children.push({
        //                     id: stationInfo.stationId,
        //                     lineStationName: stationInfo.stationName
        //                 })
        //             }
        //         })
        //     })

        //     // console.log(lineStationInfo);
        //     state.authorityLineStationInfo = lineStationInfo;
        // },
        setLike(state,data){
            state.like = data
        },
        setLock(state,data){
            state.like.isLock = data
        }
    },
  }