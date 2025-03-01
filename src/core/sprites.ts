import { TILE_SIZE } from '@/constants'

interface SpriteCategory {
	image: HTMLImageElement
	loaded: boolean
}

export class Sprites {
	private sprites: Record<string, SpriteCategory> = {
		tiles: { image: new Image(), loaded: false },
		heroes: { image: new Image(), loaded: false },
		enemies: { image: new Image(), loaded: false },
	}

	constructor() {
		this.sprites.tiles.image.src = '/assets/sprites/tiles.png'
		this.sprites.heroes.image.src = '/assets/sprites/heroes.png'
		this.sprites.enemies.image.src = '/assets/sprites/enemies.png'
	}

	public async load(): Promise<void> {
		const loadPromises = Object.values(this.sprites).map((sprite) => {
			return new Promise<void>((resolve, reject) => {
				sprite.image.onload = () => {
					sprite.loaded = true
					resolve()
				}
				sprite.image.onerror = () =>
					reject(new Error(`Failed to load ${sprite.image.src}`))
			})
		})
		await Promise.all(loadPromises)
	}

	public getSpriteCoordinates(
		category: string,
		tileId: string
	): { x: number; y: number } {
		const [rowStr, colStr] = tileId.split('.')
		const row = parseInt(rowStr, 10)
		const col = colStr.charCodeAt(0) - 'a'.charCodeAt(0)
		return { x: col * TILE_SIZE, y: row * TILE_SIZE }
	}

	public getRandomSpriteCoordinates(
		category: string,
		tileVariants: string[]
	): { x: number; y: number } {
		const randomIndex = Math.floor(Math.random() * tileVariants.length)
		return this.getSpriteCoordinates(category, tileVariants[randomIndex])
	}

	public getSpritesheet(category: string): HTMLImageElement {
		const sprite = this.sprites[category]
		if (!sprite || !sprite.loaded) {
			throw new Error(`Spritesheet for category ${category} is not loaded`)
		}
		return sprite.image
	}
}
