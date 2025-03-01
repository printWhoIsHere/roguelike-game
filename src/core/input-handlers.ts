import { IPlayer, Tile } from '@/types'

export class InputHandler {
	constructor(
		private player: IPlayer,
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
				moved = this.player.move('up', this.map)
				break
			case 'ArrowDown':
			case 's':
			case 'S':
				moved = this.player.move('down', this.map)
				break
			case 'ArrowLeft':
			case 'a':
			case 'A':
				moved = this.player.move('left', this.map)
				break
			case 'ArrowRight':
			case 'd':
			case 'D':
				moved = this.player.move('right', this.map)
				break
		}

		if (moved) {
			this.onMove()
		}
	}
}
