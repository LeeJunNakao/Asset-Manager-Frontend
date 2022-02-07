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
import './styles.scss';

function Select<T>(props: SelectProp<T>) {
  const [selectedValue, setContent] = useState<T | null>(null);

  useEffect(() => {
    if (props.data) {
      setContent(props.data);
    }
  }, []);

  const selectedLabel = (props.options as SelectOption<T>[]).find(
    (i) => i.value === selectedValue
  )?.label;

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setContent(value);
    props.setContent(value);
  };

  return (
    <div className="input-component-wrapper select-component">
      <span>{props.label}</span>
      <FormControl sx={{ width: '100%' }}>
        <MaterialSelect
          value={selectedLabel}
          onChange={handleChange}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selectedLabel}
            </Box>
          )}
        >
          {(props.options || []).map((option) => (
            <MenuItem key={uuidv4()} value={option.value as unknown as string}>
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
