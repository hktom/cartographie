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
                <div v-if="filtreRange" class="range-wrapper">
                    <input type="range" class="custom-range" id="customRange1" v-model="search"
                        v-if="filtre == 'nbre_employee'" min="0" max="300">
                    <input type="range" class="custom-range" id="customRange2" v-model="search"
                        v-if="filtre == 'annee_creation'" min="1990" max="2020">
                    <input type="number" v-model="search">
                </div>
                <div v-if="filtreStade" class="range-wrapper range-wrapper-multi-select">
                    <select class="custom-select" multiple v-model="searchArray">
                        <option value="">{{$t('tous')}}</option>
                        <option value="pre-seed">Pre-seed</option>
                        <option value="seed">Seed</option>
                        <option value="pre-series a">Pre-Series A</option>
                        <option value="series a">Series A</option>
                        <option value="series b">Series B</option>
                        <option value="series c">Series C</option>
                    </select>
                </div>
                <div v-if="filtreRangeTexte" class="range-wrapper">
                    <div class="position-relative" style="width:50%">
                        <input class="form-control input-search"  type="text" placeholder="Type" title="Type" aria-label="Search" 
                            v-model="search">
                        <font-awesome-icon v-if="search== ''" class="ico-search" icon="search" />
                        <font-awesome-icon v-else class="ico-search ico-close" icon="times" @click="resetSearch()"/>
                    </div>
                    <div class="d-flex align-items-center" style="width:50%">
                        <input type="range" class="custom-range" id="customRange3" v-model="search2"
                            min="0" max="1000000" :title="$t('montant')">
                        <input type="number" v-model="search2" :placeholder="$t('montant')" :title="$t('montant')">
                    </div>
                </div>
            </div>
            <div class="container-filtre">
                <select class="custom-select" v-model="filtre">
                    <option value="">{{$t('tous')}}</option>
                    <option value="pays" selected>{{$t('pays_origine')}}</option>
                    <option value="secteur" selected>{{$t('secteur')}}</option>
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
            search2 : "" , 
            searchArray : [] , 
            filtre :  "pays"         
        }
    },
    computed: {
        ...mapState(['activeSecteur']),
        filtreTexte(){
            if(["", "pays", "secteur", "pays_deploiement", "etiquette"].includes(this.filtre)) 
                return true
            else return false
        },
        filtreRange(){
            if(["nbre_employee", "annee_creation"].includes(this.filtre)) 
                return true
            else return false
        },
        filtreRangeTexte(){
            if(["besoin_financement"].includes(this.filtre)) 
                return true
            else return false
        },
        filtreStade(){
            if(["stade"].includes(this.filtre)) 
                return true
            else return false
        }
    },
    watch: {
        search(){
            this.runSearch()
        }, 
        search2(){
            this.runSearch()
        }, 
        searchArray(){
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
            this.filtredData({search : this.search , filtre : this.filtre, 
                search2 : this.search2, searchArray : this.searchArray })
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
        padding: 5px;
        display: flex;
        height: 48px;
        box-sizing: border-box;
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
            color: black;
            width: 70px;
            padding: 0px 10px;
            background-color: #eee;
            border-radius: 30px;
            margin-left: 5px;
            font-size: 14px;
            padding: 5px 12px;
        }
    }
    .range-wrapper-multi-select{
        align-items: baseline;
        select{
            max-height: 35px;
            transition: max-height 0.4s ease-in-out;
            &:focus{
                max-height: 1000px;
            }
        }
    }

</style>