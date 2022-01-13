import React from "react";
import './Header.css';
import usuario from '../imgs/usuario.png'

const Header = ({black}) =>{
    return(
        <header className={black ? 'black'  : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Logo netflix"/>
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src={usuario} alt="Usuário"/>
                </a>
            </div>
        </header>
    );
}
export default Header;