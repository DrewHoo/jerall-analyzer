import * as fs from 'fs'
import {
    Gender,
    Card,
    CardType,
    Rarity,
    Set,
    Attribute,
    Race,
    Keyword,
} from './types'

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

function main() {
    makeCardArray()
}

main()

function fixText(text: string) {
    return text.split(/[\n\r]/g).filter(str => str.length)
}

function getMariosCards(): MarioCard[] {
    const rawData: Buffer = fs.readFileSync('mario-cards.json')
    const data: MarioCard[] = JSON.parse(rawData.toString())
    return data
}

function makeGenderFile() {
    const data: MarioCard[] = getMariosCards()
    const creatures: { name: string; gender: string }[] = data
        .filter(({ type }) => type === 'Creature')
        .map(({ name, race }) => {
            if (
                [
                    'Argonian',
                    'Ash Creature',
                    'Breton',
                    'Daedra',
                    'Dark Elf',
                    'Dragon',
                    'God',
                    'High Elf',
                    'Imperial',
                    'Khajiit',
                    'Nord',
                    'Redguard',
                    'Skeleton',
                    'Orc',
                    'Vampire',
                    'Wood Elf',
                ].includes(race)
            ) {
                return { name, gender: '' }
            } else {
                return { name, gender: 'Unknown' }
            }
        })

    // fs.writeFileSync('./cards/genders.json', JSON.stringify(creatures))
}

function getGenderMap(): Map<string, Gender> {
    const rawData: Buffer = fs.readFileSync('src/cards/genders.json')
    const data: { name: string; gender: string }[] = JSON.parse(
        rawData.toString()
    )
    const arr: [string, Gender][] = data.map(
        ({ name, gender }): [string, Gender] => [name, _getGender(gender)]
    )
    return new Map(arr)
}

function makeCardArray(): void {
    const cards: MarioCard[] = getMariosCards()
    const levelledCards = [
        "Alik'r Bandit",
        'Archein Guerrilla',
        'Camlorn Adventurer',
        'Deshaan Sneak',
        'Dres Guard',
        'Dune Rogue',
        'Expert Atromancer',
        "Fate's Witness",
        'Guild Recruit',
        'Hive Worker',
        'Initiate of Hircine',
        'Northpoint Lieutenant',
        'Night Patrol',
        "Quin'rawl Skulker",
        'Rihad Nomad',
        'Rising Legate',
        'Student of Arms',
        'Valenwood Trapper',
        'Volkihar Lord',
        'Whiterun Recruit',
    ]
    const genderMap: Map<string, Gender> = getGenderMap()
    const tsCards: Card[] = cards
        .filter(({ name }) => !levelledCards.includes(name))
        .filter(({ type }) => type !== 'Double')
        .map(card => {
            const {
                id,
                isunique,
                attack,
                health,
                race,
                text,
                rarity,
                type,
                set,
                attributes,
                keywords,
                name,
                cost,
            } = card
            const baseCard = {
                name,
                cost,
                collectible: true,
                rarity: getRarity(rarity, isunique),
                set: getSet(set),
                attributes: getAttributes(attributes),
                keywords: getKeywords(keywords),
            }
            switch (type) {
                case 'Creature':
                    return {
                        ...baseCard,
                        type,
                        gender: getGender(name, genderMap),
                        race: [getRace(race)],
                        power: attack,
                        health,
                        ...(text ? { text: fixText(text) } : {}),
                    }
                case 'Action':
                    return {
                        ...baseCard,
                        type,
                        text: fixText(text),
                    }
                case 'Item':
                    return {
                        ...baseCard,
                        type,
                        text: fixText(text),
                    }
                case 'Support':
                    return {
                        ...baseCard,
                        type,
                        text: fixText(text),
                    }
                default:
                    throw new Error(`invalid Card type: '${type}'`)
            }
        })
    fs.writeFileSync(
        'src/cards/cards.ts',
        `import { Card } from '../types'\nexport const cards: Card[] = ${JSON.stringify(tsCards)}`
    )
}

function getGender(name: string, genderMap: Map<string, Gender>): Gender {
    const gender: Gender | undefined = genderMap.get(name)
    if (gender === undefined) {
        throw new Error(`Creature '${name}' has no assigned gender`)
    }
    return gender
}

function _getGender(gender: string): Gender {
    const genders: Gender[] = ['Unknown', 'Nonbinary', 'Male', 'Female']
    if (genders.includes(gender as Gender)) {
        return gender as Gender
    }
    throw new Error(`Invalid gender '${gender}'`)
}

function getKeywords(keywords: string[]): Keyword[] {
    return keywords.map(keyword => {
        switch (keyword) {
            case 'Charge':
                return 'Charge'
            case 'Lethal':
                return 'Lethal'
            case 'Breakthrough':
                return 'Breakthrough'
            case 'Regenerate':
                return 'Regenerate'
            case 'Ward':
                return 'Ward'
            case 'Drain':
                return 'Drain'
            case 'Guard':
                return 'Guard'
            case 'Prophecy':
                return 'Prophecy'
            case 'Mobilize':
                return 'Mobilize'
            case 'Rally':
                return 'Rally'
            default:
                throw new Error(`Invalid keyword: ${keyword}`)
        }
    })
}

function getRace(race: string): Race {
    switch (race) {
        case 'Argonian':
            return 'Argonian'
        case 'Ash Creature':
            return 'Ash Creature'
        case 'Automaton':
            return 'Automaton'
        case 'Beast':
            return 'Beast'
        case 'Breton':
            return 'Breton'
        case 'Centaur':
            return 'Centaur'
        case 'Chaurus':
            return 'Chaurus'
        case 'Daedra':
            return 'Daedra'
        case 'Dark Elf':
            return 'Dark Elf'
        case 'Defense':
            return 'Defense'
        case 'Dragon':
            return 'Dragon'
        case 'Dreugh':
            return 'Dreugh'
        case 'Dwemer':
            return 'Dwemer'
        case 'Elytra':
            return 'Elytra'
        case 'Falmer':
            return 'Falmer'
        case 'Fabricant':
            return 'Fabricant'
        case 'Factotum':
            return 'Factotum'
        case 'Fish':
            return 'Fish'
        case 'Giant':
            return 'Giant'
        case 'Goblin':
            return 'Goblin'
        case 'God':
            return 'God'
        case 'Grummite':
            return 'Grummite'
        case 'Harpy':
            return 'Harpy'
        case 'High Elf':
            return 'High Elf'
        case 'Imperial':
            return 'Imperial'
        case 'Imp':
            return 'Imp'
        case 'Lurcher':
            return 'Lurcher'
        case 'Khajiit':
            return 'Khajiit'
        case 'Kwama':
            return 'Kwama'
        case 'Nereid':
            return 'Nereid'
        case 'Mammoth':
            return 'Mammoth'
        case 'Mantikora':
            return 'Mantikora'
        case 'Minotaur':
            return 'Minotaur'
        case 'Mudcrab':
            return 'Mudcrab'
        case 'Mummy':
            return 'Mummy'
        case 'Netch':
            return 'Netch'
        case 'Nord':
            return 'Nord'
        case 'Orc':
            return 'Orc'
        case 'Ogre':
            return 'Ogre'
        case 'Reachman':
            return 'Reachman'
        case 'Redguard':
            return 'Redguard'
        case 'Reptile':
            return 'Reptile'
        case 'Skeever':
            return 'Skeever'
        case 'Skeleton':
            return 'Skeleton'
        case 'Spider':
            return 'Spider'
        case 'Spirit':
            return 'Spirit'
        case 'Spriggan':
            return 'Spriggan'
        case 'Troll':
            return 'Troll'
        case 'Vampire':
            return 'Vampire'
        case 'Wamasu':
            return 'Wamasu'
        case 'Werewolf':
            return 'Werewolf'
        case 'Wolf':
            return 'Wolf'
        case 'Wood Elf':
            return 'Wood Elf'
        case 'Wraith':
            return 'Wraith'
        default:
            throw new Error(`Invalid Race: ${race}`)
    }
}

function getAttributes(attributes: string[]): Attribute[] {
    return attributes.map(attribute => {
        switch (attribute) {
            case 'Strength':
                return 'Strength'
            case 'Willpower':
                return 'Willpower'
            case 'Intelligence':
                return 'Intelligence'
            case 'Endurance':
                return 'Endurance'
            case 'Agility':
                return 'Agility'
            case 'Neutral':
                return 'Neutral'
            default:
                throw new Error(`Invalid attribute ${attribute}`)
        }
    })
}

function getSet(set: string): Set {
    switch (set.toLowerCase()) {
        case 'houses of morrowind':
            return 'Houses of Morrowind'
        case 'alliance war':
            return 'Alliance War'
        case 'clockwork city':
            return 'Clockwork City'
        case 'core':
            return 'Core'
        case 'dark brotherhood':
            return 'Dark Brotherhood'
        case 'forgotten hero':
            return 'Forgotten Hero'
        case 'frostfall':
            return 'Frostfall'
        case 'heroes of skyrim':
            return 'Heroes of Skyrim'
        case 'isle of madness':
            return 'Isle of Madness'
        case 'madhouse collection':
            return 'Madhouse Collection'
        case 'monthlies':
            return 'Monthly Reward'
        case 'festival of madness':
            return 'Festival of Madness'
        default:
            throw new Error(`Invalid set: ${set}`)
    }
}

function getRarity(rarity: string, isunique: boolean): Rarity {
    switch (rarity) {
        case 'Common':
            return 'Common'
        case 'Rare':
            return 'Rare'
        case 'Epic':
            return 'Epic'
        case 'Legendary':
            return isunique ? 'Unique Legendary' : 'Legendary'
        default:
            throw new Error(`Invalid rarity: ${rarity}`)
    }
}

function getCardType(input: string): CardType {
    switch (input) {
        case 'Action':
            return 'Action'
        case 'Creature':
            return 'Creature'
        case 'Item':
            return 'Item'
        case 'Support':
            return 'Support'
        case 'Double':
            return 'Double'
        default:
            throw new Error(`Invalid CardType: ${input}`)
    }
}
