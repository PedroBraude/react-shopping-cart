type Guitar = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
};

// Inheritance
type CartItem = Guitar & {
  quantity: number;
};

export type { Guitar, CartItem };
