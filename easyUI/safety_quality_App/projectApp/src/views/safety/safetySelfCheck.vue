<template>
     <div class="safetySelfCheck">
           <headerTop :title="title">
                <span slot="topLeft">
                      <yd-navbar-back-icon></yd-navbar-back-icon>
                </span>
                <span slot="topRight" class="icon-alixinzeng">
                      
                </span>
           </headerTop>
     </div>
</template>
<script>
import headerTop from "@/components/headerTop.vue"
export default {
    name:'safetySelfCheck',
    components:{
       headerTop
    },
    data(){
        return{
            title:'安全自主检查'
        }
    }
}
</script>
