/*
Loons Lab Date picker component
Developed By Roshan
Loons Lab
*/
import React, { Fragment, useState, Component } from "react";
import { Divider, Typography } from '@material-ui/core'
import { any } from "prop-types";

class CardTitle extends Component {
    static propTypes = {
        title: any
    };

    static defaultProps = {
        title: null
    };



    render() {
        const {
            title
        } = this.props;


        return (
            <Fragment>
                <Typography variant="h6" className="font-semibold">{title}</Typography>
                <Divider />
            </Fragment>

        );
    }
}

export default CardTitle;