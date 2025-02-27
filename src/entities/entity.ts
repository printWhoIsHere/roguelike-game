import { IPoint, Tile, Direction, IEntity } from '@/types'
export abstract class Entity implements IEntity {
	public health: number
	public maxHealth: number
	public damage: number
	public speed: number

	constructor(
		public position: IPoint,
		maxHealth: number,
		damage: number,
		speed: number
	) {
		this.position = { ...position }
		this.maxHealth = maxHealth
		this.health = maxHealth
		this.damage = damage
		this.speed = speed
	}

	public move(direction: Direction, map: Tile[][]): boolean {
		let newX = this.position.x
		let newY = this.position.y

		switch (direction) {
			case 'up':
				newY--
				break
			case 'down':
				newY++
				break
			case 'left':
				newX--
				break
			case 'right':
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
			this.position.x = newX
			this.position.y = newY
			return true
		}
		return false
	}

	public takeDamage(amount: number): void {
		this.health = Math.max(0, this.health - amount)
	}

	public attack(target: IEntity): void {
		target.takeDamage(this.damage)
	}

	public isAlive(): boolean {
		return this.health > 0
	}

	public getPosition(): IPoint {
		return { ...this.position }
	}

	public getHealth(): number {
		return this.health
	}

	public getMaxHealth(): number {
		return this.maxHealth
	}
}
