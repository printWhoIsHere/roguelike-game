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

export interface IEntity {
	health: number
	position: IPoint
	visionRadius: number
}

export interface IPlayer extends IEntity {
	mana: number
	armor: number
	// inventory: string[]
}
