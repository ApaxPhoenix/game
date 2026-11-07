// Modules

import { config } from "shared/lighting/config";
import { start } from "shared/lighting/main";

// Initialization

if (config.client) {
	start();
}
