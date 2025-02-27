import { Tile, IPoint } from '@/types'

export class Renderer {
	private readonly tileSize = 10

	constructor(private readonly canvas: HTMLCanvasElement) {}

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
				ctx.fillStyle = tile === 'floor' ? '#fff' : '#000'
				ctx.fillRect(
					x * this.tileSize,
					y * this.tileSize,
					this.tileSize,
					this.tileSize
				)
			}
		}
	}

	private drawPlayer(ctx: CanvasRenderingContext2D, player: IPoint): void {
		ctx.fillStyle = 'blue'
		ctx.fillRect(
			player.x * this.tileSize,
			player.y * this.tileSize,
			this.tileSize,
			this.tileSize
		)
	}
}
