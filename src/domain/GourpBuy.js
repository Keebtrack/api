export default function User({ groupbuy: GroupBuyModel }) {
  return {
    get: function(id) {
      return GroupBuyModel.findById(id)
        .then(function handleGroupBuy(instance) {
          return instance.get({ plain: true })
        })
    },
    all: function(viewer, _, { first: limit = 10, after }) {
      //where: { $or: [{ friendId: userId }, { userId: userId }] }
      const query = { limit, after }
      return GroupBuyModel.paginate(query)
        .then(function handleResults({ cursors, results }) {
          console.log(cursors, results)
          return {
            cursors,
            friends: results.map(res => res.get({ plain: true })
              .friend)
          }
        })
    }
  }
}