export async function ActivityTool(events = []) {
  if (!events.length) {
    return {
      tool: 'ActivityTool',

      status: 'failed',

      timestamp: Date.now(),

      error: 'No activity found',

      data: null,
    }
  }

  const eventTypes = {}

  const activeDays = {}

  const activeHours = {}

  let pushEvents = 0

  let pullRequests = 0

  let issues = 0

  let releases = 0

  let commitsEstimated = 0

  for (const event of events) {
    // -----------------------------
    // Count Event Types
    // -----------------------------
    eventTypes[event.type] =
      (eventTypes[event.type] || 0) + 1

    // -----------------------------
    // Active Days
    // -----------------------------
    const date = new Date(event.created_at)

    const weekday =
      date.toLocaleDateString('en-US', {
        weekday: 'long',
      })

    activeDays[weekday] =
      (activeDays[weekday] || 0) + 1

    // -----------------------------
    // Active Hours
    // -----------------------------
    const hour = date.getHours()

    activeHours[hour] =
      (activeHours[hour] || 0) + 1

    // -----------------------------
    // Event Intelligence
    // -----------------------------
    switch (event.type) {
      case 'PushEvent':
        pushEvents++

        commitsEstimated +=
          event.payload?.commits?.length || 0

        break

      case 'PullRequestEvent':
        pullRequests++
        break

      case 'IssuesEvent':
        issues++
        break

      case 'ReleaseEvent':
        releases++
        break

      default:
        break
    }
  }

  // -----------------------------
  // Most Active Day
  // -----------------------------

  const mostActiveDay =
    Object.entries(activeDays).sort(
      (a, b) => b[1] - a[1]
    )[0]

  // -----------------------------
  // Most Active Hour
  // -----------------------------

  const mostActiveHour =
    Object.entries(activeHours).sort(
      (a, b) => b[1] - a[1]
    )[0]

  // -----------------------------
  // Last Activity
  // -----------------------------

  const latestEvent =
    events[0]?.created_at || null

  const daysSinceLastActivity =
    latestEvent
      ? Math.floor(
          (Date.now() -
            new Date(
              latestEvent
            ).getTime()) /
            (1000 *
              60 *
              60 *
              24)
        )
      : null

  return {
    tool: 'ActivityTool',

    status: 'success',

    timestamp: Date.now(),

    data: {
      totalEvents: events.length,

      pushEvents,

      pullRequests,

      issues,

      releases,

      commitsEstimated,

      eventTypes,

      activeDays,

      activeHours,

      mostActiveDay: mostActiveDay
        ? {
            day: mostActiveDay[0],
            count:
              mostActiveDay[1],
          }
        : null,

      mostActiveHour:
        mostActiveHour
          ? {
              hour:
                Number(
                  mostActiveHour[0]
                ),
              count:
                mostActiveHour[1],
            }
          : null,

      latestActivity:
        latestEvent,

      daysSinceLastActivity,
    },
  }
}