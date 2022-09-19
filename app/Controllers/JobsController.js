import { appState } from "../AppState.js";
import { Job } from "../Models/Job.js";
import { jobsService } from "../Services/JobsService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";

function drawJobs() {
  let template = "";
  appState.jobs.forEach((job) => (template += job.JobCardTemplate));
  setHTML("listings", template);
}

export class JobsController {
  constructor() {
    console.log("Jobs Incoming");
    drawJobs();
    this.showJobs();
    this.getJobs();
    appState.on("jobs", drawJobs);
  }
  async getJobs() {
    try {
      await jobsService.getJobs();
    } catch (error) {
      error.log("[ERROR]", error);
      Pop.error(error);
    }
  }
  showJobs() {
    drawJobs();
    this.getJobs;
    setHTML("forms", Job.getJobForm());
  }

  addJob() {
    const template = Job.getJobForm();
    // @ts-ignore
    appState.activeJob = null;
    setHTML("forms", template);
  }

  async deleteJob(id) {
    try {
      await jobsService.deleteJob(id);
    } catch (error) {
      error.log("[ERROR]");
      Pop.error(error);
    }
  }

  async handleSubmit() {
    try {
      // @ts-ignore
      window.event.preventDefault();
      // @ts-ignore
      const form = window.event.target;
      let formData = getFormData(form);
      await jobsService.addJob(formData);
      console.log("Job Added");

      // @ts-ignore
      form.reset();
    } catch (error) {
      error.log("[ERROR]", error);
    }
  }

  beginEdit(id) {
    jobsService.setActiveJob(id);
    const editable = appState.activeJob;
    const template = Job.getJobForm(editable);
    setHTML("forms", template);
  }
}
