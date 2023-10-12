import cn from "classnames"


type Props = {
  children?: React.ReactNode
  className?: string
}

export default function Container({ children, className }: Props) {
  return <div className={cn(className, "container-xl mx-auto")}>{children}</div>
}


