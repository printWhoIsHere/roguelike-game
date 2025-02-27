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
		return this.map
	}

	private splitNode(node: BSPNode, depth: number): void {
		if (depth <= 0) return
		const splitHorizontal = Math.random() < 0.5
		if (splitHorizontal) {
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
		this.splitNode(node.left, depth - 1)
		this.splitNode(node.right, depth - 1)
	}

	private createRooms(node: BSPNode): void {
		if (node.left && node.right) {
			this.createRooms(node.left)
			this.createRooms(node.right)
		} else {
			const roomWidth = randomInt(this.minRoomSize, node.width)
			const roomHeight = randomInt(this.minRoomSize, node.height)
			const roomX = node.x + randomInt(0, node.width - roomWidth)
			const roomY = node.y + randomInt(0, node.height - roomHeight)
			this.rooms.push({
				x: roomX,
				y: roomY,
				width: roomWidth,
				height: roomHeight,
			})
			for (let i = roomY; i < roomY + roomHeight; i++) {
				for (let j = roomX; j < roomX + roomWidth; j++) {
					this.map[i][j] = 'floor'
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
			this.map[y][x] = 'floor'
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
