export default function GroupBuy({ vendors: VendorModel }) {
  return {
    all: function() {
      return VendorModel.findAll()
        .then(function handleResults(results) {
          return results.map(res => res.get({ plain: true }))
        })
    }
  }
}