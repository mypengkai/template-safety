// 缓存
const getters={
    dangerItems:state=>state.argument.dangerItems,
    filterData:state=>state.argument.filterData,
    CheckPerson:state=>state.argument.CheckPerson,
    notifier:notifier=>notifier.argument.notifier
}
export default getters