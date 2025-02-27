import { Entity } from './entity'
import { IPoint, IPlayer } from '@/types'

export class Player extends Entity implements IPlayer {
	public mana: number
	public maxMana: number
	public inventory: string[]

	constructor(position: IPoint) {
		super(position, 100, 10, 1)
		this.mana = 50
		this.maxMana = 50
		this.inventory = []
	}

	public useAbility(abilityCost: number): boolean {
		if (this.mana >= abilityCost) {
			this.mana -= abilityCost
			return true
		}
		return false
	}

	public addToInventory(item: string): void {
		this.inventory.push(item)
	}

	public getMana(): number {
		return this.mana
	}

	public getMaxMana(): number {
		return this.maxMana
	}

	public getInventory(): string[] {
		return [...this.inventory]
	}
}
