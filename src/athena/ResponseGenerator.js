const responseStrategies = {
  "github.analysis": githubAnalysisResponse,

  "github.repositories": githubRepositoriesResponse,

  "resume.analysis": resumeAnalysisResponse,

  "recruiter.analysis": recruiterAnalysisResponse,

  "portfolio.bestProject": portfolioResponse,
};

export function generateResponse(runtimeResult) {
  const formatter =
    responseStrategies[runtimeResult.responseType];

  if (!formatter) {
    return {
      title: "Athena",

      message:
        "Analysis completed successfully.",

      data: runtimeResult.data,
    };
  }

  return formatter(runtimeResult);
}

/* ============================================
   GitHub
============================================ */

function githubAnalysisResponse(result) {
  const github = result.data;

  return {
    title: "GitHub Analysis",

    message:
      "Your GitHub profile has been analyzed successfully.",

    summary:
      github.intelligence || github,

    executionTime:
      result.executionTime,

    fromMemory:
      result.fromMemory,
  };
}

function githubRepositoriesResponse(result) {
  return {
    title: "Repositories",

    message:
      "Repository analysis completed.",

    summary:
      result.data,

    executionTime:
      result.executionTime,

    fromMemory:
      result.fromMemory,
  };
}

/* ============================================
   Resume
============================================ */

function resumeAnalysisResponse(result) {
  const resume = result.data;

  return {
    title: "Resume Analysis",

    message:
      "Your resume has been analyzed.",

    summary:
      resume.intelligence || resume,

    executionTime:
      result.executionTime,

    fromMemory:
      result.fromMemory,
  };
}

/* ============================================
   Recruiter
============================================ */

function recruiterAnalysisResponse(result) {
  const recruiter = result.data;

  const report =
    recruiter.intelligence?.recruiterReport ??
    recruiter.recruiterReport ??
    recruiter;

  return {
    title: "Recruiter Evaluation",

    message:
      `Overall Hiring Score: ${report.overallHiringScore}/100`,

    summary: {

      recommendation:
        report.recommendation,

      confidence:
        report.recruiterConfidence,

      strengths:
        report.strengths,

      weaknesses:
        report.weakestAreas,

      actionPlan:
        report.actionPlan,

    },

    executionTime:
      result.executionTime,

    fromMemory:
      result.fromMemory,
  };
}

/* ============================================
   Portfolio
============================================ */

function portfolioResponse(result) {

  const portfolio =
    result.data.portfolio ??
    result.data;

  return {

    title:
      "Portfolio Review",

    message:
      "Portfolio evaluation completed.",

    summary:
      portfolio,

    executionTime:
      result.executionTime,

    fromMemory:
      result.fromMemory,

  };

}