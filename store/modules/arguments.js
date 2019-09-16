const argument = {
    state: {
        updateTip: true,     //提示版本更新
        dangerItems: "",     // 隐患条目
        filterData: "",       // 筛选条件
        CheckPerson: "",     //整改人
        notifier: "",         //通知人
        CheckDepart:'',     // 检查部门
        projectId:'',   //分部分项ID
        projectName:'',    //分部分项名称
        InspectionPropertyId:'',      //巡检性质ID
        InspectionPropertyName:'',     //巡检性质名称
        ContentId:'',           //隐患条目ID
        Contentname:'',          //隐患条目名称
        PlanDetail:'',            //新增计划详情         
        PlanDanger:''       //计划隐患条目信息 
     },
    mutations: {
        changeUpdateTip: (state, updateTip) => {
            state.updateTip = updateTip
        },
        getDangerItems: (state, data) => {
            state.dangerItems = data
        },
        getFilterData: (state, data) => {
            state.filterData = data
        },
        setCheckPerson: (state, data) => {
            state.CheckPerson = data
        },
        setNotifier: (state, data) => {
            state.notifier = data
        },
        setCheckDepart: (state, data) => {
            state.CheckDepart = data
        },
        setProjectId: (state, data) => {
            state.projectId=data
        },
        setProjectName: (state, data) => {
            state.projectName=data
        },
        setInspectionPropertyId:(state, data) => {
            state.InspectionPropertyId=data
        },
        setInspectionPropertyName:(state, data) => {
            state.InspectionPropertyName=data
        },
        setContentId:(state, data) => {
            state.ContentId=data
        },
        setContentname:(state, data) => {
            state.Contentname=data
        },
        setPlanDetail:(state, data) => {
            state.PlanDetail=data
        },
        setPlanDanger:(state, data) => {
            state.PlanDanger=data
        }

    },

}
export default argument