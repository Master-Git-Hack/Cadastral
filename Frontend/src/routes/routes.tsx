import {FC,Fragment} from 'react';
import { Routes, Route } from "react-router-dom";
import Homologation from "../views/homologation/Homologation"
export const WithNavigation:FC=()=>
    <Fragment>
        <Routes>
            
            
        </Routes>
    </Fragment>

export const SinglePages:FC=()=>
<Routes>
    <Route path="/homologaciones/" element={<Homologation/>} />
    <Route path="*" element={<h1>Error418</h1>} />
</Routes>
const params = new URLSearchParams(window.location.search).get("key");
export const RenderRoutes:FC = ()=>
<Fragment>
{params !== undefined ? <SinglePages/> : <WithNavigation/>}
</Fragment>