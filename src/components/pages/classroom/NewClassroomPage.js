import React, { Component } from 'react';
import axios from 'axios';
import { API_BASE } from '../../../config/env';
import CheckBox from '../../CheckBox';
import InlineError from '../../InlineError';
import { toast } from 'react-toastify';

export default class NewClassroomPage extends Component {    

    constructor(props) {
        super(props);
        this.handleLesson = this.handleLesson.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            lessons: [],
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
        axios.get(`${API_BASE}/lesson`)
            .then(response => {
                this.setState({
                    lessons: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleLesson(e) {
        let lessons = this.state.lessons;
        lessons.forEach(lesson => {
            if (lesson.name === e.target.value)
                lesson.isChecked =  e.target.checked;
        });
        this.setState({
            lessons: lessons
        });
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
            let lessons = this.state.lessons;
            let lesson_ids = [];
            lessons.forEach(lesson => {
                if (lesson.isChecked)
                    lesson_ids.push(lesson.id);
            });

            const obj = {
                name: this.state.name,
                lesson_ids: lesson_ids
            };        
            axios.post(`${API_BASE}/classroom`, obj)
                .then(response => {
                    this.notify(response.data.message, "success");
                })
                .catch(error => {
                    this.notify(error.message, "error");
                });

            this.setState({
                name: '',
                lessons: []
            });

            this.refresh();
        }
    }

    validate() {
        const errors = {};
        if (!this.state.name) errors.name = "Lütfen bu alanı doldurunuz.";
        if (this.state.lessons.filter(lesson => lesson.isChecked).length < 1) errors.lessons = "Lütfen en az 1 ders seçiniz";
        return errors;
    }

    render() {
        const { errors } = this.state;

        return (
            <div style={{marginTop: 10}}>
                <h3>Yeni Sınıf Ekle</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Sınıf Adı:</label>
                        { errors.name && <InlineError message={errors.name} />}
                        <input 
                            type="text" 
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
                        />                        
                    </div>
                    <div className="form-group">
                        <label>Dersler:</label>
                        { errors.lessons && <InlineError message={errors.lessons} />}
                        <ul className="list-group">
                        {
                            this.state.lessons.map((lesson) => {
                                return (
                                    <CheckBox 
                                        key={lesson.id} 
                                        handleLesson={this.handleLesson}  
                                        {...lesson} 
                                    />
                                )
                            })
                        }
                        </ul>
                    </div>                    
                    <div className="form-group">
                        <input type="submit" value="Kaydet" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}