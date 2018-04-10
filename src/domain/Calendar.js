export default function Calendar({ calendar: CalendarModel, Sequelize }) {
  return {
    get: function() {
      // TODO this should be done with one query!
      return CalendarModel.max('id')
        .then(function handleCalendar(id) {
          return CalendarModel.findById(id)
            .then(function handleInstance(instance) {
              return calendar.blob
            })
        })
    }
  }
}