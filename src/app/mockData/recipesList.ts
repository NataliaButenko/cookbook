import { IRecipe, FoodOccasions } from "../shared/interfaces";

export const recipesList: IRecipe[] = [
    {
      id: 1,
      name: 'Recipe 1',
      ingredients: [
        { name: 'Tomato', quantity: '300g' },
        { name: 'Onion', quantity: '150g' },
        { name: 'Cheese', quantity: '200g' },
        { name: 'Basil', quantity: '50g' }
      ],
      descriprion: 'This is the description for Recipe 1',
      owner: 'user',
      foodOccasions: FoodOccasions.Dinner,
      cuisine: 'Mexican',
      private: false,
      kkal: 583,
      ratings: [4, 5, 1, 4, 5, 1, 3, 1, 2],
      imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Aubergine-and-sesame-noodles-6138de6.jpg?quality=90&resize=556,505'
    },
    {
      id: 2,
      name: 'Recipe 2',
      ingredients: [
        { name: 'Chicken', quantity: '500g' },
        { name: 'Rice', quantity: '300g' }
      ],
      descriprion: 'This is the description for Recipe 2',
      owner: 'Admin',
      foodOccasions: FoodOccasions.Dinner,
      cuisine: 'Mexican',
      private: false,
      ratings: [],
    },
    {
      id: 3,
      name: 'Recipe 3',
      ingredients: [
        { name: 'Garlic', quantity: '30g' },
        { name: 'Onion', quantity: '150g' },
        { name: 'Beef', quantity: '400g' }
      ],
      descriprion: 'This is the description for Recipe 3',
      owner: 'Admin',
      foodOccasions: FoodOccasions.Breakfast,
      private: true,
      kkal: 830,
      ratings: [3, 1, 2, 5, 5, 2, 1, 5, 1, 4],
      isVegan: true
    },
    {
      id: 4,
      name: 'Recipe 4',
      ingredients: [
        { name: 'Potato', quantity: '400g' },
        { name: 'Carrot', quantity: '200g' }
      ],
      descriprion: 'This is the description for Recipe 4',
      owner: 'user',
      foodOccasions: FoodOccasions.Breakfast,
      cuisine: 'Italian',
      private: false,
      kkal: 805,
      ratings: [1, 5, 4],
      isVegan: false,
      imageUrl: 'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FRecipes%2F2023-01-Caramelized-Tomato-Paste-Pasta%2F06-CARAMELIZED-TOMATO-PASTE-PASTA-039'
    },
    {
      id: 5,
      name: 'Recipe 5',
      ingredients: [
        { name: 'Rice', quantity: '300g' },
        { name: 'Tomato', quantity: '250g' },
        { name: 'Garlic', quantity: '30g' },
        { name: 'Cheese', quantity: '200g' },
        { name: 'Basil', quantity: '50g' }
      ],
      descriprion: 'This is the description for Recipe 5',
      owner: 'test',
      foodOccasions: FoodOccasions.Breakfast,
      cuisine: 'Italian',
      private: false,
      kkal: 763,
      ratings: [5, 1, 5, 3, 4, 4, 3, 4],
    }
  ];
  