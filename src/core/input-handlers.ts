import { Player } from '@/entities/player'
import { Tile } from '@/types'

export enum Direction {
	Up = 'up',
	Down = 'down',
	Left = 'left',
	Right = 'right',
}

export class InputHandler {
	constructor(
		private player: Player,
		private map: Tile[][],
		private onMove: () => void
	) {
		this.setupListeners()
	}

	public setupListeners(): void {
		window.addEventListener('keydown', this.handleKeyDown.bind(this))
	}

	public destroy(): void {
		window.removeEventListener('keydown', this.handleKeyDown.bind(this))
	}

	private handleKeyDown(event: KeyboardEvent): void {
		let moved = false

		switch (event.key) {
			case 'ArrowUp':
			case 'w':
			case 'W':
				moved = this.player.move(Direction.Up, this.map)
				break
			case 'ArrowDown':
			case 's':
			case 'S':
				moved = this.player.move(Direction.Down, this.map)
				break
			case 'ArrowLeft':
			case 'a':
			case 'A':
				moved = this.player.move(Direction.Left, this.map)
				break
			case 'ArrowRight':
			case 'd':
			case 'D':
				moved = this.player.move(Direction.Right, this.map)
				break
		}

		if (moved) {
			this.onMove()
		}
	}
}
