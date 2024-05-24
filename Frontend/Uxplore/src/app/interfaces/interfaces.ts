export interface User {
  id: number;
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
    avgPrice: number;
}
