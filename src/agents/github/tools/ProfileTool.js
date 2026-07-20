export async function ProfileTool(profile) {
  if (!profile) {
    return {
      tool: 'ProfileTool',

      status: 'failed',

      timestamp: Date.now(),

      error: 'Profile not found',

      data: null,
    }
  }

  const created =
    new Date(profile.created_at)

  const now = new Date()

  const accountAge =
    Math.floor(
      (now - created) /
        (1000 * 60 * 60 * 24 * 365)
    )

  return {
    tool: 'ProfileTool',

    status: 'success',

    timestamp: Date.now(),

    data: {
      username: profile.login,

      name: profile.name,

      avatar: profile.avatar_url,

      bio: profile.bio,

      location: profile.location,

      company: profile.company,

      blog: profile.blog,

      hireable: profile.hireable,

      followers:
        profile.followers,

      following:
        profile.following,

      publicRepos:
        profile.public_repos,

      accountAge,

      profileUrl:
        profile.html_url,
    },
  }
}