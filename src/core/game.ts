import { Renderer } from './renderer'
import { InputHandler } from './input-handlers'
import { Player } from '@/entities/player'
import { TILE_SIZE } from '@/constants'
import { settings } from '@/settings'
import { DungeonManager } from '@/dungeon/manager'

export class Game {
	private dungeonManager: DungeonManager
	private renderer: Renderer
	private inputHandler: InputHandler
	private player: Player

	constructor(private canvas: HTMLCanvasElement) {
		this.dungeonManager = new DungeonManager('medium')
		this.renderer = new Renderer(this.canvas)

		const { width, height } = settings.dungeon.size.medium
		this.canvas.width = width * TILE_SIZE
		this.canvas.height = height * TILE_SIZE

		const startingPosition = this.dungeonManager.getStartingPosition()
		this.player = new Player(startingPosition)
		this.inputHandler = new InputHandler(
			this.player,
			this.dungeonManager.getDungeon(),
			() => this.render()
		)
	}

	public start(): void {
		this.gameLoop()
	}

	private gameLoop(): void {
		this.render()
		requestAnimationFrame(() => this.gameLoop())
	}

	private render(): void {
		this.renderer.render(
			this.dungeonManager.getDungeon(),
			this.player.getPosition()
		)
	}
}
