const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

const Guild = new mongoose.Schema({
  id: { type: String, unique: true, required: true },

  monitorChannel: { type: Array, default: [] },
  logsChannel: { type: String, default: null },
  mention: { type: Array, default: [] },
  vipRoles: { type: String, default: null },
  activity: {
    justify: { type: String, default: null },
    confirm: { type: String, default: null }
  },
  registros: { type: Number, default: 0 },
  justificativas: { type: Number, default: 0 },
  ticket: {
    ticket_category: { type: String, default: null },
    ticket_channel: { type: String, default: null },
    transcript: { type: String, default: null }
  }

});

const User = new mongoose.Schema({

  id: { type: String, unique: true, required: true },

  ticket: {
    id: { type: String, default: null },
    open: { type: Boolean, default: false }
  },

  count: { type: Number, default: 0 },
  playLists: { type: Array, default: [] },
  registerList: { type: Array, default: [] },
  registerBy: { type: String, default: null },
  registerTimestamp: { type: Date, default: 0 },
  justificativas: { type: Array, default: [] }

})


module.exports = {
  Guild: mongoose.model("Guild", Guild),
  User: mongoose.model("User", User)
};

