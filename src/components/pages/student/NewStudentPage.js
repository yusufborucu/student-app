import React, { Component } from 'react';
import axios from 'axios';
import { API_BASE } from '../../../config/env';
import SelectBox from '../../SelectBox';
import InlineError from '../../InlineError';
import { toast } from 'react-toastify';

export default class NewStudentPage extends Component {

    constructor(props) {
        super(props);
        this.handleClassroom = this.handleClassroom.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSurname = this.onChangeSurname.bind(this);
        this.onChangeNo = this.onChangeNo.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            classrooms: [],
            classroom: 0,
            name: '',
            surname: '',
            no: '',
            errors: {}
        };
    }

    notify(message, type) {
        let features = {
            position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false
        }
        if (type == "success") {
            toast.success(message, features);
        } else {
            toast.error(message, features);
        }
    } 

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        axios.get(`${API_BASE}/classroom`)
            .then(response => {
                let classrooms = [];
                let obj = {id: 0, name: "Seçiniz"};
                classrooms.push(obj);
                classrooms = classrooms.concat(response.data);
                this.setState({
                    classrooms: classrooms
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleClassroom(e) {
        this.setState({
            classroom: e.target.value
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeSurname(e) {
        this.setState({
            surname: e.target.value
        });
    }

    onChangeNo(e) {
        this.setState({
            no: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const errors = this.validate();
        this.setState({
            errors: errors
        });

        if (Object.keys(errors).length === 0) {
            const obj = {
                classroom_id: this.state.classroom,
                name: this.state.name,
                surname: this.state.surname,
                no: this.state.no            
            };        
            axios.post(`${API_BASE}/student`, obj)
                .then(response => {
                    this.notify(response.data.message, "success");
                })
                .catch(error => {
                    this.notify(error.message, "error");
                });

            this.setState({
                classroom: 0,
                name: '',
                surname: '',
                no: ''
            });
        }
    }

    validate() {
        const errors = {};
        if (this.state.classroom == 0) errors.classroom = "Lütfen bir sınıf seçiniz.";
        if (!this.state.name) errors.name = "Lütfen bu alanı doldurunuz.";
        if (!this.state.surname) errors.surname = "Lütfen bu alanı doldurunuz.";
        if (!this.state.no) errors.no = "Lütfen bu alanı doldurunuz.";
        return errors;
    }

    render() {
        const { errors } = this.state;

        return (
            <div style={{marginTop: 10}}>
                <h3>Yeni Öğrenci Ekle</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Öğrenci Sınıfı:  </label>
                        { errors.classroom && <InlineError message={errors.classroom} />}
                        <SelectBox 
                            value={this.state.classroom}
                            handleClassroom={this.handleClassroom}  
                            options={this.state.classrooms}
                        />
                    </div>
                    <div className="form-group">
                        <label>Öğrenci Adı:  </label>
                        { errors.name && <InlineError message={errors.name} />}
                        <input 
                            type="text" 
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Öğrenci Soyadı:  </label>
                        { errors.surname && <InlineError message={errors.surname} />}
                        <input 
                            type="text" 
                            className="form-control"
                            value={this.state.surname}
                            onChange={this.onChangeSurname}
                        />
                    </div>
                    <div className="form-group">
                        <label>Öğrenci Numarası:  </label>
                        { errors.no && <InlineError message={errors.no} />}
                        <input 
                            type="text" 
                            className="form-control"
                            value={this.state.no}
                            onChange={this.onChangeNo}
                        />
                    </div>                    
                    <div className="form-group">
                        <input type="submit" value="Kaydet" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}