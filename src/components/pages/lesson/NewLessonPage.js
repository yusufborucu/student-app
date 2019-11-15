import React, { Component } from 'react';
import axios from 'axios';
import { API_BASE } from '../../../config/env';
import InlineError from '../../InlineError';
import { toast } from 'react-toastify';

export default class NewLessonPage extends Component {

    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
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

    onChangeName(e) {
        this.setState({
            name: e.target.value
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
                name: this.state.name
            };        
            axios.post(`${API_BASE}/lesson`, obj)
                .then(response => {
                    this.notify(response.data.message, "success");
                })
                .catch(error => {
                    this.notify(error.message, "error");
                });

            this.setState({
                name: ''
            });
        }
    }

    validate() {
        const errors = {};
        if (!this.state.name) errors.name = "Lütfen bu alanı doldurunuz.";
        return errors;
    }

    render() {
        const { errors } = this.state;

        return (
            <div style={{marginTop: 10}}>
                <h3>Yeni Ders Ekle</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Ders Adı:  </label>                        
                        { errors.name && <InlineError message={errors.name} />}
                        <input 
                            type="text" 
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
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