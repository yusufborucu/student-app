import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import HomePage from './components/pages/HomePage';

// Lesson
import LessonsPage from './components/pages/lesson/LessonsPage';
import NewLessonPage from './components/pages/lesson/NewLessonPage';
import EditLessonPage from './components/pages/lesson/EditLessonPage';

// Classroom
import ClassroomsPage from './components/pages/classroom/ClassroomsPage';
import NewClassroomPage from './components/pages/classroom/NewClassroomPage';
import EditClassroomPage from './components/pages/classroom/EditClassroomPage';

// Student
import StudentsPage from './components/pages/student/StudentsPage';
import NewStudentPage from './components/pages/student/NewStudentPage';
import EditStudentPage from './components/pages/student/EditStudentPage';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/student-app/'} className="navbar-brand">Student App</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item d-flex">
                  <Link to={'/student-app/lessons'} className="nav-link">Dersler</Link>
                  <Link to={'/student-app/classrooms'} className="nav-link">Sınıflar</Link>
                  <Link to={'/student-app/students'} className="nav-link">Öğrenciler</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Switch>
            <Route exact path='/student-app/' component={ HomePage } />
            <Route path='/student-app/lessons' component={ LessonsPage } />
            <Route exact path='/student-app/new-lesson' component={ NewLessonPage } />       
            <Route path='/student-app/edit-lesson/:id' component={ EditLessonPage } />
            <Route path='/student-app/classrooms' component={ ClassroomsPage } />
            <Route exact path='/student-app/new-classroom' component={ NewClassroomPage } />       
            <Route path='/student-app/edit-classroom/:id' component={ EditClassroomPage } />
            <Route path='/student-app/students' component={ StudentsPage } />
            <Route exact path='/student-app/new-student' component={ NewStudentPage } />       
            <Route path='/student-app/edit-student/:id' component={ EditStudentPage } />
          </Switch>
          <ToastContainer />
        </div>
      </Router>      
    )
  }
}

export default App;
