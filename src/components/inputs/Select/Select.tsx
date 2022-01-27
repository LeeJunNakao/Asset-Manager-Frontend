import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MaterialSelect from '@mui/material/Select';
import {
  SelectProp,
  SelectOption,
} from 'components/form/FormBuilder/protocols';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

function Select(props: SelectProp) {
  const [selectedValue, setContent] = useState<string>('');

  useEffect(() => {
    if (props.data) {
      setContent(props.data);
    }
  }, []);

  const selectedLabel =
    props.options[0] && typeof props.options[0] === 'object'
      ? (props.options as SelectOption[]).find((i) => i.value === selectedValue)
          ?.label
      : selectedValue;

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setContent(value);
    props.setContent(value);
  };

  return (
    <div className="input-component-wrapper">
      <span> {props.label} </span>
      <FormControl sx={{ width: '100%' }}>
        <MaterialSelect
          value={selectedValue}
          onChange={handleChange}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selectedLabel}
            </Box>
          )}
        >
          {(props.options || []).map((option) => (
            <MenuItem
              key={uuidv4()}
              value={typeof option === 'string' ? option : option.value}
            >
              <div className="item">
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
