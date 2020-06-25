const conn = new Mongo()

const db = conn.getDB('cw-project-radar')
db.dropDatabase()

//
// Sequences
//
db.createCollection('sequences')
db.sequences.createIndex({ _id: 1, seq: 1 }, { unique: true })

//
// Users
//
db.createCollection('users')
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ name: 1 }, { unique: true })

//
// Projects
//
db.createCollection('projects')
db.projects.createIndex({ cw_id: 1 }, { unique: true })
db.projects.createIndex({ name: 1 }, { unique: true })
db.projects.createIndex({ rcn: 1 }, { unique: true })

//
// Radars
//
db.createCollection('radars')
db.radars.createIndex({ slug: 1 }, { unique: true })
db.radars.createIndex({ slug: 1, status: 1 })

//
// All other collections with default _id unique index
//
db.createCollection('classifications')
db.createCollection('mtrlscores')
db.createCollection('radardatas')
db.createCollection('radarrenderings')
