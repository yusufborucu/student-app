import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE } from '../../../config/env';
import { toast } from 'react-toastify';

export default class LessonsPage extends Component {

    constructor(props) {
        super(props);
        this.onChangeFilterText = this.onChangeFilterText.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            lessons: [],
            filterText: '',
            currentPage: 1,
            dataPerPage: 10,
            liClass: 'page-item page-link',
            isLoading: true
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
                    lessons: response.data,
                    isLoading: false
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    delete(id) {
        axios.delete(`${API_BASE}/lesson/` + id)
            .then(response => {
                this.notify(response.data.message, response.data.type);
                this.refresh();                
            })            
            .catch(error => {
                this.notify(error.message, "error");
            });
    }

    handleClick(e) {
        this.setState({
            currentPage: Number(e.target.id)
        });
    }

    onChangeFilterText(e) {
        this.setState({
            filterText: e.target.value
        });
    }

    render() {
        const filteredLessons = this.state.lessons.filter(
            lesson => {
                return lesson.name.toLowerCase().indexOf(
                    this.state.filterText.toLowerCase()
                ) !== -1;
            }
        );

        const { currentPage, dataPerPage } = this.state;
        const indexOfLast = currentPage * dataPerPage;
        const indexOfFirst = indexOfLast - dataPerPage;
        const currentDatas = filteredLessons.slice(indexOfFirst, indexOfLast);

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filteredLessons.length / dataPerPage); i++) {
            pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map(number => {
            return (
              <li
                className={currentPage === number ? this.state.liClass + " active-page" : this.state.liClass}
                key={number}
                id={number}
                onClick={this.handleClick}
              >
                {number}
              </li>
            );
          });        

        return (
            <div>                
                <h3 align="center" className="mt-2">Dersler</h3>
                <input 
                    className="search-input"
                    value={this.state.filterText}
                    onChange={this.onChangeFilterText}
                    name={"filter"}
                    id={"filter"}
                    placeholder={"Arama"}
                />
                <Link to={"/student-app/new-lesson"} className="btn btn-success float-right mb-2">Yeni Ders</Link>
                { 
                    this.state.isLoading 
                    ? 
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>    
                    </div> 
                    :  
                    <div>
                        <table className="table table-striped" style={{ marginTop: 20 }}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Ad</th>
                                    <th colSpan="2">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                { 
                                    currentDatas.map((object, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>
                                                    {object.id}
                                                </td>
                                                <td>
                                                    {object.name}
                                                </td>
                                                <td>
                                                    <Link to={"/student-app/edit-lesson/" + object.id} className="btn btn-primary">Düzenle</Link>
                                                </td>
                                                <td>
                                                    <button onClick={() => this.delete(object.id)} className="btn btn-danger">Sil</button>
                                                </td>
                                            </tr>
                                        )
                                    }) 
                                }
                            </tbody>
                        </table>
                        <span>{currentDatas.length} kayıt gösteriliyor.</span>
                        <span className="float-right">Toplam kayıt: {this.state.lessons.length}</span>
                        <ul className="pagination justify-content-center">
                            {renderPageNumbers}
                        </ul>     
                    </div> 
                }                          
            </div>
        )
    }
}