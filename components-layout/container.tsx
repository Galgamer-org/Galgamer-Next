
type Props = {
  children?: React.ReactNode
}

export default function Container({ children }: Props) {
  return <div className="container-xxl mx-auto px-1 px-md-2 px-lg-5">{children}</div>
}


