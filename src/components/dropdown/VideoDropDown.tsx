"use client";
import { useMemo, useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { CloseIcon, DownIcon, PlusIcon } from "@/constants/icons";
import type { Options } from "@/types/cources";
interface OptionsType extends Options {
  title: string;
  type: string;
}
type MultipleSelectProps = {
  multiple: true;
  value?: OptionsType[] | null;
  onChange: (value: OptionsType[]) => void;
};

type SingleSelectProps = {
  multiple?: false;
  value?: OptionsType;
  onChange: (value: OptionsType) => void;
};

type SelectProps = {
  options?: OptionsType[];
  placeHolder: string;
  isSearchable?: boolean;
} & (SingleSelectProps | MultipleSelectProps);

const VideoDropDown = ({ multiple, placeHolder, isSearchable, value, onChange, options }: SelectProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [search, setSearch] = useState<string>();

  const selectOption = (option: OptionsType) => {
    if (multiple) {
      if (value?.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...value!, option]);
      }
    } else {
      if (option !== value) {
        onChange(option);
      }
    }
  };

  const getDisplay = useMemo(() => {
    if (multiple) {
      if (!value || !value.length) {
        return placeHolder;
      }
      return (
        <>
          {value?.map((option: OptionsType) => (
            <div key={option.url} className='select__items'>
              <p className='select__item-title'></p>
              {option.url}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(option);
                }}
                className='select__icon'>
                <CloseIcon className='select__icon' />
              </span>
            </div>
          ))}
        </>
      );
    } else {
      if (!value) {
        return placeHolder;
      }
      return value.title;
    }
  }, [value]);
  const getOptions = useMemo(() => {
    if (!search && search === undefined) {
      return options;
    }
    return options?.filter((option) => option.title!.toLowerCase().indexOf(search.toLowerCase()) >= 0);
  }, [search]);
  function isOptionSelected(option: OptionsType) {
    return multiple ? value?.includes(option) : option === value;
  }
  const AddSelect = () => {
    const [addSelect, setAddSelect] = useState<OptionsType>({
      title: "",
      type: "",
      url: "",
    });
    return (
      <div className='select__form'>
        <div className='form__row  select__form-row'>
          <div className='form__input-group'>
            <Input
              id='name'
              type='text'
              className='form__input'
              placeholder='Name'
              required
              value={addSelect?.title ? addSelect?.title : ""}
              onChange={(value) => {
                setAddSelect({ ...addSelect, title: value as string });
              }}>
              <label htmlFor='name' className='form__label'>
                Name
              </label>
            </Input>
            <Input
              id='type'
              type='text'
              className='form__input'
              placeholder='Name'
              required
              value={addSelect?.type ? addSelect?.type : ""}
              onChange={(value) => {
                setAddSelect({ ...addSelect, type: value as string });
              }}>
              <label htmlFor='name' className='form__label'>
                Type
              </label>
            </Input>
          </div>
          <div className='form__input-group'>
            <Input
              id='slug'
              type='text'
              className='form__input'
              placeholder='Slug'
              required
              value={addSelect?.url ? addSelect?.url : ""}
              onChange={(value) => {
                setAddSelect({ ...addSelect, url: String(value) });
              }}>
              <label htmlFor='slug' className='form__label'>
                Slug
              </label>
            </Input>
          </div>
        </div>
        <Button
          type='button'
          className='select__option-button'
          onClick={() => {
            if (addSelect?.title != undefined && addSelect?.url != undefined) {
              selectOption({
                ...addSelect,
                id: Math.random(),
              });
              setShowInput(!showInput);
            }
            setShowInput(!showInput);
          }}>
          <PlusIcon className='select__option-icon select__icon' />
          add item
        </Button>
      </div>
    );
  };

  return (
    <>
      <Button type='button' onClick={() => setShowMenu(!showMenu)} className='select form__input button'>
        <div className='select__wrapper'>{getDisplay}</div>
        <div className='select__icon-wrapper'>
          <DownIcon className='select__icon' />
        </div>
      </Button>
      {showMenu && (
        <div className='select__option-wrapper'>
          {isSearchable && (
            <div className='select__search-box'>
              <Input className='form__input' id='search' type='text' placeholder='Search' value={search ? search : ""} onChange={(value) => setSearch(value?.toString())}>
                <label htmlFor='search' className='visually-hidden'>
                  search
                </label>
              </Input>
            </div>
          )}
          <div className='select__options scrollbar-hidden'>
            {getOptions?.map((option, id) => (
              <Button
                type='button'
                onClick={() => selectOption(option)}
                key={option.url}
                className={`select__option button ${isOptionSelected(option) ? "styles.selected" : ""} 
            `}>
                <p>{id + 1}</p>
                <p>{option.title}</p>
              </Button>
            ))}
          </div>
          {showInput ? (
            <AddSelect />
          ) : (
            <Button type='button' className='select__option-button button' onClick={() => setShowInput(!showInput)}>
              <PlusIcon className='select__option-icon select__icon' />
              add item
            </Button>
          )}
        </div>
      )}
    </>
  );
};
export default VideoDropDown;
