import React, {useState, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles, fade } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
import Modal from 'react-modal';
import 'mdbreact/dist/css/mdb.css';
import Button from '@material-ui/core/Button';
import 'bootstrap-css-only/css/bootstrap.min.css';
import Select  from 'react-responsive-select';
import 'react-responsive-select/dist/ReactResponsiveSelect.css';
// import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import { slide as Menu } from 'react-burger-menu'
import './index.css'


function Main() {

    const customStyles = {
        content : {
            top          : '50%',
            left         : '50%',
            right        : 'auto',
            bottom       : 'auto',
            marginRight  : '-50%',
            transform    : 'translate(-50%, -50%)',
            background   : 'rgb(220, 112, 112)',
            border       : 'transparent',
            borderRadius :  '0px'
        }
    };

    const [modalIsOpen,setModalIsOpen] = useState(false);
    const [login, setLogin] = useState('');
    const [password,setPassword] = useState(null);
    const [user, setUser] = useState(null);
    const [isMenuOpen,setIsMenuOpen] = useState(false);

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal(){
        setModalIsOpen(false);
    }

    function openMenu(){
        setIsMenuOpen(!isMenuOpen);
    }

    var isBurgerOpen = function(state) {
        if (!state.isOpen) {
            setIsMenuOpen(!isMenuOpen)
        }
    };

    console.log(user, "local", localStorage.getItem('user'));
    // localStorage.clear()
    function sendAuth() {
        fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: login,
                password: password
            })
        }).then(response => response.json())
            .then(json => {
                            setUser(json.user);
                            localStorage.setItem('user', json.user);
                            setModalIsOpen(false);
            })
    }

    function loginChange(event) {
        setLogin(event.target.value)

    }

    function passwordChange(event) {
        setPassword(event.target.value);
            console.log('password was' , event.target.value)
    }

    const [isOpen, setIsOpen] = useState(false);

    const useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginLeft: theme.spacing(1)
        },
        title: {
            flexGrow: 1,
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 7),
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: 120,
                '&:focus': {
                    width: 200,
                },
            },
        },
        searchIcon: {
            width: theme.spacing(7),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            }
        },
        navbar: {
            top: '60px'
        }
    }));

    const toggleClose = (e) => {
        if (e.type === 'keydown' || e.type === 'click') {
            setIsOpen(!isOpen)
        }
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


  return (
            <div>
                <div className={useStyles().root}>
                    <AppBar position="static" style={{height : '60px'}}>
                        <Toolbar>
                            <Typography variant="h6" className={useStyles().title}>
                                CarMarket
                            </Typography>
                            <div className={useStyles().search}>
                                <div className={useStyles().searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: useStyles().inputRoot,
                                        input: useStyles().inputInput,
                                    }}
                                />
                            </div>
                            <IconButton id="outer-container" edge="start" onClick={() => openMenu()} className={useStyles().menuButton} color="inherit" aria-label="menu">
                                <MenuIcon />
                            </IconButton>

                            {localStorage.getItem('user') !== null ?
                                <div>
                                    <IconButton aria-label="account of current user"
                                                aria-controls="menu-appbar"
                                                aria-haspopup="true"
                                                color="inherit"
                                                onClick={handleClick}
                                    >
                                        <AccountCircle/>
                                    </IconButton>
                                </div>


                                :
                                <Button color="inherit" onClick={openModal}>Login</Button>
                            }
                        </Toolbar>
                        <Drawer
                            open={isOpen}
                            classes={{paper : useStyles().navbar}}
                            anchor="right"
                            onClose={toggleClose}
                        >
                            <List>
                                {['Info', 'Popular', 'Login'].map((text, index) => (
                                    <ListItem button key={text}>
                                        <ListItemIcon><InboxIcon/></ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItem>
                                ))}
                            </List>
                        </Drawer>
                    </AppBar>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Example Modal"
                        style={customStyles}
                        shouldCloseOnOverlayClick={false}
                    >
                        <div>
                            <div>
                                <MDBRow className="d-flex justify-content-center">
                                    <h3 className="deep-grey-text mt-3 mb-3">
                                        Log in
                                    </h3>
                                </MDBRow>
                            </div>
                            <div style={{width: '300px', padding: '1.25em'}}>
                                <MDBInput label="Your email"type="email" onChange={event => loginChange(event)}/>
                                <MDBInput label="Your password" type="password" onChange={event => passwordChange(event)}/>
                                <p className="font-small grey-text d-flex justify-content-end">
                                    Forgot
                                    <a href="#!" className="dark-grey-text font-weight-bold ml-1">
                                        Password?
                                    </a>
                                </p>
                                <div>
                              <span className="text-center">
                                    <button className="primary-button" onClick={(event => sendAuth(event))}>
                                        Log in
                                    </button>
                              </span>
                                    <span className="text-center" style={{float: 'right'}}>
                                    <button className="primary-button" onClick={closeModal}>
                                        Cancel
                                    </button>
                              </span>
                                </div>
                                <p className="font-small grey-text d-flex justify-content-center">
                                    Don't have an account?
                                    <a href="#!" className="dark-grey-text font-weight-bold ml-1">
                                        Sign up
                                    </a>
                                </p>
                            </div>
                        </div>
                    </Modal>
                </div>
                <Menu customBurgerIcon={false} disableOverlayClick onStateChange={ isBurgerOpen } isOpen={isMenuOpen} right outerContainerId={ "outer-container" }>

                    <a id="home" className="menu-item" href="/">Home</a>
                    <a id="about" className="menu-item" href="/about">About</a>
                    <a id="contact" className="menu-item" href="/contact">Contact</a>
                    <a className="menu-item--small" href="">Settings</a>
                </Menu>
            </div>

  );
}

export default Main;
