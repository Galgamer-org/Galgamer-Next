import Member from "interfaces/member"
import Image from "next/image"
import style from "styles/avatar.module.css"
import cn from 'classnames'
import { Col } from "react-bootstrap"
import SmartImage from "./smart-image"

type Props = {
  member: Member
}

export default function Avatar ({ member }: Props) {
  const { name, photo, bio, } = member;
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
