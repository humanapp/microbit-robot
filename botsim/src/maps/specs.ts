import { Vec2Like } from "../types/vec2"

/// Spawn

export type SpawnSpec = {
    pos: Vec2Like
    angle: number
}

export const defaultSpawn = (): SpawnSpec => ({
    pos: { x: 40, y: 40 },
    angle: 90,
})

/// Shapes

export type ShapeSpec =
    | PathShapeSpec
    | BoxShapeSpec
    | CircleShapeSpec
    | PolygonShapeSpec
    | EdgeShapeSpec

export type ShapeType = "path" | "box" | "circle" | "polygon" | "edge"

type ShapeCommonSpec = {
    type: ShapeType
    label?: string
}

export type PathShapeSpec = ShapeCommonSpec & {
    type: "path"
    verts: Vec2Like[]
    width: number // cm
}

export const defaultPathShape = (): PathShapeSpec => ({
    type: "path",
    verts: [], // TODO: make an interesting default
    width: 5,
})

export type BoxShapeSpec = ShapeCommonSpec & {
    type: "box"
    size: Vec2Like // cm
}

export const defaultBoxShape = (): BoxShapeSpec => ({
    type: "box",
    size: { x: 20, y: 20 },
})

export type CircleShapeSpec = ShapeCommonSpec & {
    type: "circle"
    radius: number // cm
}

export const defaultCircleShape = (): CircleShapeSpec => ({
    type: "circle",
    radius: 10,
})

export type PolygonShapeSpec = ShapeCommonSpec & {
    type: "polygon"
    verts: Vec2Like[]
}

export const defaultPolygonShape = (): PolygonShapeSpec => ({
    type: "polygon",
    verts: [], // TODO: make an interesting default
})

export type EdgeShapeSpec = ShapeCommonSpec & {
    type: "edge"
    v0: Vec2Like
    v1: Vec2Like
    vPrev?: Vec2Like
    vNext?: Vec2Like
}

export const defaultEdgeShape = (): EdgeShapeSpec => ({
    type: "edge",
    v0: { x: 0, y: 0 },
    v1: { x: 20, y: 20 },
})

/// Physical shapes

export type ShapePhysicsSpec = {
    density: number
    friction: number
    restitution: number
    sensor: boolean
    maskBits?: number
    categoryBits?: number
}

export const defaultShapePhysics = (): ShapePhysicsSpec => ({
    density: 0.1,
    friction: 0.2,
    restitution: 0.2,
    sensor: false,
})

/// Entity Shape

type EntityShapeCommonSpec = {
    offset: Vec2Like // cm, offset from entity origin
    angle: number // degrees
    physics: ShapePhysicsSpec
    brush: BrushSpec
}

export type EntityBoxShapeSpec = BoxShapeSpec & EntityShapeCommonSpec
export type EntityCircleShapeSpec = CircleShapeSpec & EntityShapeCommonSpec
export type EntityPolygonShapeSpec = PolygonShapeSpec & EntityShapeCommonSpec
export type EntityEdgeShapeSpec = EdgeShapeSpec & EntityShapeCommonSpec
export type EntityPathShapeSpec = PathShapeSpec & EntityShapeCommonSpec
export type EntityShapeSpec =
    | EntityBoxShapeSpec
    | EntityCircleShapeSpec
    | EntityPolygonShapeSpec
    | EntityEdgeShapeSpec
    | EntityPathShapeSpec

export const defaultEntityShape = (): EntityShapeSpec => ({
    ...defaultBoxShape(),
    offset: { x: 0, y: 0 },
    angle: 0,
    physics: defaultShapePhysics(),
    brush: defaultColorBrush(),
})

/// Entity

export type EntitySpec = {
    label?: string
    pos: Vec2Like // cm
    angle: number // degrees
    physics: EntityPhysicsSpec
    shapes: EntityShapeSpec[]
    children?: EntitySpec[]
}

export const defaultEntity = (): EntitySpec => ({
    ...defaultBoxShape(),
    pos: { x: 20, y: 20 },
    angle: 0,
    physics: defaultDynamicPhysics(),
    shapes: [],
})

/// Joints

export type JointType = "revolute" | "prismatic" | "distance" | "weld" | "mouse"

export type JointSpec = {
    type: JointType
    transformToParent?: boolean
}

export const defaultJoint = (): JointSpec => ({
    type: "revolute",
})

// TODO: add specs for specific joint types

/// Entity Physics

export type EntityPhysicsType = "dynamic" | "static"

export type EntityPhysicsSpec = {
    type: EntityPhysicsType
    angularDamping: number
    linearDamping: number
    fixedRotation?: boolean
    joint?: JointSpec // When this entity is childed to another, this is the kind of joint to use.
}

export const defaultDynamicPhysics = (): EntityPhysicsSpec => ({
    type: "dynamic",
    angularDamping: 0,
    linearDamping: 0,
})

export const defaultStaticPhysics = (): EntityPhysicsSpec => ({
    type: "static",
    angularDamping: 0,
    linearDamping: 0,
})

/// Brushes

export type BrushSpec = ColorBrushSpec | TextureBrushSpec | PatternBrushSpec

export type BrushType = "color" | "texture" | "pattern"

type BrushCommonSpec = {
    type: BrushType
    zIndex?: number
}

export type ColorBrushSpec = BrushCommonSpec & {
    type: "color"
    borderColor: string
    borderWidth: number // cm
    fillColor: string
}

export const defaultColorBrush = (): ColorBrushSpec => ({
    type: "color",
    borderColor: "#FF1053",
    borderWidth: 0.25,
    fillColor: "#EAD637",
    zIndex: 0,
})

export type TextureBrushSpec = BrushCommonSpec & {
    type: "texture"
    resource: string
    // TODOL u, v, wrap, etc.
}

export type PatternType = "lines" | "grid" | "hatch" | "blobs"

export type PatternBrushSpec = BrushCommonSpec & {
    type: "pattern"
    pattern: PatternType
    scale: Vec2Like
    variance: Vec2Like
    density: Vec2Like
    amplitude: Vec2Like
    angle: number
    fillColor: string
    lineColor: string
    lineWidth: string
}

/// Map

export type MapSpec = {
    name: string
    size: Vec2Like // cm
    color: string // background color
    spawn: SpawnSpec // robot spawn location
    entities: EntitySpec[] // obstacles, etc.
}
