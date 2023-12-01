import get from "axios";
import type {HouseListResponseType} from "@/types.ts";
import {ItemInfo, PersonDetailedInfo, PersonsResponse, Quote} from "@/types.ts";

export async function getHousesList(): Promise<HouseListResponseType[]> {
  try {
    const response = await get('https://api.gameofthronesquotes.xyz/v1/houses');
    if (response.status === 200) {
      return response.data;
    } else {
      return [];
    }

  } catch (error) {
    return [];
  }
}

export async function getHouseDetails(slug: string): Promise<ItemInfo[]> {
  try {
    const response = await get(`https://api.gameofthronesquotes.xyz/v1/house/${slug}`);

    if (response.status === 200) {
      return response.data.find((el: any) => el.slug === slug)?.['members'] || [];
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
}

export async function getAllCharacters(): Promise<PersonsResponse[]> {
  try{
    const response = await get('https://api.gameofthronesquotes.xyz/v1/characters');
    if (response.status === 200) {
      return response.data || [];
    } else {
      return [];
    }
  } catch (e) {
    return [];
  }
}

export async function getCharacterDetails(slug: string): Promise<PersonsResponse|{}> {
  try {
    const response = await get(`https://api.gameofthronesquotes.xyz/v1/character/${slug}`);

    if (response.status === 200) {
      return response.data.find((el: any) => el.slug === slug) || {};
    } else {
      return {};
    }
  } catch (error) {
    return {};
  }
}

export async function getFullCharactersInfo(): Promise<PersonDetailedInfo[]> {
  try {

    const response = await get('https://thronesapi.com/api/v2/Characters');

    if (response.status === 200) {
      return response.data || [];
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
}

export async function getRandomQuotes(count: number): Promise<Quote[]> {
  try {

    const response = await get(`https://api.gameofthronesquotes.xyz/v1/random/${count}`);

    if (response.status === 200) {
      return response.data || [];
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
}