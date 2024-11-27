const { timeStamp } = require('console');
const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({

    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },

    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },

    status : {
        type : String,
        enum : ['interested','ignored','accepted','rejected'],
        message : `{VALUE} is incoreect status type`
    },
},
{timeStamps: true}
);

connectionRequestSchema.index({fromUserId : 1},{toUserId : 1})

connectionRequestSchema.pre('save',function(next){
    const connectionRequest = this;

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error('You cannot send request to youself')
    }

    next();
})


const ConnectionRequest = new mongoose.model('ConnectionRequest',connectionRequestSchema);

module.exports = ConnectionRequest;