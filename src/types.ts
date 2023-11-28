export enum PAGES {
  houses,
  persons,
  quotes
}

export type HouseMemberResponse = {
  name: string,
  slug: string
}

export type ItemInfo = {
  name: string,
  slug: string
}

export type HouseListResponseType = ItemInfo & {
  members: ItemInfo[]
}

export type PersonsResponse = ItemInfo & {house: ItemInfo} & {quotes: string[]};