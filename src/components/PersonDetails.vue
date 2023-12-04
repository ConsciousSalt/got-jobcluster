<template>
  <section class="section-body">
    <article class="section-body-left">
      <QuotesList :quotes-list="personQuotes" @refresh-list="refreshQuotesHandler"/>
    </article>
    <article class="section-body-right" :style="personPhoto">
      <div class="section-body-right-info">
        <a class="section-body-right-info-header" @click.prevent="houseClickHandler(personData.house?.slug)">{{personData.house?.name}}</a>
        <div class="section-body-right-info-splitter"></div>
        <div class="section-body-right-info-bottom">
          <div class="section-body-right-info-bottom-right">
            <p class="person-name">{{personData.name}}</p>
            <span class="person-title">{{ personDetails.title }}</span>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<script lang="ts">
import {computed, defineComponent, inject, ref, watch} from "vue";
import {getCharacterDetails} from "@/api.ts";
import {PAGES, PersonDetailedInfoType, PersonType, QuoteType} from "@/types.ts";

import QuotesList from "@/components/QuotesList.vue";

export default defineComponent({
  name: "Person details",
  components:{
    QuotesList
  },
  props:{
    activePerson:{
      type: String,
      default: ''
    }
  },
  setup(props){
    const getPersonDetailedInfo = inject<(name: string)=>any>("getPersonDetailedInfo");
    const setPage = inject<(page: PAGES)=>void>('setPage');
    const showHouseInfo = inject<(slug: string)=>void>('showHouseInfo');

    const personData = ref<PersonType>({} as any as PersonType);
    const personQuotes = ref<QuoteType[]>([]);
    const personDetails = ref<Partial<PersonDetailedInfoType>>({});

    const activePersonChangeHandler = async () => {
      if (props.activePerson) {
        personData.value = (await getCharacterDetails(props.activePerson)) as any as PersonType;
        personQuotes.value = getRandomItems();
        personDetails.value = getPersonDetailedInfo?.(personData.value.name) || {};
      }
    }

    const personPhoto = computed(()=>{
      const result:{height:string, 'background-image'?: string, 'background-blend-mode'?: string} = {
        height: '44rem'
      }
      if (personDetails.value?.imageUrl) {
        result['background-image']=`radial-gradient(circle, transparent 40%, black 75%),
    linear-gradient(to right, grey, grey), url("${personDetails.value.imageUrl}")`;
        result['background-blend-mode']= 'saturation';
      } else {
        result['background-image']='radial-gradient(circle, transparent 10%, black 75%)';
      }

      return result;
    })

    function getRandomItems() {
      if (!Array.isArray(personData.value.quotes) || personData.value.quotes.length === 0) {
        return [];
      }

      const shuffledArray = Array.from(personData.value.quotes).sort(() => Math.random() - 0.5);

      return shuffledArray.slice(0, 3).map(el=>({sentence: el}));
    }

    const refreshQuotesHandler = () => {
      personQuotes.value = getRandomItems();
    }

    const houseClickHandler = (slug: string) => {
      showHouseInfo?.(slug);
      setPage?.(PAGES.houses);
    }

    watch(()=>props.activePerson, activePersonChangeHandler, {immediate: true})


    return {
      personData,
      personDetails,
      personPhoto,
      personQuotes,

      refreshQuotesHandler,
      houseClickHandler
    }
  }
})
</script>


<style scoped lang="scss">
  .section-body {
    background-color: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    &-left {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding-top: 5rem;
      padding-bottom: 5rem;
      width: 100%;
    }

    &-right {
      display: flex;
      align-items: flex-end;
      padding: 2rem;
      width: 100%;
      background-size: cover;
      background-position: center;
      height: 44rem;

      &-info {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 1rem;
        border-radius: 0.5rem;
        width: 100%;
        backdrop-filter: blur(12.25px);
        background: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.15);

        &-header {
          min-height: 24px;
          color: #fff;
          text-align: center;
          font-weight: 600;
          font-size: 1.5rem;
          line-height: 1.5;
          margin: 0;
          text-decoration: underline;
          cursor: pointer;
        }

        &-splitter {
          min-height: 18px;
        }

        &-bottom {
          display: flex;
          justify-content: flex-start;

          &-right {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;

            .person-name {
              color: #ffffff;
              font-weight: 600;
              font-size: 1rem;
              line-height: 1.5;
              margin-top: 0;
              margin-bottom: 0;
            }

            .person-title {
              color: #fffc;
              font-weight: 300;
              font-size: .875rem;
              line-height: 1.5;
            }
          }
        }
      }
    }
  }
</style>