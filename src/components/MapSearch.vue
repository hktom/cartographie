<template>
    <div class="active-cyan-4 mb-4">
        <font-awesome-icon class="ico-search" icon="search" />
        <input class="form-control input-search"  type="text" placeholder="Rechercher un secteur ou un pays" aria-label="Search" >
    </div>
</template>

<script>

</script>

<style lang="scss" scoped>

    .active-cyan-4{
        position: absolute;;
        z-index:5;
        width:900px;
        padding: 10px 20px;
    }
    .input-search{
        padding-right: 45px;
        box-shadow: 0px 0px 20px rgba(0,0,0, 0.2);
        border:none;
        &:focus{
            outline: none;
            border: none;
        }
    }
    .ico-search{
        position:absolute;
        z-index:5;
        right: 35px;
        top: 22px;
    }
    

</style>