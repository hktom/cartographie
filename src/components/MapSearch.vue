<template>
    <div class="map-search active-cyan-4 mb-4">
        <div class="container-search">
            <div class="container-input position-relative">
                <font-awesome-icon v-if="search== ''" class="ico-search" icon="search" />
                <font-awesome-icon v-else class="ico-search ico-close" icon="times" @click="resetSearch()"/>
                <input class="form-control input-search"  type="text" :placeholder="$t('search-text')" aria-label="Search" 
                    v-model="search">
            </div>
            <div class="container-filtre">
                <select class="custom-select">
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>
        </div>
    </div>  
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    data() {
        return {
            search : ""          
        }
    },
    computed: {
        ...mapState(['activeSecteur']),
    },
    watch: {
        search(){
            this.filtredData(this.search)
        }
    },
    methods: {
        ...mapActions(['filtredData']),
        resetSearch(){
            this.search = ''
        }
    },
}
</script>

<style lang="scss" scoped>
    input, select{
        &:focus{
            outline: none;
            border: none;
            box-shadow: none;
        }
    }
    .map-search{
        position: absolute;;
        z-index:5;
        width:100%;
        padding: 10px 20px;
        left: 0px;
    }
    .input-search{
        padding-right: 45px;
        border:none;
        width: 100%;
    }
    .container-search{
        box-shadow: 0px 0px 20px rgba(0,0,0, 0.2);
        background-color: white;
        border-radius: 30px;
        overflow: hidden;
        padding: 5px;
        display: flex;
    }
    .container-input{
        width: calc(100% - 250px);
    }
    .container-filtre{
        width: 250px;
        border-left: 1px solid #aaa ;
        select{
            border: none;
        }
    }
    .ico-search{
        position:absolute;
        z-index:5;
        right: 15px;
        top: 12px;
    }
    .ico-close{
        cursor: pointer;
    }
    

</style>