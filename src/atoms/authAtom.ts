import { atom } from "jotai";
import { getItemFromLocalStorage } from "../services/localStorageService";

// authAtom
type authAtomType = {
  token: string;
  email: string;
  id: number;
};

export const authAtom = atom<authAtomType | null>(null);
