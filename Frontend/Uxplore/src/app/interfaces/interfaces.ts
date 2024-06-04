
export interface User {
  id?: number;
  fName: string;
  lName: string;
  email: string;
  password: string;
  userType: string;
}

export interface Listing {
    id: number;
    name: string;
    description: string;
    hours: string;
    location: string;
    phone: string;
    email: string;
    order: string;
    reserve: number;
    site?: string;
    avG_price: number;
}

export interface interests {
  id?: number;
  User_id: number;
  Category_id: number;
}

export interface rateing {
  id: number;
  event_ID: number;
  listing_id: number;
  user_id: number;
  ratevalue: number;
  type: string;
}

export interface listingimages {
  id: number;
  listingid: number;
  image: string;
}
