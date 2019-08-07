const argument = {
    state: {
        qpplanName: '',
        qpplanId: '',
        searchformData:'',
        inspectionPropertyName: '',
        inspectionPropertyId: '',
        checkPerson: '',
        qpCheckUserId: '',
        depart: "",
        selfCheckProcess:[],
        informant: '',
        informantId: '',
        qpContent: '',
        qpContentId: '',
        qpNotifierName: '',
        qpNotifierId: '',
        qpBeginDate: '',          // 起始时间
        endTime: ''  ,             // 结束时间
        sendState:'',               // 整改状态
        overdue:''  ,               // 逾期
        projectName:'',              //分部分项的名称
        projectId:'',                //分部分项的Id
        planDetail:'',                    //质量计划详情带出来回填
        SafetyFormData:'',           //安全计划列表回填
        partId:'',                    //组织架构id
        createdId:'',                      //创建人id
        createdName:'',                  //创建人名字
        departAll:'',                    // 部门信息
        updateTip: true                 //提示版本更新
    },
    mutations: {
        changeUpdateTip(state, updateTip){
            state.updateTip = updateTip
        },

        getdepartAll:(state,data)=>{
            state.departAll = data
        },
        
        getcreatedId:(state,id)=>{
            state.createdId=id
        },
        getcreatedName:(state,name)=>{
            state.createdName=name
        },
        getpartId:(state,id)=>{
            state.partId=id
        },
        getSafetyFormData:(state,data)=>{
            state.SafetyFormData=data
        },
        getPlanDetail:(state,data)=>{
            state.planDetail=data
        },
        getProjectName:(state,data)=>{
            state.projectName=data
        },
        getProjectId:(state,data)=>{
            state.projectId=data
        },
        getFormData:(state,data)=>{
            state.searchformData=data
        },
        getQpBeginDate: (state, time) => {
            state.qpBeginDate = time
        },
        getEndTime: (state, time) => {
            state.endTime = time
        },
        getQpplanName: (state, name) => {
            state.qpplanName = name
        },
        getQpplanId: (state, id) => {
            state.qpplanId = id
        },
        getInspectionPropertyName: (state, name) => {
            state.inspectionPropertyName = name
        },
        getInspectionPropertyId: (state, id) => {
            state.inspectionPropertyId = id
        },
        getQpCheckUserId: (state, id) => {
            state.qpCheckUserId = id
        },
        getCheckPerson: (state, name) => {
            state.checkPerson = name
        },
        getDepart: (state, name) => {
            state.depart = name
        },
        getSelfCheckProcess: (state, data) => {
            state.selfCheckProcess = data
        },
        getInformantId: (state, id) => {
            state.informantId = id
        },
        getInformant: (state, name) => {
            state.Informant = name
        },
        getQpContent: (state, content) => {
            state.qpContent = content
        },
        getQpContentId: (state, content) => {
            state.qpContentId = content
        },
        getQpNotifierName:(state,name)=>{
            state.qpNotifierName=name
        },
        getQpNotifierId: (state, id) => {
            state.qpNotifierId = id
        },
        getSendState:(state,sendState)=>{
            state.sendState = sendState
        },
        getOverdue:(state,overdue)=>{
             state.overdue = overdue
        },
        
    },
    actions: {
        setdepartAll:({commit},data)=>{
            commit('getdepartAll',data)
        },
        setcreatedId:({commit},id)=>{
            commit('getcreatedId',id)
        },
        setcreatedName:({commit},name)=>{
            commit('getcreatedName',name)
        },
        setOrgId:({commit},id)=>{
            commit('getpartId',id)
        },
        setSafetyFormData:({commit},data)=>{
            commit('getSafetyFormData',data)
        },
        setPlanDetail:({commit},data)=>{
            commit('getPlanDetail',data)
        },
        setProjectName:({commit},data)=>{
            commit('getProjectName',data)
        },
        setProjectId:({commit},data)=>{
            commit('getProjectId',data)
        },
        setFormData:({commit},data)=>{
            commit('getFormData',data)
        },
        setEndTime: ({ commit }, time) => {
            commit('getEndTime', time)
        },
        setQpBeginDate: ({ commit }, time) => {
            commit('getQpBeginDate', time)
        },
        setQpplanName: ({ commit }, name) => {
            commit('getQpplanName', name)
        },
        setQpplanId: ({ commit }, id) => {
            commit('getQpplanId', id)
        },
        setInspectionPropertyName: ({ commit }, name) => {
            commit('getInspectionPropertyName', name)
        },
        setInspectionPropertyId: ({ commit }, id) => {
            commit('getInspectionPropertyId', id)
        },
        setQpCheckUserId: ({ commit }, id) => {
            commit('getQpCheckUserId', id)
        },
        setCheckPerson: ({ commit }, name) => {
            commit('getCheckPerson', name)
        },
        setDepart: ({ commit }, name) => {
            commit('getDepart', name)
        },
        setSelfCheckProcess: ({ commit }, data) => {
            commit('getSelfCheckProcess', data)
        },
        setInformant: ({ commit }, name) => {
            commit('getInformant', name)
        },
        setInformantId: ({ commit }, id) => {
            commit('getInformantId', id)
        },
        setQpContent: ({ commit }, content) => {
            commit('getQpContent', content)
        },
        setQpContentId: ({ commit }, id) => {
            commit('getQpContentId', id)
        },
        setQpNotifierName: ({ commit }, name) => {
            commit('getQpNotifierName', name)
        },
        setQpNotifierId: ({ commit }, id) => {
            commit('getQpNotifierId', id)
        },
        setSendState:({commit},sendState)=>{
            commit("getSendState",sendState)
        },
        setOverdue:({commit},overdue)=>{
            commit("getOverdue",overdue)
        }
    }
}
export default argument