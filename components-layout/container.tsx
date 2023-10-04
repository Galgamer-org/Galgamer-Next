import { Container as BsContainer } from "react-bootstrap"

type Props = {
  children?: React.ReactNode
}

export default function Container({ children }: Props) {
  return <BsContainer className="container mx-auto px-5">{children}</BsContainer>
}


