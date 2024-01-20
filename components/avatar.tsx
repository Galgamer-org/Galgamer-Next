import Member from "interfaces/member"
import Image from "next/image"
import style from "styles/avatar.module.css"
import cn from 'classnames'
import { Col } from "react-bootstrap"
import SmartImage from "./smart-image"
import { getMember } from "_feed/members";


type Props = {
  name: string,
}

export default function Avatar ({ name }: Props) {
  const member = getMember(name);
  const { photo, bio, } = member;
  return (
    <div className={cn(style.container ,"d-flex align-items-center")}>
      <div className={cn(style.photoContainer ,"mr-2")}>
        <SmartImage src={photo} alt={`${name}'s profile photo`} className={cn(style.avatar, "rounded-full")} />
      </div>
      
      <div className={cn(style.name ,"font-weight-bold mx-2")}>
        {name}
      </div>
    </div>
  )
}
