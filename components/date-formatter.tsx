import { parseISO, format } from 'date-fns'


export default function DateFormatter({ dateString }: { dateString: Date}) {

  console.log(`the date is ${dateString}`)
  // const date = parseISO(dateString)
  // console.log(`the date is ${date}`)
  //return <p>{dateString.toString()}</p>
  return <time dateTime={dateString.toISOString()}>{dateString.toString()}</time>
}

