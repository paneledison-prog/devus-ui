import { createContext, useContext } from 'react';

/** Popovers and modals render into the nearest overlay root so they can appear above the native preview <dialog>. */
export const OverlayRoot = createContext<Element | undefined>(undefined);
export const useOverlayRoot = () => useContext(OverlayRoot);
