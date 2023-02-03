import { useEffect, useState } from "react";

const MiApi = () => {    
    const url = ' https://pokeapi.co/api/v2/pokemon/charizard'
   
    
    const [info, setInfo] = useState();   
    const [inputFilter, setInputFilter] = useState('');
    const [name, setName] = useState('');
   
    const fetchApi = async () => {
        const response = await fetch(url);
        console.log(response.statusText);
        const responseJSON = await response.json();

        setInfo(responseJSON);
        setName(responseJSON.forms[0].name[0].toUpperCase() + responseJSON.forms[0].name.slice(1))
    }

    useEffect(() => {
        fetchApi();
    }, [])

    const handleInputFilter = (e) => {
        setInputFilter(e.target.value);
    }

        return(<div>
            <div className="container-fluid">
                <h1 className="text-center">{name}</h1>
                <h2>statistics of{name}</h2>
                <table className="table"  >
                    <thead>
                        <tr>
                        <th>Name</th>
                            <th>Base Score </th>
                        </tr>
                    </thead>
                    <tbody>
                    {info !==undefined && info.stats.map((element, index) =>{
                        return(<tr key={index}>
                            <th className="text-white" >{element.stat.name} </th> 
                            <th className="text-white">{element.base_stat} </th>
                        </tr>
                        )})} 
                    </tbody>                              
                </table>
            </div>
            <div className="container">
                <h2 className="text-white">movements of {name} </h2>       
                <input className="form-control text-center bg-dark text-white" placeholder="Busca un movimiento" onChange={handleInputFilter}></input>
                <ul className="list-group bg-muted">
                    {   info !== undefined &&
                        info.moves.filter((elemento) => {
                            if (inputFilter === '') {
                                return elemento;
                            } else if (elemento.move.name.toLocaleLowerCase().includes(inputFilter.toLocaleLowerCase())) {
                                return elemento;
                            } else {
                                return '';
                            }
                        }).sort(function(a,b) {
                            if (a.move.name > b.move.name) {
                                return 1;
                            }
                            if (a.move.name < b.move.name) {
                                return -1;
                            }
                            return 0;
                        }).map((element, index) => {return(<li className="list-group-item" key={index}>{element.move.name}</li>)})}
                </ul>         
            </div>                                               
        </div>
    )
}


export default MiApi;


