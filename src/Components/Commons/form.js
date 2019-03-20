import React from 'react';
import classNames from "classnames";
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css'

export const renderField = ({input, label, type, meta: {error}}) => {
  const classes = classNames(
    'form-control',
    {
      'is-invalid': error
    }
  );
  return (
    <div className="form-group">
      {label !== null && label !== '' && <label>{label}</label>}
      {type !== 'textarea' && <input {...input} type={type} className={classes}/>}
      {type === 'textarea' && <textarea {...input} className={classes}/>}
      {error && <small className="form-text text-danger">{error}</small>}
    </div>
  );
};
export const renderHiddenField = ({input, label, type, id}) => {

  return (
    <div className="form-group">
        <input {...input} value={id} type={type} hidden={true}/>
    </div>
  );
};

export const renderChoicesField = (props) =>{
  const { children, input, options, isMulti, isSearchable, closeMenuOnSelect, meta: {error}, getOptionLabel, getOptionValue} = props;
  function handleChange(value) {
          props.input.onChange(value)
  }
  return (
      <div className='form-group'>
        <label className={props.className}>
          {children}

        </label>
        <Select
            {...input}
            className={''}
            value={props.input.value}
            onChange={handleChange}
            onBlur={() => props.input.onBlur(props.input.value)}
            options={options}
            placeholder="Wybierz"
            simpleValue
            isSearchable={isSearchable}
            isMulti={isMulti}
            closeMenuOnSelect={closeMenuOnSelect}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
        />
        {error && <small className="form-text text-danger">{error}</small>}
      </div>
  )
};

