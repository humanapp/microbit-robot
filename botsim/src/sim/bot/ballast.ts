import { BotSpec } from "../../bots/specs"
import {
    EntityShapeSpec,
    defaultBoxShape,
    defaultColorBrush,
    defaultDynamicPhysics,
} from "../../maps/specs"

export function makeBallastSpec(botSpec: BotSpec): EntityShapeSpec {
    return {
        ...defaultBoxShape(),
        label: "ballast",
        offset: botSpec.ballast.pos,
        angle: 0,
        size: botSpec.ballast.size,
        brush: {
            ...defaultColorBrush(),
            fillColor: "transparent",
            borderColor: "black",
            borderWidth: 0,
        },
        physics: {
            ...defaultDynamicPhysics(),
            sensor: true,
            density:
                botSpec.ballast.mass /
                (botSpec.ballast.size.x * botSpec.ballast.size.y),
            friction: 0,
            restitution: 0,
        },
    }
}
