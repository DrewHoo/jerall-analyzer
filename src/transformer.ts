import * as fs from 'fs'
import { Gender } from './types'
type MarioCard = {
    id: string
    name: string
    rarity: string
    set: string
    isunique: boolean
    type: string
    attributes: string[]
    cost: number
    attack: number
    health: number
    race: string
    keywords: string[]
    text: string
}
const fixText = (text: string) =>
    text.split(/[\n\r]/g).filter(str => str.length)

const rawData: Buffer = fs.readFileSync('mario-cards.json')
const data: MarioCard[] = JSON.parse(rawData.toString())

const creatures: { name: string; gender: string }[] = data
    .filter(({ type }) => type === 'Creature')
    .map(({ name, race }) => {
        if (
            [
                'High Elf',
                'Dark Elf',
                'Wood Elf',
                'Imperial',
                'Daedra',
                'Nord',
                'Breton',
                'Redguard',
                'Khajiit',
                'Argonian',
                'Giant',
                'Ash Creature',
                'Dragon',
                'Skeleton',
                'Orc',
                'God',
                'Vampire',
            ].includes(race)
        ) {
            return { name, gender: '' }
        } else {
            return { name, gender: 'Unknown' }
        }
    });

fs.writeFileSync('./cards/genders.json', JSON.stringify(creatures));

// data.filter(({ set }) => set === 'Houses of Morrowind').map(card => {
//     const { id, isunique, attack, health, race, text, ...rest } = card
//     return {
//         collectible: true,
//         ...rest,
//         ...(race ? { race: [race], power: attack, health } : {}),
//         ...(isunique ? { rarity: 'Unique Legendary' } : {}),
//         ...(text ? { text: fixText(text) } : {}),
//     }
// })
