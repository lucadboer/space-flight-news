import moment from "moment";

export function dateFormatter(date: Date) {
  return moment(date).format("DD/MMM/YYYY")
}