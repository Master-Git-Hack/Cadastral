import {useState} from 'react';
import {useHomologationSelector, useHomologationDispatch} from '../app/homologation/hooks';
import { add,remove, set, select} from '../features/homologation/homologationSlice';

export function Homologations() {
    const homologation = useHomologationSelector(select);
    const dispatch = useHomologationDispatch();

}  