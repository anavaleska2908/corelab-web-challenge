import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { toast } from "react-toastify";
import Button from "../Button";
import styles from "./ModalEdit.module.scss";
import { apiVehicles } from "../../lib/api";
import { useEffect, useState } from "react";



const ModalEdit = ({modalEdit, setModalEdit, modalValues}) => {
    const [name, setName] = useState("")
    const [brand, setBrand] = useState("")
    const [description, setDescription] = useState("")
    const [color, setColor] = useState("")
    const [year, setYear] = useState("")
    const [price, setPrice] = useState("")
    const [plate, setPlate] = useState("")
    const formSchema = yup.object().shape({
        name: yup.string().required("Digite o nome do carro."),
        brand: yup.string().required("Digite a marca do carro."),
        description: yup.string().required("Digite a descrição do carro."),
        color: yup.string().required("Digite a cor do carro."),
        year: yup.number().required("Digite o ano do carro."),
        price: yup.number().required("Digite o valor do carro."),
        plate: yup.string().required("Digite a placa do carro.")
    })
    
    useEffect( () => {
        setName(modalValues.name)
        setBrand(modalValues.brand)
        setDescription(modalValues.description)
        setColor(modalValues.color)
        setYear(modalValues.year)
        setPrice(modalValues.price)
        setPlate(modalValues.plate)
    }, [modalValues])
    
    const { reset, register, handleSubmit, formState:{errors} } = useForm({
        mode: "onChange",
        resolver: yupResolver( formSchema )
    })
    
    const openCloseModalEdit = () => {
        reset()
        setModalEdit(!modalEdit)
    }
    
    const EditDataVehicle = async ( data ) => {
        //console.log("data ", data);
        
        data.price = Number(data.price)
        let response = await apiVehicles( {
            method: 'PATCH', body: {...data}, id: modalValues.id
        } )
        return {
            status: !!response?.id ? true : false,
            message: !!response?.id ? "Veículo atualizado com sucesso" : "Algo deu errado com a atualização",
        }
    }
    
    const handleEditData = async (data) => {
        let validation = await EditDataVehicle( data );
        
        if ( validation.status ) {
            reset();
            toast.success( validation.message );
            openCloseModalEdit();
        } else {
            toast.error( validation.message );
            reset();
        }
    }
    
    return (
        <div className={styles.divExterna} hidden={modalEdit}>
            <div className={styles.divInterna}>
                <form onSubmit={handleSubmit(handleEditData)}>
        
                    <label htmlFor="name">Nome do carro:</label>
                    <input type="text" id="name" {...register("name")} error={errors.name?.message} value={name}  onChange={(event) => setName(event.target.value)}/>
                    <label htmlFor="brand">Marca do carro:</label>
                    <input type="text" id="brand"{...register("brand")} error={errors.brand?.message} value={brand} onChange={(event) => setBrand(event.target.value)}/>
                    <label htmlFor="description">Descrição do carro:</label>
                    <input type="text" id="description" {...register("description")} error={errors.description?.message} value={description} onChange={(event) => setDescription(event.target.value)}/>
                    <label htmlFor="color">Cor do carro:</label>
                    <input type="text" id="color" {...register("color")} error={errors.color?.message} value={color} onChange={(event) => setColor(event.target.value)}/>
                    <label htmlFor="year">Ano do carro:</label>
                    <input type="text" id="year" { ...register( "year" ) } error={ errors.year?.message } value={year} onChange={(event) => setYear(event.target.value)}/>
                    <label htmlFor="price">Preço do carro:</label>
                    <input type="text" id="price" {...register("price")} error={errors.price?.message} value={price} onChange={(event) => setPrice(event.target.value)}/>
                    <label htmlFor="plate">Placa do carro:</label>
                    <input type="text" id="plate" {...register("plate")} error={errors.plate?.message} value={plate} onChange={(event) => setPlate(event.target.value)}/>
                    <Button type="submit">Salvar</Button>
                </form>
                <Button onClick={() => openCloseModalEdit()}>Fechar</Button>
            </div>
        </div>
    )
};

export default ModalEdit;