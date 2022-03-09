import React from 'react';

interface IAppContextType {
	data?: {},
	handleSubmit?:  (evt: React.FormEvent<HTMLFormElement>) => void, 
	handleChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void
}

const initialValue = {
	data: {},
	handleSubmit: () => {},
	handleChange: () => {}
}

export const Context = React.createContext<IAppContextType>(initialValue);