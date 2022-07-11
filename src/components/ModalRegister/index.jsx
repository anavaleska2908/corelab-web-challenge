import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { toast } from "react-toastify";
import Button from "../Button";
import styles from "./ModalRegister.module.scss";
import { Input } from "../Input";
import { apiVehicles } from "../../lib/api";


const ModalRegister = ({modalRegister, setModalRegister}) => {
    
    const formSchema = yup.object().shape( {
        name: yup.string().required( "Digite o nome do carro." ),
        brand: yup.string().required( "Digite a marca do carro." ),
        description: yup.string().required( "Digite a descrição do carro." ),
        color: yup.string().required( "Digite a cor do carro." ),
        year: yup.number().required( "Digite o ano do carro." ),
        price: yup.number().required( "Digite o valor do carro." ),
        plate: yup.string().required( "Digite a placa do carro." )
    } );
    
    const { reset, register, handleSubmit, formState:{errors} } = useForm( {
        resolver: yupResolver( formSchema )
    } );
    
    const registerNewDataVehicle = async ( data ) =>{
        data.price = Number(data.price)
        let response = await apiVehicles( {
            method: 'POST', body: {...data}
        } )
        return {
            status: !!response?.id ? true : false,
            message: !!response?.id ? "Veículo registrado com sucesso" : "Algo deu errado com o registro",
        }
    }
        
    const openCloseModalRegister = () => {
        reset()
        setModalRegister(!modalRegister)
    }
    
    const handleRegisterData = async ( data ) => {
        let validation = await registerNewDataVehicle( data );
        //console.log("validation ", validation);
        
        if ( validation.status ) {
            reset();
            toast.success( validation.message );
            openCloseModalRegister();
        } else {
            toast.error( validation.message );
            reset();
        }
    };

    
    return (
        <div className={ styles.divExterna } hidden={ modalRegister }>
            <div className={ styles.divInterna }>            
                <form onSubmit={ handleSubmit( handleRegisterData) }>
        
                    <label htmlFor="name">Nome do carro:</label>
                    <input type="text" id="name" {...register("name")} error={errors.name?.message}/>
                    <label htmlFor="brand">Marca do carro:</label>
                    <input type="text" id="brand"{...register("brand")} error={errors.brand?.message}/>
                    <label htmlFor="description">Descrição do carro:</label>
                    <input type="text" id="description" {...register("description")} error={errors.description?.message}/>
                    <label htmlFor="color">Cor do carro:</label>
                    <input type="text" id="color" {...register("color")} error={errors.color?.message}/>
                    <label htmlFor="year">Ano do carro:</label>
                    <input type="text" id="year" { ...register( "year" ) } error={ errors.year?.message } />
                    <label htmlFor="price">Preço do carro:</label>
                    <input type="text" id="price" {...register("price")} error={errors.price?.message}/>
                    <label htmlFor="plate">Placa do carro:</label>
                    <input type="text" id="plate" {...register("plate")} error={errors.plate?.message}/>
                    <Button type="submit">Salvar</Button>
                </form>
                <Button onClick={openCloseModalRegister}>Fechar</Button>
            </div>
        </div>
    );
};

export default ModalRegister;