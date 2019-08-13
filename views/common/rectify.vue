<template>
     <div class="rectify">
          <headerTop :title="title">
                <span slot="topLeft" class="icon-aliarrow-left- iconBack" @click="goBack"></span>
              <span slot="topRight" class="padd" @click="routerGo">确定</span>
          </headerTop>
     </div>
</template>
<script>
import headerTop from "@/components/headerTop"
export default {
    components:{headerTop},
    data(){
        return{
            title:'联系人'
        }
    },
    methods:{
        routerGo(){
            this.$router.go(-1)
        },
         goBack(){
            this.$router.go(-1)    
        },
    }
}
</script>
<style lang="less" scoped>
.rectify{
    padding-top: 1rem;
    background: #fff;
    height: 100%;
}
</style>