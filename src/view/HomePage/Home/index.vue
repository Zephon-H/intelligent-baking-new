<template>
    <div class="home">
        <div class="home-left">
            <div class="home-left-top">
                <HomeMap class="home-left-top-map"/>
<!--                <DeviceControl class="device-control"/>-->
            </div>
<!--            <div class="device-monitoring">-->
<!--                <DeviceMonitoring/>-->
<!--            </div>-->
        </div>
        <div class="home-right">
            <div class="home-right-data-monitoring">
                <DataMonitoring class="data-monitoring"/>
            </div>
        </div>
    </div>
</template>
<script>
    import DataMonitoring from '@/components/Home/DataMonitoring'
    import HomeMap from '@/components/Home/HomeMap'
    export default {
        name: "index",
        components:{
            // DeviceMonitoring,
          DataMonitoring,HomeMap
          // ,DeviceControl
        },
      mounted() {
        document.body.style.overflow = "hidden";
      },
      destroyed() {
        document.body.style.overflow = "visible";
      }
    }
</script>

<style scoped>
    .home{
        display: flex;
        flex-direction: row;
    }
    .home-left{
        display: flex;
        flex-direction: column;
        margin: 1.5rem 0 0 2rem;
    }
    .home-left-top{
        display: flex;
        flex-direction: row;
        margin: 0 0 1.5rem 0;
    }
    .home-left-top-map{
        margin: 0 1.5rem 0 0;
        background: white;
        width: 60rem;
        height: 50rem;
        border-radius: 1rem;
    }
    .home-left-top-map:hover{
        box-shadow: 0px 0px 0.4rem 0.4rem #e6e6e6;
    }
    .home-right-data-monitoring{
        margin: 1.5rem 0 0 2.2rem;
    }
    .data-monitoring{
        background: white;
        height: 51rem;
        width: 28.5rem;
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
    }
    .data-monitoring:hover{
        box-shadow: 0px 0px 0.4rem 0.4rem #e6e6e6;
    }
</style>
