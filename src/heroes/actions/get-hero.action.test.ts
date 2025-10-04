import { describe, expect, test } from "vitest";
import { getHeroAction } from "./get-hero.action";



describe('getHeeroAction', () => {

    test('should fetch hero data and return with complete image url', async () => {

        const result = await getHeroAction('bruce-wayne');

        // console.log(result);

        expect(result.image).toContain('http')
        expect(result).toStrictEqual({
            id: '2',
            name: 'Bruce Wayne',
            slug: 'bruce-wayne',
            alias: 'Batman',
            powers: [
                'Artes marciales',
                'Habilidades de detective',
                'Tecnología avanzada',
                'Sigilo',
                'Genio táctico'
            ],
            description: 'El Caballero Oscuro de Ciudad Gótica, que utiliza el miedo como arma contra el crimen y la corrupción.',
            strength: 6,
            intelligence: 10,
            speed: 6,
            durability: 7,
            team: 'Liga de la Justicia',
            image: 'http://localhost:3001/images/2.jpeg',
            firstAppearance: '1939',
            status: 'Active',
            category: 'Hero',
            universe: 'DC'
        });


    });

    test('should throw an error if hero is not found', async () => {

        const idSlug = 'batman-2';

        const result = await getHeroAction(idSlug).catch((error) => {
            // console.log(error);
            expect(error).toBeDefined();
            expect(error.message).toEqual("Request failed with status code 404");
        });

        expect(result).toBeUndefined();

    });
})