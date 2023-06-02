"use client";

import type { CategoryType } from "@/types/cources";

type Props = {
  item: CategoryType;
  selectedValues?: number;
  onChange: (value: number) => void;
};
const CheckBoxFilter = (props: Props) => {
  return (
    <div className='form__row'>
      <input type='checkbox' name={`filter_${props.item.id}`} checked={!!props.selectedValues && props.selectedValues === props.item.id} onChange={() => props.onChange(Number(props.item.id))} />
      <label htmlFor={`filter_item_${props.item.id}`} className='ml-2'>
        {props.item.title}
      </label>
    </div>
  );
};

export default CheckBoxFilter;
