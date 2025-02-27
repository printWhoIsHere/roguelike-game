import { DungeonGenerator } from '@/dungeon/generator'
import { Tile } from '@/types'
import { Renderer } from './renderer'

export class Game {
	private dungeon: Tile[][]
	private renderer: Renderer

	constructor(private canvas: HTMLCanvasElement) {
		const dungeonGenerator = new DungeonGenerator(50, 50)
		this.dungeon = dungeonGenerator.generateDungeon()
		this.renderer = new Renderer(this.canvas)

		this.canvas.width = 50 * 10 // width * tileSize
		this.canvas.height = 50 * 10 // height * tileSize
	}

	public start() {
		this.render()
	}

	private render() {
		this.renderer.render(this.dungeon)
	}
}
