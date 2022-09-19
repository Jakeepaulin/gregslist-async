export class Job {
  /**
   * The data needed to make a car
   * @param {{company: string, jobTitle: string, hours: number, rate: number, description: string, imgUrl: string, id?:string}} data
   */
  constructor(data) {
    this.company = data.company;
    this.jobTitle = data.jobTitle;
    this.hours = data.hours;
    this.rate = data.rate;
    this.description = data.description;
    this.id = data.id;
    this.imgUrl = data.imgUrl;
  }

  get JobCardTemplate() {
    return /*html*/ `
     <div class="col-md-4 col-lg-3 mb-3">
       <div class="card">
         <div class="card-body">
           <h5 class="text-uppercase">${this.company}</h5>
           <h6>Job Title: ${this.jobTitle}</h6>
           <p>${this.hours} hours/week</p>
           <p>$ ${this.rate}/hour</p>
           <p>${this.description}</p>
         </div>
         <div class="card-footer d-flex align-items-center justify-content-around">
          <button class="btn text-uppercase" onclick="app.jobsController.deleteJob('${this.id}')">Delete</button>
          <button class="btn text-uppercase text-success" data-bs-toggle="offcanvas" data-bs-target="#banana" onclick="app.jobsController.beginEdit('${this.id}')">Edit</button>
        </div>
       </div>
     </div>;
     `;
  }

  static getJobForm(editable) {
    editable = editable || new Job({ description: "", imgUrl: " ", company: "", jobTitle: "", rate: 0, hours: 0 });

    return /*html*/ `
        <form onsubmit="app.jobsController.handleSubmit()">
          <div class="form-floating mb-3">
            <input type="text" class="form-control" name="company" required minlength="3" maxlength="20" />
            <label for="company">Company</label>
          </div>

          <div class="form-floating mb-3">
            <input type="text" class="form-control" name="jobTitle" required />
            <label for="company">Job Title</label>
          </div>

          <div class="form-floating mb-3">
            <input type="number" class="form-control" name="hours" required min="0" max="999" />
            <label for="hours">Hours</label>
          </div>

          <div class="form-floating mb-3">
            <input type="number" class="form-control" name="rate" required min="0" />
            <label for="rate">Rate</label>
          </div>

          <div class="form-floating">
            <textarea class="form-control" placeholder="Describe your Listing" name="description"></textarea>
            <label for="description">Description</label>
          </div>

          <div class="d-flex my-4 gap-5 align-items-center">
            <button class="btn" type="reset">Cancel</button>
            <button class="btn btn-primary" type="submit">Submit</button>
          </div>
        </form>
     `;
  }
}
