import Members from "_feed/members"; 
import {getMember} from "_feed/members"; 
import members_css from "styles/members.module.css";
import cn from 'classnames'
import { Col, Row } from 'react-bootstrap'
 



function Card(member){
    return <div className={`${members_css.member} col-12 col-md-6 col-xl-4  `}  >
        <p>Card</p>
    </div>
}
 
function MembersBody(members){
    return <div className={members_css.body}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <p>askjdhasjdhashdjk</p>
    </div>
}


function barnner(members){
    return <div className="barnner" >

    </div>
}


export default function Member() { 
    return <div>
        <MembersBody />
    </div> 
}

