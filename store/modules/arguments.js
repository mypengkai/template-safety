const argument={
     state:{
         dangerItems:{},     // 隐患条目
     },
     mutations:{
         getDangerItems:(state,data)=>{
              state.dangerItems = data
         }
     },
    //  actions: {
    //     setDangerItems:({commit},data)=>{
    //         commit('getDangerItems',data)
    //     },
    // }
}
export default argument