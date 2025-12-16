# security-review-io

 This project was created after noticing a gap in the resources available for practicing security code reviews while preparing for security engineering interviews. Unlike platforms focused on CTFs —like PortSwigger, where the goal is to break into systems— security code review interviews I've seen have emphasized analyzing code for vulnerabilities, writing secure code, and demonstrating knowledge of best practices. This repository aims to fill that gap and help you prepare for those scenarios.

## What’s in This Repo?

- **Vulnerability Challenges:** A curated set of code review problems modeled after real security interview scenarios and common vulnerabilities.
- **Review & Solve Workflow:** An interface and data structure where you can browse, review, and submit solutions interactively.
- **Variety of Technologies:** Sample problems in Python, JavaScript, HTML, and more, mirroring the technologies you might see in interviews.
- **Learning Guidance:** Supporting materials and feedback plans to help you learn as you solve.

## Initial Setup

1. **Clone the Repository**
   
    a. `git clone https://github.com/your-username/security-review-io.git`

    b. `cd security-review-io`

2. **Install Dependencies**

    a. `cd frontend`

    b. `npm install`

3. **Run the Development Server**

    a. `npm run dev`

    b. The app should now be running at `http://localhost:3000`. For simplicity sake (and to spare me the hosting costs for now) the problems remain a public repo rather than a site currently. **With this in mind ensure you read the saving steps, as you need to export your progress to a json file to continue over multiple sessions**

4. **Explore Problems**
   - Browse to `/problems` in the app to access the library of code review scenarios.
   - Click on each problem to view, analyze, and submit your solutions.


## Saving Your Progress

**To avoid losing your work, you should always export your progress as a JSON file at the end of each session.** This is especially important because your progress is stored locally in your browser—if your browser data is cleared (manually or automatically), your progress will be lost.

### How to Export Your Progress

1. Go to the progress or settings section in the app.
2. Click the "Export Progress" button to download a JSON file containing all your solutions and challenge completions.
3. Save this JSON file titled **security-review-io-progress-{date}** in a safe location on your computer.

### How to Restore Your Progress

1. When returning to the app (or if using a new browser/device), go to the same progress or settings section.
2. Click "Import Progress" and select your previously exported JSON file.

**Regular exports are the only way to guarantee you won't lose your progress if your browser cache or data is cleared!**

If you have any questions about this process, please check the documentation or reach out for support.

## Solving Capabilities & Workflow

- **Browse Problems:** See a categorized list of code review challenges, each focusing on a key vulnerability or secure coding theme.
- **View Sample Code:** Each problem includes real code snippets—some intentionally vulnerable—for you to review.
- **Submit Solutions:** Enter your code review, vulnerability findings, or remediations using the provided submission interface.
- **Progress Tracking:** Monitor challenge completion and improvement via the progress tracker.
- **Integrated Feedback:** Some problems include feedback or hints to support learning.

---

Currently I'm still working on building the repo personally, but if you are interested in possibly joining me in this process feel free to reach out to me @ thomaspdean18@gmail.com.

Happy reviewing!