import {computed, Ref} from "vue";
import {HouseType, PersonType} from "@/types.ts";

export function useFilteredList(list: Ref<any[]>, mapFunction: Function, search_str: Ref<string>) {
  return computed(()=>{
    if (!Array.isArray(list.value) || !list.value.length) return [];
    const inputValue = search_str.value.trim();
    const regexp = new RegExp(inputValue, 'ig');
    if (inputValue.length) {
      return list.value.filter(el=>regexp.test(el.name) || regexp.test(el.house?.name||'')).map(mapFunction.bind({regexp, inputValue}));
    }

    return list.value;
  })
}

export function personsMapFunction(this: {regexp: RegExp, inputValue: string}, el: PersonType): PersonType  {
  let highlightedText;
  if (this.regexp.test(el.name)) {
    const index = el.name.toLowerCase().indexOf(this.inputValue.toLowerCase());
    highlightedText =
        el.name.substring(0, index) +
        `<span style="background-color: #637087; font-weight: bold;">${el.name.substring(index, index + this.inputValue.length)}</span>` +
        el.name.substring(index + this.inputValue.length);
  } else {
    highlightedText =
        el.name +
        `<span style="background-color: #637087; font-weight: bold;"> of ${el.house.name}</span>`;
  }

  return {...el,
    name: highlightedText
  };
}

export function housesMapFunction(this: {regexp: RegExp, inputValue: string}, el: HouseType): HouseType {
  const index = el.name.toLowerCase().indexOf(this.inputValue.toLowerCase());
  const highlightedText =
      el.name.substring(0, index) +
      `<span style="background-color: #637087; font-weight: bold;">${el.name.substring(index, index + this.inputValue.length)}</span>` +
      el.name.substring(index + this.inputValue.length);

  return {...el,
    name: highlightedText
  };
}