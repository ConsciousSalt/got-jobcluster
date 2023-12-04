<template>
  <div class="screen">
    <div class="sidebar">
      <div class="wrapper">
        <MainMenu :current-page="localStale.activePage"/>
        <Dashboard :class="{'hidden-dashboard': !currentComponent}">
          <component :is="currentComponent" :current-person="localStale.activePersonSlug" :current-house="localStale.houseMembersSlug"/>
        </Dashboard>
      </div>
    </div>
    <div class="main">
      <MainContentPanel>
        <HouseMemebers v-if="localStale.activePage===PAGES.houses && !!localStale.houseMembersSlug" :house-slug="localStale.houseMembersSlug"/>
        <PersonDetails  v-if="localStale.activePage===PAGES.persons && !!localStale.activePersonSlug" :active-person="localStale.activePersonSlug"/>
        <QuotesList  v-if="localStale.activePage===PAGES.quotes" :quotes-list="localStale.randomQuotes" :show-person-name="true" @refresh-list="refreshQuotesHandler"/>
      </MainContentPanel>
    </div>
  </div>

</template>

<script lang="ts">
import {computed, defineComponent, onMounted, provide, reactive} from "vue";
import {intersection} from "lodash";

import {PAGES, PersonDetailedInfoType, QuoteType} from "@/types.ts";
import {getFullCharactersInfo, getRandomQuotes} from "@/api.ts";

import MainMenu from '@/components/MainMenu.vue'
import Dashboard from "@/components/Dashboard.vue";
import MainContentPanel from "@/components/MainContentPanel.vue";

import HousesList from "@/components/HousesList.vue";
import PersonsLIst from "@/components/PersonsLIst.vue";
import QuotesList from "@/components/QuotesList.vue";

import HouseMemebers from "@/components/HouseMemebers.vue";
import PersonDetails from "@/components/PersonDetails.vue";
import quotesList from "@/components/QuotesList.vue";



export default defineComponent({
  name: "App",
  computed: {
    quotesList() {
      return quotesList
    },
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
    PersonDetails
  },
  setup(){
    const localStale = reactive<{
      activePage: PAGES;
      houseMembersSlug: string;
      activePersonSlug: string;
      fullCharactersInfo: PersonDetailedInfoType[];
      randomQuotes: QuoteType[]
    }>({
      activePage: PAGES.houses,
      houseMembersSlug: '',
      activePersonSlug: '',
      fullCharactersInfo: [],
      randomQuotes: []
    });

    const setPage = (page: PAGES )=> {
      localStale.activePage = page;
    };

    const showHouseInfo = (slug: string) => {
      localStale.houseMembersSlug = slug;
    }

    const setActivePerson = (personSlug: string) => {
      localStale.activePersonSlug = personSlug;
    }

    const getPersonDetailedInfo = (fullName:string) => {
      const [firstName, ...middleAndLast] = fullName.split(' ');
      const lastName = middleAndLast.pop();

      const byFirstName = localStale.fullCharactersInfo.filter(el=>el.firstName===firstName);
      const byLastName = lastName ? localStale.fullCharactersInfo.filter(el=>el.lastName===lastName) : [];

      if (!byFirstName.length) {
        return byLastName.length === 1 ? byLastName[0] : {};
      } else if (!byLastName.length) {
        return byFirstName.length === 1 ? byFirstName[0] : {};
      } else {
        const findResult = intersection(byFirstName, byLastName);
        return findResult.length ? findResult[0] : {};
      }
    }

    const currentComponent = computed<any>(() => {
      switch (localStale.activePage) {
        case PAGES.houses: return "HousesList";
        case PAGES.persons: return "PersonsLIst";
        // case PAGES.quotes: return "QuotesList";
        default: return null;
      }
    });

    const refreshQuotesHandler = () => {
      getRandomQuotes(5).then(response=>localStale.randomQuotes=response)
    }

    onMounted(async ()=>{
      localStale.fullCharactersInfo = await getFullCharactersInfo();
    })


    provide('setPage', setPage);
    provide('showHouseInfo', showHouseInfo);
    provide('setActivePerson', setActivePerson);
    provide('getPersonDetailedInfo', getPersonDetailedInfo);
    provide('getRandomQuotes', refreshQuotesHandler);

    return {
      localStale,
      currentComponent,
      refreshQuotesHandler
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

      .hidden-dashboard {
        display: none;
      }
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
