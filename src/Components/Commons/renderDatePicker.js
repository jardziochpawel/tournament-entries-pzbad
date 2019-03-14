import React from 'react';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

export default class renderDatePicker extends React.Component {

    static defaultProps = {
        inputValueFormat: null,
    };

    state = {
        startDate: null,
        endDate: null,
    };

    componentWillMount() {
        if (this.props.input.value) {
            this.setState({
                startDate: moment(this.props.input.value.startDate),
                endDate: moment(this.props.input.value.endDate),
            });
        }
    }

    handleChange = ({ startDate, endDate } ) => {
        this.setState({
            startDate: startDate,
            endDate: endDate,
        });

        this.props.input.onChange({
            'startDate': moment(startDate).format(this.props.inputValueFormat),
            'endDate':  moment(endDate).format(this.props.inputValueFormat),
        });
    };

    render() {
        const {
            children,
            placeholder,
            meta: { touched, error },
            ...rest
        } = this.props;

        return (
            <div className='form-group'>
                <label>
                    {children}
                </label><br/>
                <DateRangePicker
                    startDate={this.state.startDate}
                    startDateId="your_unique_start_date_id"
                    endDate={this.state.endDate}
                    endDateId="your_unique_end_date_id"
                    onDatesChange={this.handleChange.bind(this)}
                    focusedInput={this.state.focusedInput}
                    onFocusChange={focusedInput => this.setState({ focusedInput })}
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