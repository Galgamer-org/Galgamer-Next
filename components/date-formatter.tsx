import { parseISO, format } from 'date-fns'


export default function DateFormatter({ dateObj }: { dateObj: Date }) {

  //console.log(`the date is ${dateObj}`)
  // const date = parseISO(dateString)
  // console.log(`the date is ${date}`)
  //return <p>{dateString.toString()}</p>

  // show date in local time
  return <time dateTime={dateObj.toISOString()}>
    {dateObj.toLocaleDateString('zh-TW')}
    </time>
}

