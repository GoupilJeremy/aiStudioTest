export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  imageUrl: string;
  description: string;
  menu?: MenuItem[]; // Menu can be dynamically loaded
}

export interface CartItem extends MenuItem {
  quantity: number;
}
