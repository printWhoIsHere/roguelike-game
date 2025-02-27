import { IEntity, IPoint } from '@/types'

export class Entity {
	protected health: number
	protected position: IPoint
	protected visionRadius: number

	constructor({ health, position, visionRadius }: IEntity) {
		this.health = health
		this.position = position
		this.visionRadius = visionRadius
	}

	public move(dx: number, dy: number): void {
		this.position.x += dx
		this.position.y += dy
	}

	public takeDamage(amount: number): void {
		const damageAfterArmor = amount - this.armor
		this.health -= damageAfterArmor > 0 ? damageAfterArmor : 0
		if (this.health < 0) this.health = 0
	}

	// Нанесение урона (будет переопределено в наследниках)
	public dealDamage(target: Entity): void {}

	public getVisionRadius(): number {
		return this.visionRadius
	}

	public getPosition(): IPoint {
		return { x: this.position.x, y: this.position.y }
	}
}
