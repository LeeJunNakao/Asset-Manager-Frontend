import { useState, useEffect } from 'react';
import { InputConfig } from 'components/form/FormBuilder/protocols';
import FormControl from '@mui/material/FormControl';
import MaterialSelect from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im';
import { SelectProp } from 'components/form/FormBuilder/protocols';
import './style.scss';

function Select(props: SelectProp) {
  const [selectedValue, setContent] = useState<SelectProp['options']>([]);

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setContent(value);
  };

  useEffect(() => {
    if (props.data) {
      setContent(props.data);
      props.setContent(props.data);
    }
  }, []);

  return (
    <div className="input-component-wrapper">
      <span> {props.label} </span>
      <FormControl sx={{ width: '100%' }}>
        <MaterialSelect
          value={selectedValue}
          multiple
          onChange={handleChange}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((item) => (
                <Chip
                  key={typeof item === 'string' ? item : item.value}
                  label={typeof item === 'string' ? item : item.value}
                />
              ))}
            </Box>
          )}
        >
          {(props.options || []).map((option) => (
            <MenuItem
              key={typeof option === 'string' ? option : option.value}
              value={typeof option === 'string' ? option : option.value}
            >
              <div className="item">
                <ImCheckboxUnchecked className="unchecked-icon" />
                <ImCheckboxChecked className="checked-icon" />
                <span>
                  {typeof option === 'string' ? option : option.label}
                </span>
              </div>
            </MenuItem>
          ))}
        </MaterialSelect>
      </FormControl>
    </div>
  );
}

export default Select;
