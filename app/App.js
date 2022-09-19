import { JobsController } from "./Controllers/JobsController.js";

class App {
  jobsController = new JobsController();
}

window["app"] = new App();
