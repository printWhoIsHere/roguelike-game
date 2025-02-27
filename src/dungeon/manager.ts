import { DungeonGenerator } from '@/dungeon/generator'
import { settings } from '@/settings'
import { Tile, IPoint } from '@/types'

export class DungeonManager {
	private dungeonGenerator: DungeonGenerator
	private dungeon: Tile[][]
	private startingPosition: IPoint

	constructor(
		size: keyof typeof settings.dungeon.size = 'medium',
		width?: number,
		height?: number,
		minRoomSize?: number
	) {
		const {
			width: defaultWidth,
			height: defaultHeight,
			minRoomSize: defaultMinRoomSize,
		} = settings.dungeon.size[size]
		this.dungeonGenerator = new DungeonGenerator(
			width || defaultWidth,
			height || defaultHeight,
			minRoomSize || defaultMinRoomSize
		)
		this.startingPosition = this.dungeonGenerator.createStartingRoom()
		this.dungeon = this.dungeonGenerator.generateDungeon()
	}

	public getDungeon(): Tile[][] {
		return this.dungeon
	}

	public getStartingPosition(): IPoint {
		return this.startingPosition
	}

	public regenerateDungeon(size: keyof typeof settings.dungeon.size): void {
		const { width, height, minRoomSize } = settings.dungeon.size[size]
		this.dungeonGenerator = new DungeonGenerator(width, height, minRoomSize)
		this.startingPosition = this.dungeonGenerator.createStartingRoom()
		this.dungeon = this.dungeonGenerator.generateDungeon()
	}
}
