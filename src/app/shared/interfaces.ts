export interface IUser {
    name: string;
    nickName: string;
    email: string;
    isAdmin?: boolean;
}

export interface IUserBase {
    name: string;
    nickName: string;
    email: string;
    isAdmin?: boolean;
    created: Date;
    recipesCount: number;
}

export interface IIngredient {
    name: string;
    quantity: string;
}

export enum FoodOccasions {
    Breakfast,
    Lunch,
    Dinner,
    Snack
}

export interface IRecipe {
    id: number;
    name: string;
    ingredients: IIngredient[];
    descriprion: string;
    owner: string;
    foodOccasions?: FoodOccasions;
    cuisine?: string;
    private: boolean;
    kkal?: number;
    ratings?: number[];
    isVegan?: boolean;
    imageUrl?: string;
    tags?: string[];
}