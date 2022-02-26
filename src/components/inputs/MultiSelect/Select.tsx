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
  MultiselectData,
} from 'components/form/FormBuilder/protocols';
import { CustomSet } from 'utils/parser/set';
import './style.scss';

function Select<T>(props: MultiselectProp<T>) {
  const [selectedValues, setContent] = useState<MultiselectData<T>>(
    new Set([])
  );
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  useEffect(() => {
    const labels = Array.from(selectedValues).map((value) => {
      const item = props.options.find((o) => o.value === value);

      return item?.label;
    });

    setSelectedLabels(labels as string[]);
    props.setContent(Array.from(selectedValues));
  }, [selectedValues]);

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    const option = props.options.find((i) => i.value === value);

    if (option) {
      const set = new CustomSet<T>(Array.from(selectedValues.values()));
      set.add(option.value);
      setContent(set);
    }
  };

  useEffect(() => {
    if (props.data) {
      setContent(new Set(props.data));
      props.setContent(props.data);
    }
  }, []);

  return (
    <div className="input-component-wrapper">
      <span> {props.label} </span>
      <FormControl sx={{ width: '100%' }}>
        <MaterialSelect
          value={selectedValues}
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
            <MenuItem key={uuidv4()} value={option.value as unknown as string}>
              <div className="item">
                {Array.from(selectedValues.values()).find(
                  (v) => v === option.value
                ) ? (
                  <ImCheckboxChecked className="checked-icon" />
                ) : (
                  <ImCheckboxUnchecked className="unchecked-icon" />
                )}
                <span>{option.label}</span>
              </div>
            </MenuItem>
          ))}
        </MaterialSelect>
      </FormControl>
    </div>
  );
}

export default Select;
