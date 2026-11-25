"use client";

import { create } from "zustand";

export type DemoRole = "Administrador" | "Editor" | "Lectura";

interface DemoRoleState {
  role: DemoRole;
  setRole: (role: DemoRole) => void;
}

export const useDemoRoleStore = create<DemoRoleState>((set) => ({
  role: "Administrador",
  setRole: (role) => set({ role }),
}));

export function getRolePermissions(role: DemoRole) {
  return {
    canEdit: role !== "Lectura",
    canDelete: role === "Administrador",
  };
}
