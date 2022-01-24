
async function addToDb(pool, type, quantity) {
  pool.query(`INSERT INTO chocolate_type (type_name, quantity_consumed) VALUES ('${type}', '${quantity}');`, (err, result) => {
    if (err) {
      console.log(err.stack)
    } return result
  })
}

handlers = {
  addToDb
}

module.exports =handlers
