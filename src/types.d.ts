export type Tile = 'floor' | 'wall'

export interface IRoom {
	x: number
	y: number
	width: number
	height: number
}

export interface IPoint {
	x: number
	y: number
}

export interface SpriteCoordinates {
	x: number
	y: number
}

export type Direction = 'up' | 'down' | 'left' | 'right'

export interface IEntity {
	position: IPoint
	health: number
	maxHealth: number
	damage: number
	speed: number

	move(direction: Direction, map: Tile[][]): boolean
	takeDamage(amount: number): void
	attack(target: IEntity): void
	isAlive(): boolean
	getPosition(): IPoint
	getHealth(): number
	getMaxHealth(): number
}

export interface IPlayer extends IEntity {
	mana: number
	maxMana: number
	inventory: string[]

	useAbility(abilityCost: number): boolean
	addToInventory(item: string): void
	getMana(): number
	getMaxMana(): number
	getInventory(): string[]
}

export type EnemyType = 'goblin' | 'skeleton' | 'orc'

export interface IEnemy extends IEntity {
	type: EnemyType
	aggroRange: number

	chasePlayer(playerPosition: IPoint, map: Tile[][]): void
	getType(): EnemyType
	getAggroRange(): number
}

// Интерфейс босса
export interface IBoss extends IEntity {
	phase: number
	abilities: string[]

	useBossAbility(abilityIndex: number, target: IEntity): void
	getPhase(): number
	getAbilities(): string[]
}
