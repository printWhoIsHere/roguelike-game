import { Tile } from '@/types'
import { Direction } from '@/core/input-handlers'

export class Player {
	constructor(public x: number, public y: number) {}

	public move(direction: Direction, map: Tile[][]): boolean {
		let newX = this.x
		let newY = this.y

		switch (direction) {
			case Direction.Up:
				newY--
				break
			case Direction.Down:
				newY++
				break
			case Direction.Left:
				newX--
				break
			case Direction.Right:
				newX++
				break
		}

		if (
			newX >= 0 &&
			newX < map[0].length &&
			newY >= 0 &&
			newY < map.length &&
			map[newY][newX] === 'floor'
		) {
			this.x = newX
			this.y = newY
			return true
		}
		return false
	}
}
