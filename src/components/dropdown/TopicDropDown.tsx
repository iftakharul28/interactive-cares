"use client";
import { useMemo, useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { CloseIcon, DownIcon, PlusIcon } from "@/constants/icons";
import type { TopicType } from "@/types/cources";
type OptionsType = TopicType;
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
            <div key={option.slug} className='select__items'>
              <p className='select__item-title'></p>
              {option.slug}
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
      slug: "",
      video_id: "",
      durations: "",
    });
    return (
      <div className='select__form'>
        <div className='form__row select__form-row'>
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
          </div>
        </div>
        <div className='form__row select__form-row'>
          <div className='form__input-group'>
            <Input
              id='slug'
              type='text'
              className='form__input'
              placeholder='Slug'
              required
              value={addSelect?.slug ? addSelect?.slug : ""}
              onChange={(value) => {
                setAddSelect({ ...addSelect, slug: String(value) });
              }}>
              <label htmlFor='slug' className='form__label'>
                Slug
              </label>
            </Input>
          </div>
          <div className='form__input-group'>
            <Input
              id='type'
              type='text'
              className='form__input'
              placeholder='Type'
              required
              value={addSelect?.type ? addSelect?.type : ""}
              onChange={(value) => {
                setAddSelect({ ...addSelect, type: value as any });
              }}>
              <label htmlFor='name' className='form__label'>
                Type
              </label>
            </Input>
          </div>
        </div>
        <div className='form__row select__form-row'>
          <div className='form__input-group'>
            <Input
              id='durations'
              type='text'
              className='form__input'
              placeholder='Video durations'
              required
              value={addSelect?.durations ? addSelect?.durations : ""}
              onChange={(value) => {
                setAddSelect({ ...addSelect, durations: String(value) });
              }}>
              <label htmlFor='durations' className='form__label'>
                video Durations
              </label>
            </Input>
          </div>
          <div className='form__input-group'>
            <Input
              id='video_id'
              type='text'
              className='form__input'
              placeholder='Video Id'
              required
              value={addSelect?.video_id ? addSelect?.video_id : ""}
              onChange={(value) => {
                setAddSelect({ ...addSelect, video_id: String(value) });
              }}>
              <label htmlFor='video_id' className='form__label'>
                video Id
              </label>
            </Input>
          </div>
        </div>
        <Button
          type='button'
          className='select__option-button'
          onClick={() => {
            if (addSelect?.title != undefined && addSelect?.slug != undefined) {
              selectOption({
                ...addSelect,
                slug:
                  addSelect?.slug != ""
                    ? addSelect?.slug
                    : addSelect.title
                        .replace(/ /g, "-")
                        .replace(/[^\w-]+/g, "")
                        .toLowerCase(),
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
                onClick={() =>
                  selectOption({
                    id: option.id,
                    title: option.title,
                    type: option.type,
                    slug: option.slug,
                    video_id: option.video_id,
                    durations: option.durations,
                  })
                }
                key={option.slug}
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
