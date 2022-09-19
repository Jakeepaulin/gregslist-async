import { appState } from "../AppState.js";
import { Job } from "../Models/Job.js";
import { Pop } from "../Utils/Pop.js";
import { SandboxServer } from "./AxiosService.js";

class JobsService {
  setActiveJob(id) {
    const job = appState.jobs.find((j) => j.id == id);
    // @ts-ignore
    appState.activeJob = job;
  }
  async deleteJob(id) {
    const yes = await Pop.confirm("Are you sure you want to Delete?");
    if (!yes) {
      return;
    }
    await SandboxServer.delete(`api/jobs/${id}`);
    appState.jobs = appState.jobs.filter((j) => j.id != id);
  }
  async getJobs() {
    const res = await SandboxServer.get("/api/jobs");
    console.log("Jobs", res);
    appState.jobs = res.data.map((j) => new Job(j));
  }

  async addJob(formData) {
    const res = await SandboxServer.post("/api/jobs", formData);
    let job = new Job(res.data);
    appState.jobs = [...appState.jobs, job];
  }
}

export const jobsService = new JobsService();
