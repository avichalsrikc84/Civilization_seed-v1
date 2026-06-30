export function findSkill(skills, name) {
  return skills.find(
    (skill) =>
      skill.name.toLowerCase() ===
      name.toLowerCase()
  )
}

export function createNode(
  id,
  type,
  data
) {
  return {
    id,
    type,
    data,
  }
}

export function createEdge(
  from,
  to,
  type
) {
  return {
    from,
    to,
    type,
  }
}