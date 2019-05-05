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
    const rawData: Buffer = fs.readFileSync('./cards/genders.json')
    const data: { name: string; gender: Gender }[] = JSON.parse(
        rawData.toString()
    )
    const arr: [string, Gender][] = []
    data.forEach(({ name, gender }) => arr.push([name, _getGender(gender)]))
    return new Map(arr)
}

function makeCardArray(): Card[] {
    const cards: MarioCard[] = getMariosCards()
    const genderMap: Map<string, Gender> = getGenderMap()
    return cards.map(card => {
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
    throw new Error(`Invalid gender '${gender}' for ${name}`)
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
        case 'Beast':
            return 'Beast'
        case 'Breton':
            return 'Breton'
        case 'Daedra':
            return 'Daedra'
        case 'Dark Elf':
            return 'Dark Elf'
        case 'Defense':
            return 'Defense'
        case 'Dreugh':
            return 'Dreugh'
        case 'Dwemer':
            return 'Dwemer'
        case 'Fish':
            return 'Fish'
        case 'God':
            return 'God'
        case 'High Elf':
            return 'High Elf'
        case 'Imperial':
            return 'Imperial'
        case 'Khajiit':
            return 'Khajiit'
        case 'Kwama':
            return 'Kwama'
        case 'Mammoth':
            return 'Mammoth'
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
        case 'Vampire':
            return 'Vampire'
        case 'Werewolf':
            return 'Werewolf'
        case 'Wolf':
            return 'Wolf'
        case 'Wood Elf':
            return 'Wood Elf'
        default:
            throw new Error(`Invalid race: ${race}`)
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
    switch (set) {
        case 'Houses of Morrowind':
            return 'Houses of Morrowind'
        case 'Alliance War':
            return 'Alliance War'
        case 'Clockwork City':
            return 'Clockwork City'
        case 'Core':
            return 'Core'
        case 'Dark Brotherhood':
            return 'Dark Brotherhood'
        case 'Forgotten Hero':
            return 'Forgotten Hero'
        case 'Frostfall':
            return 'Frostfall'
        case 'Heroes of Skyrim':
            return 'Heroes of Skyrim'
        case 'Isle of Madness':
            return 'Isle of Madness'
        case 'Madhouse Collection':
            return 'Madhouse Collection'
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
        default:
            throw new Error(`Invalid CardType: ${input}`)
    }
}
