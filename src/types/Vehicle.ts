//import React from "react";

export interface IVehicle {
  id: number;
  name: string;
  description: string;
  plate: string;
  brand: string;
  isFavorite: boolean;
  year: number;
  color: string;
  price: number;
  createdAt: Date;
}

export interface IFilterData {
  name: [];
  color: [];
  year: [];
  brand: [];
}

export interface IModal {
  "ModalRegister": string;
  "ModalFilter": string;
  setStateModalRegister: boolean;
  setStateModalFilter: boolean;
  stateModalRegister: boolean;
  stateModalFilter: boolean;
}

export type ModalContextType = {
  modal: IModal[];
  SwitchStateModal: (modal: IModal, setStateModalRegister:IModal, setStateModalFilter: IModal) => void;
};

