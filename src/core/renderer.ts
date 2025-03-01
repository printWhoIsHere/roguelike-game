import { TILE_SIZE } from '@/constants'
import { Tile, IPoint } from '@/types'
import { Sprites } from './sprites'

export class Renderer {
	private tileSprites: Record<Tile, string | string[]> = {
		wall: ['11.b', '11.c', '11.d'],
		floor: '0.c',
	}
	private floorTileCache: Map<string, string> = new Map()

	constructor(
		private readonly canvas: HTMLCanvasElement,
		private readonly sprites: Sprites
	) {}

	render(map: Tile[][], player?: IPoint): void {
		const ctx = this.canvas.getContext('2d')!
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

		this.drawDungeon(ctx, map)
		if (player) {
			this.drawPlayer(ctx, player)
		}
	}

	private drawDungeon(ctx: CanvasRenderingContext2D, map: Tile[][]): void {
		for (let y = 0; y < map.length; y++) {
			for (let x = 0; x < map[0].length; x++) {
				const tile = map[y][x]
				const spriteId = this.tileSprites[tile]
				let coords: { x: number; y: number }

				if (Array.isArray(spriteId)) {
					// Используем кэш для статичного выбора пола
					const cacheKey = `${x},${y}`
					let selectedSprite = this.floorTileCache.get(cacheKey)
					if (!selectedSprite) {
						selectedSprite =
							spriteId[Math.floor(Math.random() * spriteId.length)]
						this.floorTileCache.set(cacheKey, selectedSprite)
					}
					coords = this.sprites.getSpriteCoordinates('tiles', selectedSprite)
				} else {
					coords = this.sprites.getSpriteCoordinates('tiles', spriteId)
				}

				ctx.drawImage(
					this.sprites.getSpritesheet('tiles'),
					coords.x,
					coords.y,
					TILE_SIZE,
					TILE_SIZE,
					x * TILE_SIZE,
					y * TILE_SIZE,
					TILE_SIZE,
					TILE_SIZE
				)
			}
		}
	}

	private drawPlayer(ctx: CanvasRenderingContext2D, player: IPoint): void {
		const spriteId = '1.b' // Пример для игрока
		const coords = this.sprites.getSpriteCoordinates('heroes', spriteId)
		ctx.drawImage(
			this.sprites.getSpritesheet('heroes'),
			coords.x,
			coords.y,
			TILE_SIZE,
			TILE_SIZE,
			player.x * TILE_SIZE,
			player.y * TILE_SIZE,
			TILE_SIZE,
			TILE_SIZE
		)
	}
}
