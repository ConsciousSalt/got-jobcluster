<template>
  <div class="screen">
    <div class="sidebar">
      <div class="wrapper">
        <MainMenu/>
        <Dashboard>
          <component :is="currentComponent" :current-person="localStale.activePersonSlug"/>
        </Dashboard>
      </div>
    </div>
    <div class="main">
      <MainContentPanel>
        <HouseMemebers v-if="localStale.activePage===PAGES.houses && !!localStale.houseMembersSlug" :house-slug="localStale.houseMembersSlug"/>
      </MainContentPanel>
    </div>
  </div>

</template>

<script lang="ts">
import MainMenu from '@/components/MainMenu.vue'
import Dashboard from "@/components/Dashboard.vue";
import MainContentPanel from "@/components/MainContentPanel.vue";

import HousesList from "@/components/HousesList.vue";
import PersonsLIst from "@/components/PersonsLIst.vue";
import QuotesList from "@/components/QuotesList.vue";

import HouseMemebers from "@/components/HouseMemebers.vue";

import {computed, defineComponent, provide, reactive} from "vue";
import {PAGES} from "@/types.ts";


export default defineComponent({
  name: "App",
  computed: {
    PAGES() {
      return PAGES
    }
  },
  components: {
    MainMenu,
    Dashboard,
    MainContentPanel,

    HousesList,
    PersonsLIst,
    QuotesList,

    HouseMemebers,
  },
  setup(){
    const localStale = reactive({
      activePage: PAGES.houses,
      houseMembersSlug: '',
      activePersonSlug: '',
    });

    const setPage = (page: PAGES )=> {
      localStale.activePage = page;
    };

    const showHouseInfo = (slug: string) => {
      console.log("App --> showHouseInfo", slug);
      localStale.houseMembersSlug = slug;
    }

    const setActivePerson = (personSlug: string) => {
      localStale.activePersonSlug = personSlug;
    }

    const currentComponent = computed<any>(() => {
      switch (localStale.activePage) {
        case PAGES.houses: return "HousesList";
        case PAGES.persons: return "PersonsLIst";
        case PAGES.quotes: return "QuotesList";
        default: return null;
      }
    });


    provide('setPage', setPage);
    provide('showHouseInfo', showHouseInfo);
    provide('setActivePerson', setActivePerson);

    return {
      localStale,
      currentComponent
    }
  }
})
</script>

<style lang="scss">
#app {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.screen {
  position: static;
  display: flex;
  height: 100%;
  background-color: #111827;
  .sidebar{
    flex-shrink: 0!important;
    border-right-width: 1px!important;
    border-right-style: solid;
    width: auto!important;
    height: auto!important;
    position: static!important;
    z-index: 1!important;
    .wrapper {
      display: flex;
      height: 100%;
    }
  }

  .main{
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    min-height: 100vh;
    position: relative;
  }
}
</style>
