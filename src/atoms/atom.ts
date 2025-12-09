import { atom } from "jotai";
import { getItemFromLocalStorage } from "../services/localStorageService";

export const tokenAtom = atom<string | null>(
  getItemFromLocalStorage<string>("token") || null
);
