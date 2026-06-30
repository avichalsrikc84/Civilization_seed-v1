// ======================================================
// DIGITAL UNIVERSE WORLD REGISTRY
// Stores the live position of every interactive object
// ======================================================

const registry = new Map()

// ------------------------------------------------------
// Register a new object
// ------------------------------------------------------

export function registerNode(
  id,
  type,
  position,
  data = {}
) {
  registry.set(id, {
    id,
    type,
    position: [...position],
    data,
  })
}

// ------------------------------------------------------
// Update object position
// ------------------------------------------------------

export function updateNode(
  id,
  position
) {
  const node = registry.get(id)

  if (!node) return

  node.position = [...position]
}

// ------------------------------------------------------
// Remove object
// ------------------------------------------------------

export function unregisterNode(id) {
  registry.delete(id)
}

// ------------------------------------------------------
// Find one object
// ------------------------------------------------------

export function getNode(id) {
  return registry.get(id)
}

// ------------------------------------------------------
// Return all objects
// ------------------------------------------------------

export function getAllNodes() {
  return [...registry.values()]
}

// ------------------------------------------------------
// Return only one type
// ------------------------------------------------------

export function getNodesByType(type) {
  return [...registry.values()].filter(
    (node) => node.type === type
  )
}

// ------------------------------------------------------
// Debug
// ------------------------------------------------------

export function printRegistry() {
  console.table(
    [...registry.values()]
  )
}