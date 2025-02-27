import { randomInt } from '@/utils'
import { Tile, IRoom, IPoint } from '@/types'

export class DungeonGenerator {
	private map: Tile[][]
	private rooms: IRoom[]

	constructor(
		private width: number,
		private height: number,
		private minRoomSize: number = 5
	) {
		this.map = Array.from({ length: height }, () =>
			Array(width).fill('wall' as Tile)
		)
		this.rooms = []
	}

	public generateDungeon(): Tile[][] {
		const root = new BSPNode(0, 0, this.width, this.height)
		this.splitNode(root, 4)
		this.createRooms(root)
		this.connectRooms()
		this.ensureBorderWalls()
		return this.map
	}

	public createStartingRoom(): IPoint {
		const innerRoomSize = 3
		const outerRoomSize = innerRoomSize + 2
		const roomX = randomInt(0, this.width - outerRoomSize)
		const roomY = randomInt(0, this.height - outerRoomSize)

		for (let i = roomY; i < roomY + outerRoomSize; i++) {
			for (let j = roomX; j < roomX + outerRoomSize; j++) {
				if (i < this.height && j < this.width) {
					if (
						i === roomY ||
						i === roomY + outerRoomSize - 1 ||
						j === roomX ||
						j === roomX + outerRoomSize - 1
					) {
						this.map[i][j] = 'wall'
					} else {
						this.map[i][j] = 'floor'
					}
				}
			}
		}

		this.rooms.push({
			x: roomX + 1,
			y: roomY + 1,
			width: innerRoomSize,
			height: innerRoomSize,
		})

		return {
			x: roomX + Math.floor(outerRoomSize / 2),
			y: roomY + Math.floor(outerRoomSize / 2),
		}
	}

	private splitNode(node: BSPNode, depth: number): void {
		if (depth <= 0) return

		const splitHorizontal = Math.random() < 0.5
		if (splitHorizontal) {
			if (node.height < this.minRoomSize * 2) return
			const splitPos = randomInt(
				this.minRoomSize,
				node.height - this.minRoomSize
			)
			node.left = new BSPNode(node.x, node.y, node.width, splitPos)
			node.right = new BSPNode(
				node.x,
				node.y + splitPos,
				node.width,
				node.height - splitPos
			)
		} else {
			if (node.width < this.minRoomSize * 2) return
			const splitPos = randomInt(
				this.minRoomSize,
				node.width - this.minRoomSize
			)
			node.left = new BSPNode(node.x, node.y, splitPos, node.height)
			node.right = new BSPNode(
				node.x + splitPos,
				node.y,
				node.width - splitPos,
				node.height
			)
		}
		this.splitNode(node.left!, depth - 1)
		this.splitNode(node.right!, depth - 1)
	}

	private createRooms(node: BSPNode): void {
		if (node.left && node.right) {
			this.createRooms(node.left)
			this.createRooms(node.right)
		} else {
			const maxWidth = Math.min(node.width, this.width - node.x)
			const maxHeight = Math.min(node.height, this.height - node.y)
			const roomWidth = randomInt(this.minRoomSize, maxWidth)
			const roomHeight = randomInt(this.minRoomSize, maxHeight)
			const roomX = node.x + randomInt(0, node.width - roomWidth)
			const roomY = node.y + randomInt(0, node.height - roomHeight)

			if (
				roomX + roomWidth <= this.width &&
				roomY + roomHeight <= this.height
			) {
				this.rooms.push({
					x: roomX,
					y: roomY,
					width: roomWidth,
					height: roomHeight,
				})
				for (let i = roomY; i < roomY + roomHeight; i++) {
					for (let j = roomX; j < roomX + roomWidth; j++) {
						if (i < this.height && j < this.width) {
							this.map[i][j] = 'floor'
						}
					}
				}
			}
		}
	}

	private connectRooms(): void {
		for (let i = 1; i < this.rooms.length; i++) {
			const roomA = this.rooms[i - 1]
			const roomB = this.rooms[i]
			const pointA: IPoint = {
				x: Math.floor(roomA.x + roomA.width / 2),
				y: Math.floor(roomA.y + roomA.height / 2),
			}
			const pointB: IPoint = {
				x: Math.floor(roomB.x + roomB.width / 2),
				y: Math.floor(roomB.y + roomB.height / 2),
			}
			this.createCorridor(pointA, pointB)
		}
	}

	private createCorridor(pointA: IPoint, pointB: IPoint): void {
		let x = pointA.x
		let y = pointA.y
		while (x !== pointB.x || y !== pointB.y) {
			if (x < pointB.x) x++
			else if (x > pointB.x) x--
			else if (y < pointB.y) y++
			else if (y > pointB.y) y--
			if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
				this.map[y][x] = 'floor'
			}
		}
	}

	private ensureBorderWalls(): void {
		for (let i = 0; i < this.height; i++) {
			this.map[i][0] = 'wall'
			this.map[i][this.width - 1] = 'wall'
		}
		for (let j = 0; j < this.width; j++) {
			this.map[0][j] = 'wall'
			this.map[this.height - 1][j] = 'wall'
		}
	}
}

class BSPNode {
	constructor(
		public x: number,
		public y: number,
		public width: number,
		public height: number
	) {}
	left: BSPNode | null = null
	right: BSPNode | null = null
}
