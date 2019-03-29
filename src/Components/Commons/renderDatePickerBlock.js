import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

export default class renderDatePickerBlock extends React.Component {

    static defaultProps = {
        inputValueFormat: null,
    };

    state = {
        date: null,
        focused: false
    };

    componentWillMount() {
        if (this.props.input.value) {
            this.setState({
                date: moment(this.props.input.value.date)
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const {inputValue, valid} = this.props;
        if(valid && !prevState.date){
            this.setState({
                date: moment(inputValue)
            });
        }
        if(!valid && prevState.date){
            this.setState({
                date: inputValue
            });
        }

    }

    handleChange = ( date ) => {
        console.log(date);
        this.setState({
            date: date,
        });
        this.props.input.onChange({
            'date': moment(date).format(this.props.inputValueFormat)
        });

    };

    render() {
        const {
            children,
            placeholder,
            meta: { touched, error },
            id,
            label,
            ...rest
        } = this.props;

        const returnYears = () => {
            let years = [];
            for(let i = moment().year() - 100; i <= moment().year(); i++) {
                years.push(<option value={i} key={i}>{i}</option>);
            }
            return years;
        };

        const renderMonthElement = ({ month, onMonthSelect, onYearSelect }) =>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className='form-group'>
                    <select value={month.month()} onChange={(e) => { onMonthSelect(month, parseInt(e.target.value))} } className='form-control-sm'>
                        {moment.months().map((label, i) => (
                            <option value={i} key={i}>{label}</option>
                        ))}
                    </select>
                    <select value={month.year()} onChange={(e) => onYearSelect(month, parseInt(e.target.value))} className='form-control-sm'>
                        {returnYears()}
                    </select>
                </div>
            </div>;

        return (
            <div className='form-group'>
                <label>
                    {label}
                </label><br/>
                <SingleDatePicker
                    date={this.state.date}
                    onDateChange={this.handleChange.bind(this)}
                    focused={this.state.focused} // PropTypes.bool
                    onFocusChange={({ focused }) => this.setState({ focused })}
                    numberOfMonths={1}
                    renderMonthElement={renderMonthElement}
                    id={id}
                    isOutsideRange={() => false}
                    disabled={true}
                    block={true}
                    placeholder='Wprowadź PESEL'
                />
                {touched &&
                error &&
                <span className="datepicker__error">
            {error}
          </span>}
            </div>
        );
    }
}