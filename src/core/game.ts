import { DungeonGenerator } from '@/dungeon/generator'
import { Renderer } from './renderer'
import { InputHandler } from './input-handlers'
import { Player } from '@/entities/player'
import { Tile } from '@/types'
import { settings } from '@/settings'
import { TILE_SIZE } from '@/constants'

export class Game {
	private dungeon: Tile[][]
	private renderer: Renderer
	private inputHandler: InputHandler
	private player: Player

	constructor(private canvas: HTMLCanvasElement) {
		const { width, height, minRoomSize } = settings.dungeon.size.medium
		const dungeonGenerator = new DungeonGenerator(width, height, minRoomSize)
		this.dungeon = dungeonGenerator.generateDungeon()
		this.renderer = new Renderer(this.canvas)

		this.canvas.width = width * TILE_SIZE
		this.canvas.height = height * TILE_SIZE

		this.player = new Player(Math.floor(width / 2), Math.floor(height / 2))
		this.inputHandler = new InputHandler(this.player, this.dungeon, () =>
			this.render()
		)
	}

	public start() {
		this.gameLoop()
	}

	private gameLoop() {
		this.render()
		requestAnimationFrame(() => this.gameLoop())
	}

	private render() {
		this.renderer.render(this.dungeon, { x: this.player.x, y: this.player.y })
	}
}
