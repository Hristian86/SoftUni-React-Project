import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Button, FormControl, Form } from 'react-bootstrap';
import { Collapse, Container, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { Link } from 'react-router-dom';
import About from './About';
import Register from './Auth/Register';
import LogIn from './Auth/LogIn';
import Cards from './Cards/Cards';
import propsy from './SendingProps';
import ProductList from './Products/ProductList';
import CreatePost from './CreatePost/CreatePost';
import GetQuery from './FirebaseDB/Query-Service/GetQuery';
import ProductLeyout from './Products/ProductLayout';
import getCookie from './Cookioes/GetCookie';
import LocalizationFunc from '../Localization/LocalizationFunc';
import setCookie from './Cookioes/SetCookie';

export default class navbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoged: false,
            user: null
        }

        //this.authListener = this.authListener.bind(this);
    }

    language = () => {
        const lang = getCookie('language');
        if (lang === undefined) {
            setCookie('language', 'BG', 5);
            this.setState({
                currentlanguage: lang
            });
            window.location.reload(false);
        }
        if (lang != this.state.currentlanguage) {
            window.location.reload(false);
            this.setState({
                currentlanguage: lang
            });
        }
    }

    setLanguage = (e) => {
        const lang = e.target.value;
        if (lang == "EN") {
            setCookie("language", "EN", 5);
            console.log(lang);
        } else if (lang == "BG") {
            setCookie("language", "BG", 5);
            console.log(lang);
        }
        this.language();
    }

    

    componentDidMount() {
        //this.language();
        //await this.authListener();
        this.cookieUser();
    }

    cookieUser = () => {
        let currentUser = getCookie("user");

        //To Do : add loged user to redux global state
        if (currentUser) {
            this.setState({
                user: currentUser,
                isLoged: true
            });
        } else {
            this.setState({
                user: null,
                isLoged: false
            });
        }
    }

    //async authListener() {
    //    const users = await fire.auth().onAuthStateChanged(user => {
    //        if (user) {
    //            this.setState({
    //                user: user,
    //                isLoged: true
    //            });
    //        } else {
    //            this.setState = null;
    //        }
    //    });

    //    return users;
    //}

    searchHandle = async (e) => {
        e.preventDefault();
        //const search = e.target.searchItem.value;
        //console.log(search);
        //const searchQuery = new GetQuery();
        //let result = await searchQuery.getPosts();
        //if (result) {
        //    let searchRes = [];
        //    for (let index = 0; index < result.length; index++) {
        //        const element = result[index];
        //        let containsEl = element.content.includes(search);
        //        if (containsEl) {
        //            console.log(element);
        //            searchRes.push(element);
        //        }
        //    }

        //    this.setState({
        //        search: searchRes,
        //        redirect: true
        //    });
        //}
    }

    prevDef(e) {

        e.preventDefault();
    }

    resetState = () => {

    }

    render() {
        let cheks = false;
        let usr = this.state.user;

        propsy(this.state.user); //component test from function

        let displayName = null;
        let token = null;
        if (usr) {
            cheks = true;
            displayName = usr;
            //displayName = usr.displayName;
            //token = usr.refreshToken;
            //localStorage.setItem("userToken", token);
            //var localuser = localStorage.getItem("userToken");
            //var currUser = fire.auth().currentUser;

            //currUser.updateProfile({
            //    displayName: "icaka",
            //    photoURL: "https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-8-avatar-2754583_120515.png"
            //})
            //    .then(upd => console.log(upd))
            //    .catch(err => console.log(err));
            //console.log(currUser.displayName);
            //console.log(currUser.photoURL);

            //var results = localuser === currUser.refreshToken ? "true" : "false";
            //console.log(results);




        } else {
            cheks = false;
        }

        // <ProductLeyout state={this.state.search}  />

        return (<div className="">
            <Navbar bg="light" className="nav-bar-background" expand="lg">
                <Navbar.Brand href="/" onClick={() => this.prevDef}>
                    <img src="https://hristian86.github.io/WebTest/images/logo-real-estate.png" className="logo-image" alt="image" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">

                        <Nav.Link href="/Products/ProductList/all" onClick={this.resetState} className="link-style">{LocalizationFunc().product}</Nav.Link>

                        <Nav.Link href="/About" className="link-style" onClick={() => this.prevDef}>{LocalizationFunc().about}</Nav.Link>

                        <Nav.Link href="/Contact" className="link-style" onClick={() => this.prevDef}>{LocalizationFunc().contact}</Nav.Link>

                        <Nav.Link href="/components/HearthStoneCards/HearthstoneCard" onClick={() => this.prevDef} className="link-style" >Hearthstone</Nav.Link>

                    </Nav>

                    <form onChange={this.setLanguage}>
                        <select className="" name="language">
                            <option>{LocalizationFunc().language}</option>
                            <option name="en">EN</option>
                            <option name="bg">BG</option>
                        </select>
                    </form>

                    <Form inline className="mr-3" onSubmit={this.searchHandle} >
                        <FormControl type="text" placeholder="    +359 98 978 4352" disabled name="searchItem" className="mr-sm-2" />
                        <Nav.Link href="/" variant="outline-success" className="contact-button btn btn-outline-success">{LocalizationFunc().search}</Nav.Link>
                    </Form>

                    {/* <SearchNav /> */}

                    {this.state.isLoged ? <Nav.Link href="/Auth/Manage" className="text-info" onClick={() => this.prevDef}>{displayName !== null ? displayName + "'s" : ""} {LocalizationFunc().managment}</Nav.Link> :
                        <Nav.Link href="/Auth/Register" className="text-info" onClick={() => this.prevDef}>{LocalizationFunc().register}</Nav.Link>}

                    {this.state.isLoged ? <Nav.Link href="/Auth/Logout" className="mr-3 text-info" onSubmit={() => this.prevDef}>{LocalizationFunc().logout}</Nav.Link> : <Nav.Link href="/Auth/LogIn" className="mr-3 text-info" onClick={() => this.prevDef}>{LocalizationFunc().login}</Nav.Link>}

                </Navbar.Collapse>
            </Navbar>
            <div>
                {this.state.search ? <ProductLeyout state={this.state.search} /> : null}
            </div>


        </div>
        )
    }
}