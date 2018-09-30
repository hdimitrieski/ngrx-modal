import { v4 as uuid } from 'uuid';

export const generateModalId = () => uuid();

export const modalExist = (modal, modals) =>
  modals.find(m => m.id === modal.id);

export const getInactiveModals = (modals, allModals) =>
  modals.filter(modal => !modalExist(modal, allModals));

export const getActiveModals = (modals, allModals) =>
  modals.filter(modal => modalExist(modal, allModals));
