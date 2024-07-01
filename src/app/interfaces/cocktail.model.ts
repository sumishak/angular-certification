export interface Cocktail {
    id?: number;
    name?: string;
    isAlcoholic?: boolean;
    imageUrl?: string;
    instructions?: string;
    ingredients?: string[];
    ingredientsUi?: string;
    favorite?: boolean;
}