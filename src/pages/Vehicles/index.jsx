import { useEffect, useState } from "react";
import { apiVehicles } from "../../lib/api";
import { Button, Card, ModalEdit, Search } from "../../components";
import styles from "./Vehicles.module.scss";
import ModalRegister from "../../components/ModalRegister";

const VehiclesPage = () => {
  const [ vehicles, setVehicles ] = useState( [] );
  const [refreshModal, setRefreshModal] = useState(false)
  const [modalRegister, setModalRegister] = useState(false)
  const [modalEdit, setModalEdit] = useState(false)
  const [modalValues, setModalValues] = useState({})
  const [modalFilter, setModalFilter] = useState(false)
  
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState({
    name: [],
    year: [],
    color: [], 
    brand:[],
  });


  useEffect(() => {
    const fetchVehicles = async () => {
      const payload = await apiVehicles({method: 'GET'});
      setVehicles(payload);
    };
    
    fetchVehicles();
  }, [refreshModal]);
  

  const makeFilter = () => {
    let data = {
      name: [],
      year: [],
      color: [],
      brand: [],
    }
    vehicles.forEach((vehicle) => {
      for (const key in vehicle) {
        if ((key === 'name' || key === 'brand' || key === 'year' || key === 'color') && !data[key].includes(vehicle[key])) {
          data[key] = [...data[key], vehicle[key]]
        }
      }
    })
    setFilterData(data)
  }

  useEffect(() => {
    if (modalFilter) makeFilter()

  }, [modalFilter]);

  const applyFilter = ({filterName=null, filterBrand=null, filterMinPrice=null, filterMaxPrice=null, filterYear=null, filterColor=null}) => {
    let newVehicle = vehicles.filter(({name, brand, price, year, color}) => {
      return (
        (!!filterName ? name === filterName : name !== filterName) &&
        (!!filterYear ? year === filterYear : year !== filterYear) &&
        (!!filterBrand ? brand === filterBrand: brand !== filterBrand) &&
        (!!filterColor ? color === filterColor : color !== filterColor) &&
        (!!filterMaxPrice ? price <= filterMaxPrice : price !== filterMaxPrice) &&
        (!!filterMinPrice ? price >= filterMinPrice : price !== filterMinPrice)
 
      )
    })
    setVehicles(newVehicle)

    // colocar no register do hook form (formulários) dos filtros, de acordo com os parâmetros da função applyfilter. e mandar o obj criado para a mesma função.
  
  }
     
  const openCloseModalRegister = () => {
    setModalRegister(!modalRegister)
  }

  return (
    <div className={styles.Vehicles}>
      
      <main className={styles.main}>
        <div>
          <Search placeholder="Search" value={search} onChange={() => {}} />
          <Button onClick={() => {setModalFilter(!modalFilter)}}>Filtro</Button>
          <select name="filter" id="">
            {filterData?.name.map((value) => (<option value={value}>{value}</option>))}
          </select>
        </div>

        <Button onClick={() => openCloseModalRegister()}>Adicionar</Button>

        {vehicles.map(({id, name, description, price, year, brand, isFavorite, color, plate}) => (
          <Card key={ id } setModalEdit={setModalEdit} modalEdit={modalEdit} id={id} name={name}
          description={description}
          price={price}
          year={year}
          isFavorite={isFavorite}
          color={color} brand={brand} plate={plate}  modalValues={modalValues} setModalValues={setModalValues}/> ))}
      </main>
    
      {modalRegister && <ModalRegister modalRegister={modalRegister} setModalRegister={setModalRegister}/>}
      {modalEdit && (
        <ModalEdit modalEdit={modalEdit} setModalEdit={setModalEdit}
        modalValues={modalValues}/>        
      )}
    </div>
  );
};

export default VehiclesPage;
