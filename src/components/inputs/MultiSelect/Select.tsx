import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import MaterialSelect from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im';
import {
  MultiselectProp,
  SelectOption,
} from 'components/form/FormBuilder/protocols';
import './style.scss';

function Select(props: MultiselectProp) {
  const [selectedValue, setContent] = useState<MultiselectProp['options']>([]);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  useEffect(() => {
    const labels = selectedValue.map((value): string => {
      if (typeof props.options[0] === 'string') return value as string;

      const item = props.options.find(
        (o: any) => o.value === value
      ) as SelectOption;

      return item.label;
    });

    setSelectedLabels(labels);
  }, [selectedValue]);

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setContent(value);
    props.setContent(value);
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
          multiple={Boolean(props.type === 'multi')}
          onChange={handleChange}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selectedLabels.map((item) => (
                <Chip key={uuidv4()} label={item} />
              ))}
            </Box>
          )}
        >
          {(props.options || []).map((option) => (
            <MenuItem
              key={uuidv4()}
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
