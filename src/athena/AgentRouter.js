export function determineAgent(message) {
  const text = message.toLowerCase();

  if (
    text.includes("github") ||
    text.includes("repository") ||
    text.includes("repo")
  ) {
    return "github";
  }

  if (
    text.includes("resume") ||
    text.includes("cv")
  ) {
    return "resume";
  }

  if (
    text.includes("portfolio") ||
    text.includes("project")
  ) {
    return "portfolio";
  }

  return "chat";
}