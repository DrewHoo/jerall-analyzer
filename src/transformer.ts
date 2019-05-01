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

const data: MarioCard[] = fs.readFile()
const fixText = (text: string) =>
    text.split(/[\n\r]/g).filter(str => str.length)

data.filter(({ set }) => set === 'Houses of Morrowind')
    .map(card => {
        const { id, isunique, attack, health, race, text, ...rest } = card
        return {
            collectible: true,
            ...rest,
            ...(race ? { race: [race], power: attack, health } : {}),
            ...(isunique ? { rarity: 'Unique Legendary' } : {}),
            ...(text ? { text: fixText(text) } : {}),
        }
    })
    .slice(50)
