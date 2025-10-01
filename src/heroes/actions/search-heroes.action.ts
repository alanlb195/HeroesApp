import { heroApi } from "../api/hero.api";
import type { Hero } from "../interfaces/hero.interface";

const VITE_API_URL = import.meta.env.VITE_API_URL;

interface Options {
    name?: string;
    team?: string;
    category?: string;
    universe?: string;
    status?: string;
    strength?: string;
}

export const searchHeroesAction = async (opts: Options) => {

    const { category, name, status, strength, team, universe } = opts;

    if (!name
        && !category
        && !status
        && !strength
        && !team
        && !universe
    ) return [];

    const { data } = await heroApi.get<Hero[]>('/search', {
        params: {
            name,
            status,
            strength,
            team,
            universe
        }
    });

    return data.map(hero => ({
        ...hero,
        image: `${VITE_API_URL}/images/${hero.image}`
    }));
}