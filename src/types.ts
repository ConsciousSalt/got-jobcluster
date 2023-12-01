export enum PAGES {
  houses,
  persons,
  quotes
}

export type ItemInfo = {
  name: string,
  slug: string
}

export type HouseListResponseType = ItemInfo & {
  members: ItemInfo[]
}

export type PersonsResponse = ItemInfo & {house: ItemInfo} & {quotes: string[]};

export type PersonDetailedInfo = {
  id: number,
  firstName: string,
  lastName: string,
  fullName: string,
  title: string,
  family: string,
  image: string,
  imageUrl: string
}

export type Quote = {
  character?:PersonsResponse,
  sentence: string
}