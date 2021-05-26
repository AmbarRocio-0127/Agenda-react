
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import firebase from './firebase';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

class App extends React.Component{
    state={
        datos:[],
        modalinsert: false,
        modaledit: false,
        form:{
            Nombre: '',
            Apellido: '',
            Teléfono: '',
            Correo: '',
            Dirección: '',
            Cédula: '',
            Acciones: ''
        },
        id:0
    };

    petition_Get = () => {
        firebase.child("Cédula").on("value", (Cédula) =>{
            if(Cédula.val() !== null){
                this.setState({...this.state.datos, datos: Cédula.val()})
            }else{
                this.setState({datos: []})
            }
        });
    };

    peticion_Post = () => {
        firebase.child("Cédula").push(this.state.form,
            error=>{
                if(error)console.log(error)
            });
            this.setState({modalinsert: false});
    }

    peticion_Put = () =>{
        firebase.child(`Cédula/${this.state.id}`).set(
            this.state.form,
            error=>{
                if(error)console.log(error)
            });
            this.setState({modaledit: false})
    }

    Peticion_Delete = () =>{
        if(window.confirm(`¿Desea usted eliminar al usuario de la Cédula seleccionada? ${this.state.form && this.state.form.Cédula}?`))
    {
    firebase.child(`Cédula/${this.state.id}`).remove(
      error=>{
        if(error)console.log(error)
      });
    }

    }

    handlechange=e=>{
        this.setState({form:{
            ...this.state.form,
            [e.target.name]: e.target.value
        }});
        console.log(this.state.form);
    }

    SelectUser = async(Cédula, id, _caso_) => {
        await this.setState({form: Cédula, id: id});
        (_caso_ === "Editar")?this.setState({modaledit: true}):
        this.Peticion_Delete()
    }

    componentDidMount(){
        this.petition_Get();
    }

    
    render(){
        const { handleSearch } = this.props
        const { search } = this.state
    return(
        <div className="App">
        <br/>
        <h4><i><b>Registro de Agenda Personal</b></i></h4>
        <br/> 
        <div className="search-container">
        <input
          value={search}
          onChange={this.handleChange}
          className="search-input"
          type="text"
        />

        <button className="search-btn" >Search</button>
        </div>
        <br/>

        <table className="table table-bordered">
            <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Dirección</th>
                <th>Cédula</th>
                <th>Acciones</th>
            </tr>

        <tbody>
            {Object.keys(this.state.datos).map(i=>{
                return <tr key={i}>
                    <td>{this.state.datos[i].Nombre}</td>
                    <td>{this.state.datos[i].Apellido}</td>
                    <td>{this.state.datos[i].Teléfono}</td>
                    <td>{this.state.datos[i].Correo}</td>
                    <td>{this.state.datos[i].Dirección}</td>
                    <td>{this.state.datos[i].Cédula}</td>
                    <td>{this.state.datos[i].Acciones}
                    <button className="btn btn-primary" onClick={() => this.SelectUser(this.state.datos[i], i, 'Editar')}>Editar</button> {" "}
                    <button className="btn btn-danger" onClick={() => this.SelectUser(this.state.datos[i], i, 'Eliminar')}>Borrar</button>
                    </td>
                    <br/>

            </tr>
            })}
        </tbody>
        </table>
        <Modal isOpen={this.state.modaledit}>
            <ModalHeader>Editar Registro</ModalHeader>
            <ModalBody>
                <div className="form-group">
                <label>Nombre:</label>
                <br />
                <input type="text" className="form-control" name="Nombre" onChange={this.handlechange} value={this.state.form && this.state.form.Nombre}/>
                <br />
                <label>Apellido:</label>
                <br />
                <input type="text" className="form-control" name="Apellido" onChange={this.handlechange} value={this.state.form && this.state.form.Apellido}/>
                <br />
                <label>Teléfono:</label>
                <br />
                <input type="text" className="form-control" name="Teléfono" onChange={this.handlechange} value={this.state.form && this.state.form.Teléfono}/>
                <br />
                <label>Correo:</label>
                <br />
                <input type="text" className="form-control" name="Correo" onChange={this.handlechange} value={this.state.form && this.state.form.Correo}/>
                <br />
                <label>Dirección:</label>
                <br />
                <input type="text" className="form-control" name="Dirección" onChange={this.handlechange} value={this.state.form && this.state.form.Dirección}/>
                <br />
                <label>Cédula:</label>
                <br />
                <input type="text" className="form-control" name="Cédula" onChange={this.handlechange} value={this.state.form && this.state.form.Cédula}/>
                </div>
            </ModalBody>

            <ModalFooter>
                <button className="btn btn-primary" onClick={() => this.peticion_Put()}>Editar</button> {" "}
                <button className="btn btn-danger" onClick={() => this.setState({modaledit: false})}>Cancelar</button>
                
            </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalinsert}>
        <ModalHeader>Insertar Registro</ModalHeader>
            <ModalBody>
                <div className="form-group">
                <label>Nombre:</label>
                <br />
                <input type="text" className="form-control" name="Nombre" onChange={this.handlechange}/>
                <br />
                <label>Apellido:</label>
                <br />
                <input type="text" className="form-control" name="Apellido" onChange={this.handlechange}/>
                <br />
                <label>Teléfono:</label>
                <br />
                <input type="text" className="form-control" name="Teléfono" onChange={this.handlechange}/>
                <br />
                <label>Correo:</label>
                <br />
                <input type="text" className="form-control" name="Correo" onChange={this.handlechange}/>
                <br />
                <label>Dirección:</label>
                <br />
                <input type="text" className="form-control" name="Dirección" onChange={this.handlechange}/>
                <br />
                <label>Cédula:</label>
                <br />
                <input type="text" className="form-control" name="Cédula" onChange={this.handlechange}/>
                </div>  
                </ModalBody> 
                <ModalFooter>
                <button className="btn btn-primary" onClick={() => this.peticion_Post()}>Insertar</button> {" "}
                <button className="btn btn-danger" onClick={() => this.setState({modalinsert: false})}>Cancelar</button>
                </ModalFooter>
        </Modal>
        <center>
        <br/>
        <button className="btn btn-success" onClick={() => this.setState({modalinsert: true})}>Insertar Registro</button>
        </center>
        </div>
    );
  }
}

export default App;
