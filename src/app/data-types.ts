export interface SignUp {
  name: string;
  password: string;
  email: string;
}

export interface Login {
  password: string;
  email: string;
}

export interface Product {
  name: string;
  price: string;
  category: string;
  color: string;
  description: string;
  image: string;
  id: number;
  quantity: undefined | number;
}

export interface Cart {
  name: string;
  price: string;
  category: string;
  color: string;
  description: string;
  image: string;
  id: number | undefined;
  quantity: undefined | number;
  userId: number;
  productId: number;
}
