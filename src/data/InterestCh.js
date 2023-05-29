import React,{useContext, useEffect, useState, createContext} from 'react';
import { AuthContext } from '../navigation/Routes';

export const pets=[
    { id: 1, value: true, name: "Dog lover", selected: false },
    { id: 2, value: false, name: "Cat lover", selected: false },
    {id:3, value:false, name:"I want them all",selected:false},
    {id:4, value:false, name:"Stay away!",selected:false}

]

export const music=[
    { id: 1, value: true, name: "All kinds", selected: false },
    { id: 2, value: false, name: "Only the new ones", selected: false },
    {id:3, value:false, name:"All time classic",selected:false},
    {id:4, value:false, name:"Don't like any type",selected:false}
]

export const school=[
    { id: 1, value: true, name: "Master", selected: false },
    { id: 2, value: false, name: "Bachelor", selected: false },
    {id:3, value:false, name:"High School",selected:false},
    {id:4, value:false, name:"PhD",selected:false}

]

export const gym=[
    { id: 1, value: true, name: "Way of life", selected: false },
    { id: 2, value: false, name: "Occasionally", selected: false },
    {id:3, value:false, name:"Only when summer approaches",selected:false},
    {id:4, value:false, name:"What is this?",selected:false}

]

export const book=[
    { id: 1, value: true, name: "Book eater", selected: false },
    { id: 2, value: false, name: "3 books/year", selected: false },
    {id:3, value:false, name:"Once upon a time",selected:false},
    {id:4, value:false, name:"Never",selected:false}

]

export const searching=[
    { id: 1, value: true, name: "Finding friends", selected: false },
    { id: 2, value: false, name: "Finding love", selected: false },
    {id:3, value:false, name:"Hang out",selected:false},
    {id:4, value:false, name:"Don't know really",selected:false}

]