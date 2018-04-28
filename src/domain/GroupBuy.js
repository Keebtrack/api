export default function GroupBuy({ groupbuys: GroupBuyModel }) {
  return {
    get: function(id) {
      return GroupBuyModel.findById(id)
        .then(function handleGroupBuy(instance) {
          return instance.get({ plain: true })
        })
    },
    allWithoutCursor: function() {
      return GroupBuyModel.all({
          where: {
            closeDate: {
              $gt: new Date(),
            },
          }
        })
        .then(function handle(results) {
          return results.map(res => res.get({ plain: true }))
        })
    },
    all: function({ first: limit = 10, after }) {
      return GroupBuyModel.paginate({
          limit,
          after,
          desc: true,
          where: {
            closeDate: {
              $gt: new Date(),
            },
          }
        })
        .then(function handleResults({ cursors, results }) {
          return {
            pageInfo: cursors,
            results: results.map(res => res.get({ plain: true }))
          }
        })
    }
  }
}