/*
Loons Lab Date picker component
Developed By Roshan
Loons Lab
*/
import React, { Fragment, useState, Component } from "react";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import Icon from '@material-ui/core/Icon';
import PropTypes from "prop-types";

class LoonsDatePicker extends Component {
    static propTypes = {
        onChange: PropTypes.func,
        children: PropTypes.node,
        variant: PropTypes.string,
        className: PropTypes.string,
        label: PropTypes.string,
        size: PropTypes.string,
        clearable: PropTypes.any,
        value: PropTypes.any,
        views: PropTypes.any,
        placeholder: PropTypes.string,
        minDate: PropTypes.any,
        maxDate: PropTypes.any,
        required: PropTypes.bool,
        errorMessages: PropTypes.string,
        format: PropTypes.string,
        disabled: PropTypes.bool,
    };

    static defaultProps = {
        clearable: true,
        className: "mb-4 w-full",
        color: "primary",
        label: "",
        size: "small",
        variant: "outlined",
        value: null,
        disabled: false,
        //minDate: null,//new Date("2020-10-20")
        //maxDate: null,
        required: false,
        errorMessages: "",
        disabledClassName: "",
        placeholder: "MM/dd/yyyy",

        format: "MM/dd/yyyy"
    };

    handleDateChange = date => {
        const { onChange } = this.props;
        onChange &&
            onChange(
                date
            );
    };

    renderChildren = (label, children) => {

        if (label) {
            return label;
        }

        if (children) {
            return children;
        }
    };

    render() {
        const {
            clearable,
            className,
            value,
            label,
            placeholder,
            variant,
            size,
            minDate,
            maxDate,
            format,
            required,
            disabled,
            views,
            errorMessages

        } = this.props;


        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    clearable
                    className={className}
                    inputVariant={variant}
                    value={value}
                    label={label}
                    size={size}
                    views={views}
                    placeholder={placeholder}
                    onChange={date => this.handleDateChange(date)}
                    minDate={minDate}
                    maxDate={maxDate}
                    format={format}
                    autoOk={true}
                    required={required}
                    disabled={disabled}
                    //error={required ? (value == null ? true : false) : false}
                    //helperText={this.props.StartDate ? "Some error message" : errorMessages}
                    KeyboardButtonProps={{
                        'aria-label': { label },
                    }}
                />
            </MuiPickersUtilsProvider>


        );
    }
}

export default LoonsDatePicker;