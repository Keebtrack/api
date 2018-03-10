export default function GroupBuy({ groupbuys: GroupBuyModel }) {
  return {
    get: function(id) {
      return GroupBuyModel.findById(id)
        .then(function handleGroupBuy(instance) {
          return instance.get({ plain: true })
        })
    },
    all: function({ first: limit = 10, after }) {
      const query = { limit, after }
      console.log(query)
      return GroupBuyModel.paginate(query)
        .then(function handleResults({ cursors, results }) {
          return { pageInfo: cursors, results: results.map(res => res.get({ plain: true })) }
        })
    }
  }
}