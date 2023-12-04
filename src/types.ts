export enum PAGES {
  houses,
  persons,
  quotes
}

export type ItemInfo = {
  name: string,
  slug: string
}

export type HouseType = ItemInfo & {
  members: ItemInfo[]
}

export type PersonType = ItemInfo & {house: ItemInfo} & {quotes: string[]};

export type PersonDetailedInfoType = {
  id: number,
  firstName: string,
  lastName: string,
  fullName: string,
  title: string,
  family: string,
  image: string,
  imageUrl: string
}

export type QuoteType = {
  character?:PersonType,
  sentence: string
}