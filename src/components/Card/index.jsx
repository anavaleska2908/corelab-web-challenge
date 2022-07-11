import { useState } from "react";
import { apiVehicles } from "../../lib/api";
import ModalEdit from "../ModalEdit";
import styles from "./Card.module.scss";

const Card = ( { id, name, description, price, year, brand, isFavorite, color, plate, modalEdit, setModalEdit,  modalValues, setModalValues } ) => {
  const openCloseModalEdit = () =>{
    setModalEdit(!modalEdit)
  }
  
  const handleEditData = async ( id ) => {
    let response = await apiVehicles({method: 'GET', id});
    setModalValues(response);
    openCloseModalEdit();
  }
  
  return (
    <>
      <div className={styles.Card}>
        <div className={styles.Header}>          
          <h2>{name}</h2>
          <button id={id} onClick={() => handleEditData(id)}>Edit</button>
      </div>
        <div className={ styles.content }>
          <p>Preço: {Number(price).toLocaleString('en-US', { style: 'currency', currency: 'USD'})}</p>
          <p>Descrição: {description}</p>
          <p>Year: {year}</p>
          <p>Marca: {brand}</p>
          <p>Placa: {plate}</p>
      </div>
      </div>
    </>
  );
};

export default Card;