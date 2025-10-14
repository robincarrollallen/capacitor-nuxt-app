import mitt from "mitt"
import type { EventConfig } from "./config"

export const emitter = mitt<EventConfig>()
