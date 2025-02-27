import { Entity } from './entity'
import { IPoint, Tile, IEnemy, EnemyType } from '@/types'

export class Enemy extends Entity implements IEnemy {
	constructor(
		position: IPoint,
		public type: EnemyType,
		public aggroRange: number,
		maxHealth: number = 50,
		damage: number = 5,
		speed: number = 1
	) {
		super(position, maxHealth, damage, speed)
	}

	public chasePlayer(playerPosition: IPoint, map: Tile[][]): void {
		const dx = playerPosition.x - this.position.x
		const dy = playerPosition.y - this.position.y
		const distance = Math.sqrt(dx * dx + dy * dy)

		if (distance <= this.aggroRange) {
			if (Math.abs(dx) > Math.abs(dy)) {
				this.move(dx > 0 ? 'right' : 'left', map)
			} else {
				this.move(dy > 0 ? 'down' : 'up', map)
			}
		}
	}

	public getType(): EnemyType {
		return this.type
	}

	public getAggroRange(): number {
		return this.aggroRange
	}
}
