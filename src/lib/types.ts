export type Meal = {
  id: string;
  name: string;
  description: string;
  price: number;
  ingredients: string[];
  imageUrl: string;
  category: string;
};

export type Category = {
  id: string;
  name: string;
  imageUrl: string;
};
