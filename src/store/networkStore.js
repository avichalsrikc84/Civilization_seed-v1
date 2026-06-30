import { create } from 'zustand'

export const useNetworkStore = create((set) => ({
  hoveredProject: null,

  selectedProject: null,

  focusMode: false,

  cameraTarget: null,

  setHoveredProject: (project) =>
    set({
      hoveredProject: project,
    }),

  setSelectedProject: (project) =>
    set({
      selectedProject: project,
      focusMode: !!project,

      cameraTarget: project
        ? project.id
        : null,
    }),

  clearSelection: () =>
    set({
      hoveredProject: null,

      selectedProject: null,

      focusMode: false,

      cameraTarget: null,
    }),
}))