<template>
    <div class="map-search active-cyan-4 mb-4">
        <div class="container-search">
            <div class="container-input position-relative">
                <div v-if="filtreTexte">
                    <font-awesome-icon v-if="search== ''" class="ico-search" icon="search" />
                    <font-awesome-icon v-else class="ico-search ico-close" icon="times" @click="resetSearch()"/>
                    <input class="form-control input-search"  type="text" :placeholder="$t('search-text')" aria-label="Search" 
                        v-model="search">
                </div>
                <div v-if="filtreEmpl" class="range-wrapper">
                    <input type="range" class="custom-range" id="customRange1" v-model="search">
                    <input type="number" v-model="search">
                </div>
            </div>
            <div class="container-filtre">
                <select class="custom-select" v-model="filtre">
                    <option value="">Tous</option>
                    <option value="pays" selected>{{$t('pays_origine')}}</option>
                    <option value="pays_deploiement">{{$t('pays_deploiement')}}</option>
                    <option value="annee_creation">{{$t('annee_creation')}}</option>
                    <option value="nbre_employee">{{$t('nbre_employee')}}</option>
                    <option value="stade">Stade</option>
                    <option value="besoin_financement">{{$t('besoin_financement')}}</option>
                    <option value="etiquette">{{$t('etiquette')}}</option>
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
            search : "" , 
            filtre :  "pays"         
        }
    },
    computed: {
        ...mapState(['activeSecteur']),
        filtreTexte(){
            if(this.filtre == "" || this.filtre == "pays" || this.filtre == "secteur") 
                return true
            else return false
        },
        filtreEmpl(){
            if(this.filtre == "nbre_empl") 
                return true
            else return false
        }
    },
    watch: {
        search(){
            this.runSearch()
        }, 
        filtre(){
            this.runSearch()
        }
    },
    methods: {
        ...mapActions(['filtredData']),
        resetSearch(){
            this.search = ''
        },
        runSearch(){
            this.filtredData({search : this.search , filtre : this.filtre})
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
    .range-wrapper{
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0px 10px;
        input[type="number"]{
            border: none;
            color: #aaa;
            width: 70px;
            padding: 0px 10px;
        }
    }

</style>