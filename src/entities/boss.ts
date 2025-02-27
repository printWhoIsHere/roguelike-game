import { Entity } from './entity'
import { IPoint, IBoss, IEntity } from '@/types'

export class Boss extends Entity implements IBoss {
	public phase: number
	public abilities: string[]

	constructor(position: IPoint, abilities: string[] = ['fireball', 'stomp']) {
		super(position, 200, 20, 0.5)
		this.phase = 1
		this.abilities = abilities
	}

	public useBossAbility(abilityIndex: number, target: IEntity): void {
		if (abilityIndex >= 0 && abilityIndex < this.abilities.length) {
			const abilityDamage = this.damage * (this.phase === 2 ? 1.5 : 1)
			target.takeDamage(abilityDamage)
			if (this.health < this.maxHealth / 2 && this.phase === 1) {
				this.phase = 2
			}
		}
	}

	public getPhase(): number {
		return this.phase
	}

	public getAbilities(): string[] {
		return [...this.abilities]
	}
}
