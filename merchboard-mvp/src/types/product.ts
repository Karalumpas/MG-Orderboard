export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  color: string;
  sizes: string[];
  customizations: {
    embroidery: boolean;
    print: boolean;
  };
}