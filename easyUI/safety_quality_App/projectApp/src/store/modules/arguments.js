const argument = {
    state: {
        updateTip: true,     //提示版本更新
        dangerItems: {},     // 隐患条目
        filterData:{},       // 筛选条件
    },
    mutations: {
        changeUpdateTip: (state, updateTip) => {
            state.updateTip = updateTip
        },
        getDangerItems: (state, data) => {
            state.dangerItems = data
        },
        getFilterData:(state,data)=>{
            state.filterData = data
        }
    },
}
export default argument