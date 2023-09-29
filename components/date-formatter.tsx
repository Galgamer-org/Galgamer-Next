import { parseISO, format } from 'date-fns'


export default function DateFormatter({ dateObj }: { dateObj: Date }) {

  //console.log(`the date is ${dateObj}`)
  // const date = parseISO(dateString)
  // console.log(`the date is ${date}`)
  //return <p>{dateString.toString()}</p>
  return <time dateTime={dateObj.toISOString()}>{dateObj.toString()}</time>
}

