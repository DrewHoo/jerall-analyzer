export type Card = Action | Creature | Support | Item

type BaseCard = {
    type: CardType
    name: string
    rarity: Rarity
    set: Set
    attributes: Attribute[]
    cost: number
    keywords: Keyword[]
    text?: string[]
    collectible: boolean
}

export type CardType = 'Action' | 'Item' | 'Support' | 'Creature'

export type Action = BaseCard & {
    type: 'Action'
    text: string[]
}
export type Creature = BaseCard & {
    type: 'Creature'
    power: number
    health: number
    race: Race[]
    gender: Gender
}
export type Support = BaseCard & {
    type: 'Support'
    activations?: number
    text: string[]
}
export type Item = BaseCard & {
    type: 'Item'
    text: string[]
}

export type Rarity =
    | 'Common'
    | 'Rare'
    | 'Epic'
    | 'Legendary'
    | 'Unique Legendary'
export type Mechanic =
    | 'Assemble'
    | 'Last Gasp'
    | 'Battle'
    | 'Beast Form'
    | 'Betray'
    | 'Empower'
    | 'Exalt'
export type Set =
    | 'Core'
    | 'Clockwork City'
    | 'Houses of Morrowind'
    | 'Dark Brotherhood'
    | 'Heroes of Skyrim'
    | 'Forgotten Hero'
    | 'Frostfall'
    | 'Madhouse Collection'
    | 'Isle of Madness'
    | 'Alliance War'
export type Keyword =
    | 'Prophecy'
    | 'Lethal'
    | 'Guard'
    | 'Regenerate'
    | 'Drain'
    | 'Breakthrough'
    | 'Ward'
    | 'Charge'
    | 'Rally'
export type Attribute =
    | 'Strength'
    | 'Intelligence'
    | 'Endurance'
    | 'Agility'
    | 'Willpower'
    | 'Neutral'
export type Gender = 'Male' | 'Female' | 'Nonbinary' | 'Unknown'
export type Race =
    | Animal
    | Undead
    | 'God'
    | 'Orc'
    | 'Redguard'
    | 'Dark Elf'
    | 'High Elf'
    | 'Wood Elf'
    | 'Dwemer'
    | 'Breton'
    | 'Argonian'
    | 'Khajiit'
    | 'Nord'
    | 'Imperial'
    | 'Daedra'
    | 'Werewolf'
    | 'Dreugh'
    | 'Ash Creature'
    | 'Kwama'
    | 'Defense'
export type Undead = 'Skeleton' | 'Vampire' | 'Mummy' | 'Spirit'
export type Animal =
    | 'Beast'
    | 'Fish'
    | 'Mammoth'
    | 'Mudcrab'
    | 'Netch'
    | 'Reptile'
    | 'Skeever'
    | 'Spider'
    | 'Wolf'
