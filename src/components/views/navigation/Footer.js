import React from 'react';
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
//import Impressum from './components/views/navigation/Impressum';


function FooterBar (props) {
    const {classes} = props;
    return (
        <div className={classes.foot}>
            <ul className={classes.footElement}>
                <li className={classes.copyright}> © 2019 </li>
                <li className={classes.copyright}><Button color="inherit" className={classes.impressumbutton}>Impressum</Button></li>
            </ul>
        </div>
    );
}


class Footer extends React.Component{
    state = {

    };

    render(){
        return (
            <div>
            </div>
        );
    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = {
    foot: {
        backgroundColor: "#CCCCCC",
        width:"100%",
        height: '50px'
    },
    footElement: {
        listStyleType: "none",
        marginBottom: '0'
    },
    impressumbutton:{
        fontSize: '13px',
        paddingTop: '5px!important'
    },
    copyright: {
        fontSize: '13px',
        display:'inline-block',
        paddingRight: '5px',
        paddingTop: '8px'
    }
}
export default withStyles(styles)(FooterBar);

FooterBar.propTypes = {
    classes: PropTypes.object.isRequired
};
