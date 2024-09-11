import { IntegrationNotFoundException } from "@ionic/cli/lib/errors";


export interface User {
  id?: number;
  fName?: string;
  lName?: string;
  email: string;
  password ?: string;
  userType?: string;
}
export interface UserSetting {
  id?: number;
  userId: number;
  push_Notices: number;
  hide_Account: number;
  account_Suggestions: number;
  trending_Places: number;
  reminders: number;
}
export interface Listing {
  id?: number;
  name: string;
  description: string;
  hours: string;
  location: string;
  phone: string;
  email: string;
  order?: string;
  reserve: number;
  start_date: string;
  end_date?: string;
  site: string;
  min_price: number;
  max_price: number;
  user_id: number;
  avG_price?: number;
}



export interface interests {
  id?: number;
  User_id: number;
  Category_id: number;
}

export interface rateing {
  id: number;
  event_ID: number;
  list_ID: number | undefined;
  user_id: number;
  ratevalue: number;
  type: string;
}

export interface listingimages {
  id: number;
  listingid: number;
  image: string;
}

export interface UserInteraction {
  id?: number;
  event_ID?: number;
  listing_ID?: number;
  user_ID: number;
  interaction_Type: string;
  interaction_Date: string;
}

export interface Comment {
  id: number;
  event_ID: number;
  listing_ID: number|undefined;
  comment: string;
}
export interface userSettings{
  id:number;
  user_ID:number;
}


export interface BusinessAdvert {
  id: number;
  business_ID : number;
  image_File: string;
  description: string;
  event_ID : number
}

export interface BusinessCredits {
  id: number;
  User_ID: number;
  Available_Credits: number;
}

export interface Email {
  email: string,
  body: string,
  subject: string
}

