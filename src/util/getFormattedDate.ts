import formatDistance from 'date-fns/formatDistance'
import parseISO from 'date-fns/parseISO'

export default function getFormattedDate(date: string) {
  return formatDistance(parseISO(date), new Date(), { addSuffix: true })
}
