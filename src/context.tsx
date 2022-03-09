import React from 'react';
import { IUserProps } from './type/type';

interface IArrayProp {
    items?: IUserProps[]
}

interface IDataProps {
    data?: IArrayProp,
}

interface IAppContextType {
	data?: IDataProps,
	handleSubmit?: (evt: React.FormEvent<SubmitEvent>) => void, 
	handleChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void
}

export const Context = React.createContext({} as IAppContextType);