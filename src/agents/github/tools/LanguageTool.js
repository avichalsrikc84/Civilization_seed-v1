export async function LanguageTool(repositories = [], getLanguages) {
  if (!repositories.length) {
    return {
      tool: 'LanguageTool',
      status: 'failed',
      timestamp: Date.now(),
      error: 'No repositories found',
      data: null,
    }
  }

  if (!getLanguages) {
    return {
      tool: 'LanguageTool',
      status: 'failed',
      timestamp: Date.now(),
      error: 'Language service not provided',
      data: null,
    }
  }

  const languageBytes = {}

  const repositoryLanguages = []

  for (const repo of repositories) {
    try {
      const languages = await getLanguages(
        repo.owner.login,
        repo.name
      )

      repositoryLanguages.push({
        repository: repo.name,
        languages,
      })

      for (const [language, bytes] of Object.entries(languages)) {
        languageBytes[language] =
          (languageBytes[language] || 0) + bytes
      }
    } catch (error) {
      console.warn(
        `Failed to fetch languages for ${repo.name}`
      )
    }
  }

  const totalBytes = Object.values(languageBytes).reduce(
    (sum, value) => sum + value,
    0
  )

  const distribution = Object.entries(languageBytes)
    .map(([language, bytes]) => ({
      language,
      bytes,
      percentage: Number(
        ((bytes / totalBytes) * 100).toFixed(2)
      ),
    }))
    .sort(
      (a, b) =>
        b.percentage - a.percentage
    )

  return {
    tool: 'LanguageTool',

    status: 'success',

    timestamp: Date.now(),

    data: {
      totalLanguages:
        distribution.length,

      languageBytes,

      languageDistribution:
        distribution,

      dominantLanguage:
        distribution[0] || null,

      repositoryLanguages,
    },
  }
}