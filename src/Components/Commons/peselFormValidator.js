import React from 'react';
import classNames from "classnames";
import MaskedInput from 'react-text-mask'
import {Field} from "redux-form";
import renderDatePicker from "./renderDatePicker";
import {renderFieldGender} from "./form";

export const PeselDecode = (pesel) => {

    let year = parseInt(pesel.substring(0, 2), 10);
    let month = parseInt(pesel.substring(2, 4), 10) - 1;
    let day = parseInt(pesel.substring(4, 6), 10);

    if (month > 80) {
        year = year + 1800;
        month = month - 80;
    } else if (month > 60) {
        year = year + 2200;
        month = month - 60;
    } else if (month > 40) {
        year = year + 2100;
        month = month - 40;
    } else if (month > 20) {
        year = year + 2000;
        month = month - 20;
    } else {
        year += 1900;
    }

    let birthAt = new Date();
    birthAt.setFullYear(year, month, day);

    let weight = [9, 7, 3, 1, 9, 7, 3, 1, 9, 7];
    let sum = 0;

    for (let i = 0; i < weight.length; i++) {
        sum += (parseInt(pesel.substring(i, i + 1), 10) * weight[i]);
    }
    sum = sum % 10;
    let valid = (sum === parseInt(pesel.substring(10, 11), 10));
    let gender = '';

    if (parseInt(pesel.substring(9, 10), 10) % 2 === 1) {
        gender = 'm';
    } else {
        gender = 'k';
    }
    if(!Boolean(valid)){
        return {valid: Boolean(valid), sex: '', birthAt: null};
    }
    return {valid: Boolean(valid), sex: gender, birthAt: birthAt};
};

export default class peselFormValidator extends React.Component {



    state = {
        valid: false,
        pesel: '',
        birthAt:'',
        sex: ''
    };

    componentWillMount() {
        if (this.props.input.value) {
            this.setState({
                pesel: this.props.input.value.pesel
            });
        }
    }

    handleChange = (e) => {
        const value = e.target.value;
        const name  = e.target.name;
        this.setState({
            [name]: value
        });

        this.props.input.onChange({
            [name]: value
        });

        if(Number(value.replace('_','').length) === 11 || Number(value.replace('_','').length) === 0){

            this.setState({
                valid: PeselDecode(value).valid,
                birthAt: PeselDecode(value).birthAt,
                sex: PeselDecode(value).sex
            });
        }
    };

    render() {
        const {input, label, type, meta: {error}} = this.props;

        let classes = classNames(
            'form-control'
        );

        if(!this.state.valid && Number(this.state.pesel.replace('_','').length) === 11){
            classes = classNames(
                'form-control',
                'is-invalid'
            )
        }

        if(this.state.valid && Number(this.state.pesel.replace('_','').length) === 11){
            classes = classNames(
                'form-control',
                'is-valid'
            )
        }

        return (
            <div>
                <div className="form-group">
                    {label !== null && label !== '' && <label>{label}</label>}
                    <MaskedInput {...input} type={type} value={this.state.pesel} className={classes} onChange={this.handleChange.bind(this)}
                                 mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}/>
                    {error && <small className="form-text text-danger">{error}</small>}
                </div>

                <Field name="birthAt" label="Data urodzenia:" component={renderDatePicker} inputValue={this.state.birthAt} valid={this.state.valid} pesel={this.state.pesel}/>
                <Field type="text" name="gender" label="Płeć:" component={renderFieldGender} sex={this.state.sex}/>
            </div>

        );
    }
}
