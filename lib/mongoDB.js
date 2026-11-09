/*
* lumnztyz ngasih credits ke yang bersangkutan dengan sc ini, baik base, apikey, scrape, dan lain sebagainya.
* github resmi sc ini : https://github.com/SiX-CoRe/SxcWaMdV3
* developer : t.me/LumnzTyz
* saluran info update : https://whatsapp.com/channel/0029Vb7XYjLKgsNyWrRHL10k
* creator : DrstNitro
* wa : wa.me/6283181895347
* saluran : https://whatsapp.com/channel/0029VbDvIntK0IBjZp1bMy19
* telegram : https://t.me/droluxe
‼️JANGAN HAPUS CREDITS INI YA, RENAME RENAME SAJA JANGAN COBA COBA HAPUS TEKS INI ‼️
***DONASI BIAR SEMANGAT BERKARYA***
https://sociabuzz.com/lumnztyz
*/
import mongoose from 'mongoose';
const { Schema } = mongoose

export default class mongoDB {
constructor(url, options = { useNewUrlParser: true, useUnifiedTopology: true }) {
this.url = url
this.data = this._data = this._schema = this._model = {}
this.db
this.options = options
}
async read() {
this.db = await mongoose.connect(this.url, { ...this.options })
this.connection = mongoose.connection
let schema = this._schema = new Schema({
data: {
type: Object,
required: true, //depends on whether the field is mandatory or not
default: {}
}
})
// this._model = mongoose.model('data', schema)
try { this._model = mongoose.model('data', schema) } catch { this._model = mongoose.model('data') }
this._data = await this._model.findOne({})
if (!this._data) {
this.data = {}
await this.write(this.data)
this._data = await this._model.findOne({})
} else this.data = this._data.data
return this.data
}


async write(data) {
if (!data) return data
if (!this._data) return (new this._model({ data })).save()
this._model.findById(this._data._id, (err, docs) => {
if (!err) {
if (!docs.data) docs.data = {}
docs.data = data
return docs.save()
}
})
}
}