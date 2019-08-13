const argument = {
    state: {
        updateTip: true,     //提示版本更新
        dangerItems: {},     // 隐患条目
    },
    mutations: {
        changeUpdateTip: (state, updateTip) => {
            state.updateTip = updateTip
        },
        getDangerItems: (state, data) => {
            state.dangerItems = data
        }
    },
}
export default argument