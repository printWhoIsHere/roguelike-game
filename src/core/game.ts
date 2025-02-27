import { DungeonGenerator } from '@/dungeon/generator'
import { Renderer } from './renderer'
import { InputHandlers } from './input-handlers'
import { Player } from '@/entities/player'
import { Tile } from '@/types'

export class Game {
	private dungeon: Tile[][]
	private renderer: Renderer
	private inputHandler: InputHandlers
	private player: Player

	constructor(private canvas: HTMLCanvasElement) {
		const dungeonGenerator = new DungeonGenerator(50, 50)
		this.dungeon = dungeonGenerator.generateDungeon()
		this.renderer = new Renderer(this.canvas)

		this.canvas.width = 50 * 10
		this.canvas.height = 50 * 10

		this.player = new Player(25, 25)
		this.inputHandler = new InputHandlers(this.player, this.dungeon, () =>
			this.render()
		)
	}

	public start() {
		this.render()
	}

	private render() {
		this.renderer.render(this.dungeon, { x: this.player.x, y: this.player.y })
	}
}
