// 缓存
const getters={
    dangerItems:state=>state.argument.dangerItems,
    filterData:state=>state.argument.filterData,
    CheckPerson:state=>state.argument.CheckPerson,
    notifier:state=>state.argument.notifier,
    userinfo:state=>state.argument.userinfo,
    CheckDepart:state=>state.argument.CheckDepart,
    projectId: state=>state.argument.projectId,
    projectName:state=>state.argument.projectName,
    InspectionPropertyId:state=>state.argument.InspectionPropertyId,
    InspectionPropertyName:state=>state.argument.InspectionPropertyName,
    ContentId:state=>state.argument.ContentId,
    Contentname:state=>state.argument.Contentname,
    PlanDetail:state=>state.argument.PlanDetail,
    PlanDanger:state=>state.argument.PlanDanger,
    // ZGren:state=>state.argument.ZGren
  
}
export default getters