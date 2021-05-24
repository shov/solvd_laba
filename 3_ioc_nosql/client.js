const {MongoClient} = require('mongodb')

const uri = {
  src: `mongodb://mongoadmin:secret@localhost:27017`,
  dest: `mongodb+srv://mongoshov:gYlqG1CqjpFCh4YT@cluster0.w6jim.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
}

MongoClient.prototype.execWraped = exec

function clientFactory(uri) {
  return new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

async function exec(ops) {
  try {
    await this.connect()
    return await ops.apply(this)
  } catch (e) {
    console.error(e)
  } finally {
    await this.close()
  }
}

;(async () => {
  const src = clientFactory(uri.src)
  const dest = clientFactory(uri.dest)

  let students = await src.execWraped(async function() {
    const db = this.db('jsclient1')
    let students = await db.collection('students').find()
    students = await students.toArray()

    await dest.execWraped(async function () {
      const db = this.db('test')
      await db.collection('students').drop()
      await db.collection('students').insert(students)
    })
  })

})()


